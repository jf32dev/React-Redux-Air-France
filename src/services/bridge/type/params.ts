import { StrictExclude, StrictExtract } from '../../../type';
import {
  THttpMethod,
  TEntityType,
  TCloseFileViewer,
  TSearchType,
  THubMenu,
} from '../type';

export interface AddInterestAreaParams {
  id: number;
}

export interface RemoveInterestAreaParams {
  id: number;
}

export interface CloseFileViewerParams {
  option: TCloseFileViewer;
}

export interface CloudFileProxyParams {
  url: string;
  method: StrictExclude<THttpMethod, 'PUT'>;
  body?: any;
  headers?: any;
}

export interface CreateCommentParams {
  storyId: number;
  message: string;
}

export interface CreateCommentReplyParams {
  commentId: number;
  message: string;
}

export interface CreateFileParams {
  fileData: string;
  fileName: string;
  fileExt: string;
}

export interface CreatePitchParams {
  visual: boolean;
}

export interface CreateShareParams {
  to: string[];
  cc?: string[];
  subject: string;
  message?: string;
  files?: number[];
  visual?: boolean;
}

export interface CreateStoryParams {
  channelId: number;
  title: string;
  description?: string;
  excerpt?: string;
  expiryTimeStamp?: number;
  expiryTimeStampTz?: string;
  fileData?: string;
  fileName?: string;
  fileExt?: string;
  notify?: boolean;
  visual?: boolean;
  attachmentURLs?: string[]; // array of URLs (may be a local file reference or a blob URL)
}

export interface EditStoryParams {
  storyId: number;
  channelId: number;
  title?: string;
  description?: string;
  excerpt?: string;
  expiryTimeStamp?: number;
  expiryTimeStampTz?: string;
  fileData?: string;
  fileName?: string;
  fileExt?: string;
  notify?: boolean;
  visual?: boolean;
  attachmentURLs?: string[];
}

export interface FollowUserParams {
  userId: number;
}

export interface UnfollowUserParams {
  userId: number;
}

export interface GetBookmarkListParams {
  entityName: StrictExtract<TEntityType, 'story' | 'fileCollection'>;
  offset?: number;
  limit?: number;
  sortBy?: string;
}

export interface GetCRMDetailParams {
  accountId: number;
}

export interface GetDraftListParams {
  offset?: number;
  limit?: number;
  sortBy?: string;
}

export interface GetEntityParams {
  entityName: StrictExtract<TEntityType, 'story' | 'file' | 'user'>;
  id: string | number;
}

export interface GetEventsParams {
  fromDate: number;
  toDate: number;
  limit?: number;
  offset?: number;
}
export interface GetFeaturedListParams {
  entityName: StrictExtract<TEntityType, 'story'>;
}

export interface GetListParams {
  entityName: StrictExclude<TEntityType, 'interestArea'>;
  parentEntityName?: StrictExtract<TEntityType, 'tab' | 'channel' | 'story'>;
  peid?: number;
  showAlias?: boolean; // Web, iOS 5.2, Windows 5.4.4, Android 5.2.1
  includeAttributes?: Array<string>; // Web, iOS 5.5.3, Windows 5.4.4, Android 5.2. currently available for story entity only
  createDateSince?: number;
  createDateTo?: number;
  offset?: number;
  limit?: number;
  sortBy?: string;
}

export interface GetNewListParams {
  entityName: StrictExtract<TEntityType, 'story'>;
  offset?: number;
  limit?: number;
}

export interface GetRecommendedListParams {
  entityName: StrictExtract<TEntityType, 'story' | 'file'>;
  offset?: number;
  limit?: number;
}

export interface LikeStoryParams {
  storyId: number;
}

export interface UnlikeStoryParams {
  storyId: number;
}

export interface OpenEntityParams {
  entityName: StrictExclude<TEntityType, 'interestArea'>;
  id: number;
  disableLegacyRouting?: boolean;
}

export interface OpenMenuParams {
  menuType: THubMenu;
}

export interface OpenUrlParams {
  url: string;
}

export interface ProxyRequestParams {
  url: string;
  method: THttpMethod;
  body?: any;
  headers?: any;
  disableCredentials: boolean;
}

export interface ReadFileParams {
  fileId: number;
}

export interface SearchParams {
  keywords: string;
}

export interface SearchFilesParams {
  q: string;
  limit?: number;
  hidden?: boolean;
  shareable?: boolean;
}

export interface SearchResultParams {
  keywords: string;
  type: TSearchType;
  limit?: number;
  offset?: number;
}

export interface SearchStoriesParams {
  q: string;
  limit?: number;
  hidden?: boolean;
}

export interface SendEmailParams {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  body: string;
}

export interface SubscribeStoryParams {
  storyId: number;
}

export interface UnsubscribeStoryParams {
  storyId: number;
}
