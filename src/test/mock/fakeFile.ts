/* eslint-disable import/no-extraneous-dependencies */
import { build, fake } from '@jackfranklin/test-data-bot';
import { File } from '../../services/bridge/type/entities';

const fakeFileBuilder = build<File>({
  fields: {
    id: fake((f) => f.random.number(1000000)),
    category: fake((f) => f.system.commonFileType()),
    createDate: fake((f) => f.date.recent().getTime()),
    description: fake((f) => f.system.fileName()),
    downloadURL: fake((f) => f.internet.url()),
    editedLocally: fake((f) => f.random.boolean()),
    filename: fake((f) => f.system.fileName()),
    isDownloaded: fake((f) => f.random.boolean()),
    sharingType: fake((f) => f.random.number({ min: 0, max: 2 })),
    size: fake((f) => f.random.number()),
    // NOTE: this simply not filled since it will create a circular dependencies
    // if this is needed then we can create it like below
    // fakeFileBuilder({ overrides: { story: fakeStoryBuilder({ traits: 'base' })} })
    story: {},
    thumbnail: fake((f) => f.image.imageUrl()),
    type: 'file',
    url: undefined,
  },
  traits: {
    full: {
      overrides: {
        url: fake((f) => f.internet.url()),
      },
    },
    base: {
      postBuild: (file) => {
        return Object.fromEntries(
          Object.entries(file).filter(([_, values]) => !!values)
        ) as File;
      },
    },
  },
});

const fakeFileList = (
  n = 10,
  buildConfig: Parameters<typeof fakeFileBuilder>[0] = { traits: 'base' }
) => [...Array(n)].map((_) => fakeFileBuilder(buildConfig));

export { fakeFileBuilder, fakeFileList };
