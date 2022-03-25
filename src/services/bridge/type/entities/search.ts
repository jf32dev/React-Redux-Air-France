import { StrictExtract } from '../../../../type';
import { EFileSharingType } from '../../enum';
import { TEntityType } from '../../type';
import { Channel, User, Story, Tag } from './entities';

export interface SearchStory {
  readonly id: number; // Unique identifier (Internally referred to as `permId`)
  readonly title: string; // Story title
  readonly channel: Channel; // Primary Channel return {id: Integer, name: String, hidden: Boolean}
  readonly excerpt: string; // Excerpt of Story message (plain text - not supported on device)
  readonly author: User; // User object of author return {id: Integer, firstName: String, lastName: String, email: String}
  readonly tags: Tag[]; // List of tags return [{id: Integer, name: String}]
  readonly fileCount: number; // Total number of Files
  readonly thumbnail: string; // Path to thumbnail
  readonly quickFileId: number; // Quickfile ID
  readonly quickLink: string; // URL of Quicklink
  readonly createDate: number; // Timestamp of Story creation on server
  readonly type: StrictExtract<TEntityType, 'story'>; // Static value = 'story'
}

export interface SearchFile {
  readonly id: number; // Unique identifier
  readonly filename: string; // File name
  readonly description: Channel; // File description
  readonly tags: Tag[]; // List of tags return [{id: Integer, name: String}]
  readonly downloadURL: string; // URL to download file (only on Web),
  readonly sharingType: EFileSharingType; // sharingType: 0/1/2 (blocked, optional, mandatory). Android: Fixed value `mandatory`
  readonly category: string; // Category of file (image, video etc.)
  readonly thumbnail: string; // Path to thumbnail
  readonly story: Story; // Related Story Only return { id, revisionId}
  readonly type: StrictExtract<TEntityType, 'file'>; // Static value = 'file'
}
