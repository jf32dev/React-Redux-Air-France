// eslint-disable-next-line import/no-extraneous-dependencies
import { build, fake } from '@jackfranklin/test-data-bot';
import { User, UserBase } from '../../services/bridge/type/entities';

const fakeUserBuilder = build<User>({
  fields: {
    id: fake((f) => f.random.number(1000000)),
    title: fake((f) => f.name.prefix()),
    firstName: fake((f) => f.name.firstName()),
    lastName: fake((f) => f.name.lastName()),
    email: fake((f) => f.internet.exampleEmail()),
    badgeTitle: fake((f) => f.lorem.word()),
    badgeColour: fake((f) => f.internet.color()),
    score: fake((f) => f.random.number({ min: 0, max: 100 })),
    thumbnail: fake((f) => f.image.imageUrl()),
    type: 'user',
    subscribedStories: undefined,
    followers: undefined,
    following: undefined,
    groups: undefined,
  },
  traits: {
    full: {
      overrides: {
        subscribedStories: [],
        followers: [],
        following: [],
        groups: [],
      },
    },
    base: {
      postBuild: (user) =>
        Object.fromEntries(
          Object.entries(user).filter(([_, values]) => !!values)
        ) as UserBase,
    },
  },
});

const fakeUserList = (
  n = 10,
  buildConfig: Parameters<typeof fakeUserBuilder>[0]
) => [...Array(n)].map((_) => fakeUserBuilder(buildConfig));

export { fakeUserBuilder, fakeUserList };
