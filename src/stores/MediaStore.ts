/* eslint-disable class-methods-use-this */
import dayjs from 'dayjs';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import bridge from '../services/bridge';
import { EFileSharingType } from '../services/bridge/enum';
import { Channel, File, Story } from '../services/bridge/type/entities';

type PrivateAPIFile = {
  coverArt?: {
    url: string;
  };
  description: string;
  filePermId: number;
  mimeType: string;
  createdAt: string;
  downloadUrl: string;
  size: number;
  id: number;
};

class MediaStore {
  mediaRegistry: PrivateAPIFile[] = [];

  mediaRegistryiOS: File[] = [];

  loading = false;

  private readonly sourceLocation = [41486, 41485]; // tab ids

  private readonly mediaCategory = ['video', 'audio']; // file categories that are considered media

  private sourceLocationChannel: number[] = [];

  constructor() {
    makeObservable(this, {
      mediaRegistry: observable,
      mediaRegistryiOS: observable,
      media: computed,
      loading: observable,
      getMedia: action,
      getMediaForIOS: action,
    });

    this.getAllChannelIdsFromSourceLocation();
  }

  private async getAllChannelIdsFromSourceLocation() {
    this.sourceLocationChannel = [];

    const result = await Promise.all(
      this.sourceLocation.map((tabid) =>
        bridge.getList<Channel>({
          parentEntityName: 'tab',
          peid: tabid,
          entityName: 'channel',
        })
      )
    );

    result.forEach((res) => {
      if (res.value) {
        const channelids = res.value.map((channel) => channel.id);
        this.sourceLocationChannel.push(...channelids);
      }
    });
  }

  private prepareQuery() {
    return `(${this.sourceLocationChannel
      .map((id, index) => `${index > 0 ? ' || ' : ''}channel.id:${id}`)
      .join('')})`;
  }

  private parseParams(object: Record<string, unknown>) {
    let params = '';
    Object.keys(object).forEach((key) => {
      params += `&${key}=${object[key]}`;
    });
    return params;
  }

  /**
   * https://push.bigtincan.co.uk/v5/webapi/search/files?q=(channel.id%3A334443%20%7C%7C%20channel.id%3A334444)&limit=50&offset=0&highlighted_excerpt_length=160&category=video&sort%5Bkey%5D=created_at&sort%5Border%5D=desc&hidden=false
   */

  private async search(category: string, limit: number) {
    if (!this.sourceLocationChannel.length) {
      await this.getAllChannelIdsFromSourceLocation();
    }

    const token = await bridge.unsafeGetAccessToken();

    if (token.value) {
      const result = await bridge.proxyRequest({
        headers: {
          Authorization: `Bearer ${token.value.accessToken}`,
        },
        url: encodeURI(
          `https://push.bigtincan.co.uk/v5/webapi/search/files?q=${this.prepareQuery()}${this.parseParams(
            {
              limit,
              offset: 0,
              category,
              hidden: false,
              'sort[key]': 'created_at',
              'sort[order]': 'desc',
            }
          )}`
        ),
        disableCredentials: true,
        method: 'GET',
      });

      return result.value as PrivateAPIFile[];
    }

    return [];
  }

  private searchFallback = async () => {
    const result = await Promise.all(
      this.sourceLocation.map((tabid) =>
        bridge.getList<Story>({
          parentEntityName: 'tab',
          peid: tabid,
          entityName: 'story',
          includeAttributes: ['files'],
          limit: 100,
          sortBy: 'createDate',
        })
      )
    );

    const stories: Story[] = [];

    result.forEach((res) => {
      if (res.value) {
        stories.push(...res.value);
      }
    });

    const files: File[] = [];

    stories.forEach((story) => {
      files.push(...(story.files || []));
    });

    return files
      .filter((file) => this.mediaCategory.includes(file.category))
      .sort((a, b) => b.createDate - a.createDate);
  };

  getMediaForIOS = async () => {
    this.loading = true;
    const media = await this.searchFallback();
    runInAction(() => {
      this.loading = false;
      this.mediaRegistryiOS = media;
    });
  };

  getMedia = async (limit: number) => {
    this.loading = true;
    const media = await this.search(this.mediaCategory.join(), limit);
    runInAction(() => {
      this.loading = false;
      this.mediaRegistry = media.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    });
  };

  get media(): File[] {
    if (this.mediaRegistryiOS.length) {
      return this.mediaRegistryiOS;
    }

    return this.mediaRegistry.map((m) => ({
      id: m.id,
      story: {} as any,
      category: m.mimeType.split('/')[0],
      createDate: new Date(m.createdAt).getTime() / 1000,
      thumbnail: m.coverArt?.url || '',
      description: m.description,
      downloadURL: m.downloadUrl,
      editedLocally: false,
      isDownloaded: false,
      filename: m.description,
      size: m.size,
      sharingType: EFileSharingType.OPTIONAL,
      type: 'file',
    }));
  }
}

export default MediaStore;
