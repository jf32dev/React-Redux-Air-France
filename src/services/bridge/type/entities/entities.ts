import { StrictExtract } from '../../../../type';
import { EFileSharingType } from '../../enum';
import { TEntityType, THubPlatforms } from '../../type';

/**
 * TAB
 */
export interface TabBase {
  // [key: string]: any; //indexable signature of the object
  readonly id: number; // Unique Identifier
  readonly name: string; // Tab Name
  readonly thumbnail: string; // Path to Tab Thumbnail
  readonly type: StrictExtract<TEntityType, 'tab'>; // static value ='tab'
  readonly channelCount: number; // Total number of Channels
  readonly isPersonal: boolean;
  readonly isShared: boolean;
}

export interface Tab extends TabBase {
  readonly channels?: readonly Channel[]; // List of Channels
}

/**
 * Channel
 */
export interface ChannelBase {
  readonly id: number; // Unique identifier
  readonly name: string; // Channel name
  readonly thumbnail: string; // Path to thumbnail
  readonly type: StrictExtract<TEntityType, 'channel'>; // Static value = 'channel'
  readonly defaultSortBy: string; // Default Story sorting attribute
  readonly description: string; // Channel description
  readonly storyCount: number; // Total number of Stories
  readonly isFeed: boolean; // Channel contains feed articles
  readonly isHidden: boolean; // Hidden Channel
  readonly isReadable: boolean; // Current user can read this Channel
  readonly isSubscribed: boolean; // Current user is subscribed to this Channel
  readonly isWritable: boolean; // Current user can publish to this Channel
}

export interface Channel extends ChannelBase {
  readonly stories?: readonly Story[]; // List of Stories
}

/**
 * Story
 */
export interface StoryBase {
  readonly id: number; // Unique identifier (Internally referred to as `permId`)
  readonly title: string;
  readonly excerpt: string; // Excerpt of Story message (plain text - not supported on device)
  readonly createDate: number; // Timestamp of Story creation on server
  readonly expiryDate: number; // Timestamp when Story will be archived by the server
  readonly quickFileId: number; // Quickfile ID
  readonly quickFile: File; // File object
  readonly quickLink: string; // URL of Quicklink
  readonly thumbnail: string; // Path to thumbnail
  readonly type: StrictExtract<TEntityType, 'story'>; // Static value = 'story'
  readonly isBookmark: boolean; // Current user bookmarked the Story
  readonly isFeed: boolean; // Story is from an RSS feed
  readonly isLiked: boolean; // Current user liked the Story
  readonly isProtected: boolean; // User requires password to access Story. Protected Stories are not saved on device
  readonly isUnread: boolean; // Current user has not read the Story
  readonly commentCount: number; // Total number of Comments
  readonly fileCount: number; // Total number of Files
  readonly likesCount: number; // Number of Likes
  readonly initialCreateDate: number;
  readonly initialPublishDate: number;
  readonly badgeTitle: string;
  readonly badgeColour: string; // Hex color of Content IQ badge
}

export interface Story extends StoryBase {
  readonly message?: string; // Story description (normally HTML)
  readonly tags?: readonly Tag[] | readonly string[]; // List of tags
  readonly isSubscribed?: boolean; // Current user subscribed to the Story
  readonly author?: User; // User object of author (Not returned if `isFeed`)
  readonly subscribers?: User; // List of subscribers

  readonly channel?: Channel; // Primary Channel
  readonly comments?: readonly Comment[]; // Comments on Story

  readonly events?: Event; // Events related to Story

  readonly files?: File[]; // Files attached to Story
  readonly enableAnnotation?: boolean; // Annotations allowed on Story's files
  readonly readCount?: number; // Total number of time Story opened by users
  readonly notify?: boolean; // Story will send push notifications when updated
  readonly sequence?: number; // Priority of Story, use for sorting by priority
  readonly sharingType?: number; // Sharing Type bit mask value, refers to: email, server, facebook, twitter, linkedIn
  readonly socialURL?: string; // Link of the public URL for sharing

  // This marks as optional since ** only returned in the getFeaturedList API **
  readonly featuredImage?: string; // Featured Image URL for featured stories.
}

/**
 * File & File Collection
 */
export interface File {
  readonly id: number; // Unique identifier
  readonly category: string; // Category of file (image, video etc.)
  readonly createDate: number; // Timestamp of creation on server
  readonly description: string; // File description
  readonly downloadURL: string; // URL to download file (only on Web)
  readonly editedLocally: boolean; // File has been edited locally
  readonly filename: string; // File name
  readonly isDownloaded: boolean; // File has been downloaded to device. Web: Returns `null`
  readonly sharingType: EFileSharingType; // sharingType: 0/1/2 (blocked, optional, mandatory). Android: Fixed value `mandatory`
  readonly size: number; // Size of the file in bytes
  readonly story: Story; // Related Story
  readonly thumbnail: string; // Path to thumbnail
  readonly type: StrictExtract<TEntityType, 'file'>; // Static value = 'file'
  readonly url?: string; // URL to view file
}

export interface FileCollection {
  readonly id: number; // Unique identifier
  readonly name: string; // Collection name
  readonly createDate: number; // Timestamp of creation on server
  readonly files: readonly File[]; // List of Files
  readonly type: StrictExtract<TEntityType, 'fileCollection'>; // Static value = 'fileCollection'
}

/**
 * Events
 */
export interface EventBase {
  readonly id: number; // Unique identifier
  readonly name: string; // Name of Event
  readonly endDate: number; // Timestamp of Event end date
  readonly startDate: number; // Timestamp of Event start date
  readonly timezone: string; // Timezone string, e.g. 'Australia/Sydney' (not supported on device)
  readonly type: 'event'; // Static value = 'event'
}

export interface Event extends EventBase {
  readonly story?: Story; // Related Story (included in searchResult)
}

/**
 * Comment
 */
export interface CommentBase {
  readonly id: number; // Unique identifier
  readonly createDate: number; // Timestamp of Comment creation on server
  readonly message: string; // Comment content
  readonly comments: readonly Comment[]; // List of comment replies
  readonly author: User; // User object of author
  readonly isPending: boolean; // Pending state for syncing to server
  readonly type: 'comment'; // Static value = 'comment'
}

export interface Comment extends CommentBase {
  readonly story?: Story; // Related Story (included in searchResult)
}

/**
 * User
 */
export interface UserBase {
  readonly id: number; // Unique identifier
  readonly title: string; // Title set by User
  readonly firstName: string; // First name
  readonly lastName: string; // Last name
  readonly email: string; // Email address
  readonly badgeColour: string; // Hex color of badge
  readonly badgeTitle: string; // Badge title

  readonly score: number; // User score
  readonly thumbnail: string; // Path to thumbnail
  readonly type: StrictExtract<TEntityType, 'user'>; // Static value = 'user'
}

export interface User extends UserBase {
  readonly subscribedStories?: readonly Story[]; // Stories the currrent User is subscribed to
  readonly followers?: readonly User[]; // Followers of the current User
  readonly following?: readonly User[]; // Users the current User is following
  readonly groups?: readonly Group[]; // Groups the user is in
}

/**
 * Group
 */
export interface GroupBase {
  readonly id: number; // Unique identifier
  readonly title: string; // Group title
  readonly groupType: string; // ...
  readonly type: 'group'; // Static value = 'group'
}
export interface Group extends GroupBase {
  readonly users?: readonly User[]; // List of users
}

/**
 * Interest Area
 */
export interface InterestArea {
  readonly id: number; // Unique identifier
  readonly color: string; // Hex colour
  readonly isSubscribed: boolean; // Current user is subscribed
  readonly name: string; // Interest Area name
  readonly thumbnail: string; // URL to thumbnail
  readonly type: StrictExtract<TEntityType, 'interestArea'>; // Static value = 'interestArea'
}

/**
 * Tag
 */
export interface Tag {
  readonly id: number; // Unique identifier
  readonly name: string; // Tag name
}

/**
 * System Config
 */
export interface SystemConfig {
  readonly appName: THubPlatforms;
  readonly appVersion: string;
  readonly bridgeVersion: string;
  readonly mainThemeHexColor: string;
  readonly serverURL: string;
  readonly terminology: any;
  readonly userId: number;
  readonly mdmCustomConfig: unknown;
}
