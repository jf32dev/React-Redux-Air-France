import JSBBase from './base';
import type {
  AddInterestAreaParams,
  CloseFileViewerParams,
  CloudFileProxyParams,
  CreateCommentParams,
  CreateCommentReplyParams,
  CreateFileParams,
  CreatePitchParams,
  CreateStoryParams,
  EditStoryParams,
  FollowUserParams,
  GetCRMDetailParams,
  GetBookmarkListParams,
  GetDraftListParams,
  GetEntityParams,
  GetFeaturedListParams,
  GetListParams,
  GetNewListParams,
  GetRecommendedListParams,
  OpenEntityParams,
  LikeStoryParams,
  UnlikeStoryParams,
  OpenUrlParams,
  OpenMenuParams,
  ProxyRequestParams,
  ReadFileParams,
  SearchParams,
  SearchFilesParams,
  SearchResultParams,
  SearchStoriesParams,
  SendEmailParams,
  SubscribeStoryParams,
  UnsubscribeStoryParams,
  RemoveInterestAreaParams,
  UnfollowUserParams,
  CreateShareParams,
  GetEventsParams,
} from './type/params';
import type {
  Story,
  InterestArea,
  SearchFile,
  SearchStory,
  Comment,
  SystemConfig,
  Event,
} from './type/entities';

class BridgeServices extends JSBBase {
  public addInterestArea(params: AddInterestAreaParams) {
    const action = 'addInterestArea';
    return this.doCall<InterestArea>({ action, params });
  }

  public removeInteresArea(params: RemoveInterestAreaParams) {
    const action = 'RemoveInterestArea';
    return this.doCall<InterestArea>({ action, params });
  }

  public closeFileViewer(params: CloseFileViewerParams) {
    const action = 'closeFileViewer';
    return this.doCall<boolean>({ action, params });
  }

  public cloudFilesProxy(params: CloudFileProxyParams) {
    const action = 'cloudFilesProxy';
    return this.doCall<any>({ action, params });
  }

  public createComment(params: CreateCommentParams) {
    const action = 'createComment';
    return this.doCall<Comment>({ action, params });
  }

  public createCommentReply(params: CreateCommentReplyParams) {
    const action = 'createCommentReply';
    return this.doCall<Comment>({ action, params });
  }

  public createFile(params: CreateFileParams) {
    const action = 'createFile';
    return this.doCall<{ tempURL: string }>({ action, params });
  }

  public createPitch(params: CreatePitchParams) {
    const action = 'createPitch';
    return this.doCall({ action, params });
  }

  public createShare(params: CreateShareParams) {
    const action = 'createShare';
    return this.doCall({ action, params });
  }

  public createStory(params: CreateStoryParams) {
    const action = 'createStory';
    return this.doCall<{ id: number; isPending: boolean }>({ action, params });
  }

  public editStory(params: EditStoryParams) {
    const action = 'editStory';
    return this.doCall<Story>({ action, params });
  }

  public editUserProfile() {
    const action = 'editUserProfile';
    return this.doCall<boolean>({ action });
  }

  public followUser(params: FollowUserParams) {
    const action = 'followUser';
    return this.doCall<{ id: number; isFollowed: boolean }>({ action, params });
  }

  public unfollowUser(params: UnfollowUserParams) {
    const action = 'unfollowUser';
    return this.doCall<{ id: number; isFollowed: boolean }>({ action, params });
  }

  public getBookmarkList<T>(params: GetBookmarkListParams) {
    const action = 'getBookmarkList';
    return this.doCall<T[]>({ action, params });
  }

  public getCRMDetail(params: GetCRMDetailParams) {
    const action = 'getCRMDetail';
    return this.doCall<number>({ action, params });
  }

  public getDraftList(params?: GetDraftListParams) {
    const action = 'getDraftList';
    return this.doCall<Story[]>({ action, params });
  }

  public getEntity<T>(params: GetEntityParams) {
    const action = 'getEntity';
    return this.doCall<T>({ action, params });
  }

  public getEvents(params: GetEventsParams) {
    const action = 'getEvents';
    return this.doCall<Event>({ action, params });
  }

  public getFeaturedList<T>(params: GetFeaturedListParams) {
    const action = 'getFeaturedList';
    return this.doCall<T[]>({ action, params });
  }

  public getInterestArea() {
    const action = 'getInterestArea';
    return this.doCall<InterestArea[]>({ action });
  }

  public getList<T>(params: GetListParams) {
    const action = 'getList';
    return this.doCall<T[]>({ action, params });
  }

  public getLocation() {
    const action = 'getLocation';
    return this.doCall<{
      lat: number;
      long: number;
      lastUpdatedTimestamp: number;
    }>({ action });
  }

  public getNewList<T>(params: GetNewListParams) {
    const action = 'getNewList';
    return this.doCall<T[]>({ action, params });
  }

  public getRecommendedList<T>(params: GetRecommendedListParams) {
    const action = 'getRecommendedList';
    return this.doCall<T[]>({ action, params });
  }

  public getSystemConfig() {
    const action = 'getSystemConfig';
    return this.doCall<SystemConfig>({ action });
  }

  public likeStory(params: LikeStoryParams) {
    const action = 'likeStory';
    return this.doCall<{ id: number; isLiked: boolean }>({ action, params });
  }

  public unlikeStory(params: UnlikeStoryParams) {
    const action = 'unlikeStory';
    return this.doCall<{ id: number; isLiked: boolean }>({ action, params });
  }

  public openEntity(params: OpenEntityParams) {
    const action = 'openEntity';
    return this.doCall({ action, params });
  }

  public openInterestAreas() {
    const action = 'openInterestArea';
    return this.doCall({ action });
  }

  public openMenu(params: OpenMenuParams) {
    const action = 'openMenu';
    return this.doCall({ action, params });
  }

  public openUrl(params: OpenUrlParams) {
    const action = 'openURL';
    return this.doCall({ action, params });
  }

  public proxyRequest(params: ProxyRequestParams) {
    const action = 'proxyRequest';
    return this.doCall({ action, params });
  }

  public readFile(params: ReadFileParams) {
    const action = 'readFile';
    return this.doCall<string>({ action, params });
  }

  public search(params: SearchParams) {
    const action = 'search';
    return this.doCall({ action, params });
  }

  public searchFiles(params: SearchFilesParams) {
    const action = 'searchFiles';
    return this.doCall<SearchFile[]>({ action, params });
  }

  public searchResult<T>(params: SearchResultParams) {
    const action = 'searchResult';
    return this.doCall<T[]>({ action, params });
  }

  public searchStories(params: SearchStoriesParams) {
    const action = 'searchStories';
    return this.doCall<SearchStory[]>({ action, params });
  }

  public sendEmail(params: SendEmailParams) {
    const action = 'sendEmail';
    return this.doCall({ action, params });
  }

  public subscribeStory(params: SubscribeStoryParams) {
    const action = 'subscribeStory';
    return this.doCall({ action, params });
  }

  public unsubscribeStory(params: UnsubscribeStoryParams) {
    const action = 'unsubscribeStory';
    return this.doCall({ action, params });
  }

  public switchAccount() {
    const action = 'switchAccount';
    return this.doCall({ action });
  }

  public unsafeGetAccessToken() {
    const action = 'unsafeGetAccessToken';
    return this.doCall<{ accessToken: string }>({
      action,
    });
  }
}

const bridge = new BridgeServices();
export default bridge;
