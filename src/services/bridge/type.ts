export type THttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type TCloseFileViewer = 'all' | 'currentTab';

export type TEntityType =
  | 'tab'
  | 'channel'
  | 'story'
  | 'file'
  | 'fileCollection'
  | 'user'
  | 'link'
  | 'interestArea';

export type TSearchType =
  | 'all'
  | 'tags'
  | 'stories'
  | 'files'
  | 'comments'
  | 'users'
  | 'feeds'
  | 'events'
  | 'notes';

export type THubMenu =
  | 'chat'
  | 'company'
  | 'content'
  | 'me'
  | 'meetings'
  | 'notes'
  | 'notifications'
  | 'calendar';

export type THubPlatforms =
  | 'Hub Web App'
  | 'Hub for iOS'
  | 'Hub for Windows'
  | 'Hub for Android';
