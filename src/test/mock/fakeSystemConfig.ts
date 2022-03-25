// eslint-disable-next-line import/no-extraneous-dependencies
import { build, fake, perBuild } from '@jackfranklin/test-data-bot';
import { SystemConfig } from '../../services/bridge/type/entities';

const fakeSystemConfigBuilder = build<SystemConfig>({
  fields: {
    appName: perBuild(() => 'Hub Web App'),
    appVersion: fake((f) => f.system.semver()),
    bridgeVersion: fake((f) => f.system.semver()),
    mainThemeHexColor: fake((f) => f.internet.color()),
    serverURL: fake((f) => f.internet.url()),
    terminology: fake((f) => f.lorem.word()),
    userId: fake((f) => f.random.number(100000)),
    mdmCustomConfig: perBuild(() => null),
  },
});

export { fakeSystemConfigBuilder };
