// eslint-disable-next-line import/no-extraneous-dependencies
import { build, fake, perBuild } from '@jackfranklin/test-data-bot';
import { Tab, TabBase } from '../../services/bridge/type/entities';

const fakeTabBuilder = build<Tab>({
  fields: {
    id: fake((f) => f.random.number(1000000)),
    name: fake((f) => f.lorem.words()),
    thumbnail: fake((f) => f.image.imageUrl()),
    type: 'tab',
    channelCount: fake((f) => f.random.number(500)),
    isPersonal: perBuild(() => false),
    isShared: fake((f) => f.random.boolean),
    channels: undefined,
  },
  traits: {
    full: {
      overrides: {
        // NOTE: this simply not filled since it will create a circular dependencies
        // if this is needed then we can create it like below
        // fakeTabBuilder({ overrides: { channels: fakeChannelList()} })
        channels: [],
      },
    },
    base: {
      postBuild: (tab) =>
        Object.fromEntries(
          Object.entries(tab).filter(([_, values]) => !!values)
        ) as TabBase,
    },
    personal: {
      overrides: {
        isPersonal: perBuild(() => true),
      },
    },
  },
});

const fakeTabList = (
  n = 10,
  buildConfig: Parameters<typeof fakeTabBuilder>[0] = { traits: 'base' }
) => [...Array(n)].map((_) => fakeTabBuilder(buildConfig));

export { fakeTabBuilder, fakeTabList };
