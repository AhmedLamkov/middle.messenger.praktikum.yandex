import { expect } from 'chai';
import sinon from 'sinon';
import { describe, beforeEach, it } from 'mocha';
import esmock from 'esmock';
import AuthService from './AuthService.ts';

let AuthServiceType: typeof AuthService;

const mockFunctions = {
  login: sinon.fake(),
  create: sinon.fake(),
  logout: sinon.fake(),
  me: sinon.fake(),
  set: sinon.fake(),
  go: sinon.fake(),
};

describe('AuthService', async () => {
  beforeEach(async () => {
    AuthServiceType = (await esmock('./AuthService', {
      '../api/authApi.ts': {
        default: new class {
          me = mockFunctions.me;

          login = mockFunctions.login;

          create = mockFunctions.create;

          logout = mockFunctions.logout;
        }(),
      },
      '../core/Store.ts': {
        default: new class {
          set = mockFunctions.set;
        }(),
      },
      '../core/Router.ts': {
        default: new class {
          go = mockFunctions.go;
        }(),
      },
    })).default;
  });

  describe('.fetchUser()', () => {
    it('должен вызвать me() метод из api', async () => {
      await AuthServiceType.fetchUser();

      expect(mockFunctions.me.called)
        .to.be.true;
    });

    it('должен сохранить user в store', async () => {
      await AuthServiceType.fetchUser();

      expect(mockFunctions.set.lastCall.firstArg)
        .to
        .deep
        .equals({ user: undefined });
    });
  });

  describe('.login()', () => {
    it('должен перенаправить в /messenger', async () => {
      await AuthServiceType.loginUser({
        login: 'test',
        password: 'test',
      });

      expect(mockFunctions.go.lastCall.firstArg)
        .to
        .eq('/messenger');
    });

    it('должен вызвать login() метод из api', async () => {
      await AuthServiceType.loginUser({
        login: 'test',
        password: 'test',
      });

      expect(mockFunctions.login.called)
        .to.be.true;
    });
  });

  describe('.create()', () => {
    it('должен перенаправить в /messenger', async () => {
      await AuthServiceType.registerUser({
        login: 'test',
        password: 'test',
        email: 'test',
        first_name: 'test',
        second_name: 'test',
        phone: 'test',
      });

      expect(mockFunctions.go.lastCall.firstArg)
        .to
        .eq('/messenger');
    });

    it('должен вызвать create() метод из api', async () => {
      await AuthServiceType.registerUser({
        login: 'test',
        password: 'test',
        email: 'test',
        first_name: 'test',
        second_name: 'test',
        phone: 'test',
      });

      expect(mockFunctions.create.called)
        .to.be.true;
    });
  });

  describe('.logout()', () => {
    it('должен вызвать logout() метод из api', () => {
      AuthServiceType.logoutUser();

      expect(mockFunctions.logout.called)
        .to.be.true;
    });

    it('должен перенаправить в  navigate', () => {
      AuthServiceType.logoutUser();

      expect(mockFunctions.go.lastCall.firstArg)
        .to
        .eq('navigate');
    });
  });
});
