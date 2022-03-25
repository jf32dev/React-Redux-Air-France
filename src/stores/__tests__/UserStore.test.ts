import bridge from '../../services/bridge';
import Result from '../../services/bridge/type/results';
import { fakeSystemConfigBuilder } from '../../test/mock/fakeSystemConfig';
import { fakeUserBuilder } from '../../test/mock/fakeUser';
import UserStore from '../UserStore';
import { SystemConfig } from '../../services/bridge/type/entities/entities';

jest.mock('../../services/bridge/base');

const fakeLoginUser = fakeUserBuilder({ traits: 'full' });
const fakeSystemConfig = fakeSystemConfigBuilder();

afterEach(() => {
  jest.restoreAllMocks();
});

describe('User Store', () => {
  it('should initialised and created correctly', () => {
    const store = new UserStore();
    expect(store).toBeInstanceOf(UserStore);
    expect(store.appName).toBeUndefined();
    expect(store.loginUser).toBeUndefined();
    expect(store.appVersion).toBeUndefined();
    expect(store.state).toStrictEqual({
      status: 'idle',
      error: null,
    });
  });

  it('should get login user properly if bridge returns no error', async () => {
    jest
      .spyOn(bridge, 'getSystemConfig')
      .mockResolvedValueOnce(new Result(fakeSystemConfig, 'test-app', null));
    jest
      .spyOn(bridge, 'getEntity')
      .mockResolvedValueOnce(new Result(fakeLoginUser, 'test-app', null));

    const store = new UserStore();
    expect(store.loginUser).toBeUndefined();

    await store.getLoginUser();

    expect(bridge.getSystemConfig).toBeCalledTimes(1);
    expect(bridge.getEntity).toBeCalledTimes(1);
    expect(bridge.getEntity).toBeCalledWith({
      entityName: 'user',
      id: fakeSystemConfig.userId,
    });

    expect(store.loginUser).toStrictEqual(fakeLoginUser);
    expect(store.state.error).toBeFalsy();
    expect(store.state.status).toBe('succeeded');
  });

  it('should return error and not called getEntity when get config error', async () => {
    jest
      .spyOn(bridge, 'getSystemConfig')
      .mockResolvedValueOnce(
        new Result<SystemConfig>(null, 'test-app', 'Error')
      );
    jest
      .spyOn(bridge, 'getEntity')
      .mockResolvedValueOnce(new Result(fakeLoginUser, 'test-app', null));

    const store = new UserStore();
    expect(store.loginUser).toBeUndefined();

    await store.getLoginUser();

    expect(bridge.getSystemConfig).toBeCalledTimes(1);

    expect(bridge.getEntity).toBeCalledTimes(0);
    expect(store.loginUser).toBeUndefined();
    expect(store.state.error).toBeDefined();
    expect(store.state.status).toBe('failed');
  });

  it('should return error and when get entity error', async () => {
    jest
      .spyOn(bridge, 'getSystemConfig')
      .mockResolvedValueOnce(new Result(fakeSystemConfig, 'test-app', null));

    jest
      .spyOn(bridge, 'getEntity')
      .mockResolvedValueOnce(new Result(null, 'test-app', 'Error'));
    const store = new UserStore();
    expect(store.loginUser).toBeUndefined();

    await store.getLoginUser();

    expect(bridge.getSystemConfig).toBeCalledTimes(1);
    expect(bridge.getEntity).toBeCalledTimes(1);
    expect(store.loginUser).toBeUndefined();
    expect(store.state.error).toBeDefined();
    expect(store.state.status).toBe('failed');
  });
});
