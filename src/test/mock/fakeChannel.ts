// eslint-disable-next-line import/no-extraneous-dependencies
import { build, fake } from '@jackfranklin/test-data-bot';
import { Channel, ChannelBase } from '../../services/bridge/type/entities';

const fakeChannelBuilder = build<Channel>({
  fields: {
    id: fake((f) => f.random.number(1000000)),
    name: fake((f) => f.lorem.words()),
    thumbnail: fake((f) => f.image.imageUrl()),
    type: 'channel',
    defaultSortBy: 'createDate', // TODO: unknown
    description: fake((f) => f.lorem.sentences()),
    storyCount: fake((f) => f.random.number(500)),
    isFeed: fake((f) => f.random.boolean()),
    isHidden: fake((f) => f.random.boolean()),
    isReadable: fake((f) => f.random.boolean()),
    isSubscribed: fake((f) => f.random.boolean()),
    isWritable: fake((f) => f.random.boolean()),
    stories: undefined,
  },
  traits: {
    full: {
      overrides: {
        // NOTE: this simply not filled since it will create a circular dependencies
        // if this is needed then we can create it like below
        // fakeChannelBuilder({ overrides: { stories: fakeStoryList()} })
        stories: [],
      },
    },
    base: {
      postBuild: (channel) =>
        Object.fromEntries(
          Object.entries(channel).filter(([_, values]) => !!values)
        ) as ChannelBase,
    },
  },
});

const fakeChannelList = (
  n = 10,
  buildConfig: Parameters<typeof fakeChannelBuilder>[0]
) => [...Array(n)].map((_) => fakeChannelBuilder(buildConfig));

export { fakeChannelBuilder, fakeChannelList };
