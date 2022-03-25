// eslint-disable-next-line import/no-extraneous-dependencies
import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { Story, StoryBase } from '../../services/bridge/type/entities';

const fakeStoryBuilder = build<Story>({
  fields: {
    id: fake((f) => f.random.number(1000000)),
    title: fake((f) => f.lorem.words()),
    excerpt: fake((f) => f.lorem.sentence()),
    createDate: fake((f) => f.date.recent().getTime()),
    expiryDate: fake((f) => f.date.future().getTime()),
    quickFileId: fake((f) => f.random.number()),
    quickFile: fake((f) => new File([], f.system.fileName())),
    quickLink: fake((f) => f.internet.url()),
    thumbnail: fake((f) => f.image.imageUrl()),
    type: 'story',
    isBookmark: fake((f) => f.random.boolean()),
    isFeed: fake((f) => f.random.boolean()),
    isLiked: fake((f) => f.random.boolean()),
    isProtected: fake((f) => f.random.boolean()),
    isUnread: fake((f) => f.random.boolean()),
    commentCount: fake((f) => f.random.number(500)),
    fileCount: fake((f) => f.random.number(500)),
    likesCount: fake((f) => f.random.number(500)),
    initialCreateDate: fake((f) => f.date.recent().getTime()),
    initialPublishDate: fake((f) => f.date.recent().getTime()),
    badgeTitle: fake((f) => f.lorem.word()),
    badgeColour: fake((f) => f.internet.color()),
    message: undefined,
    tags: undefined,
    isSubscribed: undefined,
    author: undefined,
    channel: undefined,
    comments: undefined,
    events: undefined,
    files: undefined,
    enableAnnotation: undefined,
    readCount: undefined,
    notify: undefined,
    sequence: undefined,
    sharingType: undefined,
    socialURL: undefined,
    featuredImage: undefined,
  },
  traits: {
    full: {
      overrides: {
        message: fake((f) => f.lorem.sentences()),
        tags: [],
        isSubscribed: fake((f) => f.random.boolean()),
        author: {},
        channel: {},
        // NOTE: this simply not filled since it will create a circular dependencies
        // if this is needed then we can create it like below
        // fakeStoryBuilder({ traits: 'full', overrides: { files: fakeFileList } });
        comments: [],
        events: [],
        files: [],
        enableAnnotation: fake((f) => f.random.boolean()),
        readCount: fake((f) => f.random.number(500)),
        notify: fake((f) => f.random.boolean()),
        sequence: sequence(),
        sharingType: fake((f) => f.random.number(5)),
        socialURL: fake((f) => f.internet.url()),
      },
    },
    featured: {
      overrides: {
        featuredImage: fake((f) => f.image.imageUrl()),
      },
      postBuild: (story) => story,
    },
    base: {
      postBuild: (story) => {
        return Object.fromEntries(
          Object.entries(story).filter(([_, values]) => !!values)
        ) as StoryBase;
      },
    },
  },
});

const fakeStoryList = (
  n = 10,
  buildConfig: Parameters<typeof fakeStoryBuilder>[0] = { traits: 'base' }
) => [...Array(n)].map((_) => fakeStoryBuilder(buildConfig));

export { fakeStoryBuilder, fakeStoryList };
