import AuthApi from '../api/authApi.ts';
import type { CreateUser, LoginRequestData } from '../api/type.ts';
import { Routes } from '../main.ts';
import Store from '../core/Store.ts';
import Router from '../core/Router.ts';

class AuthService {
  async fetchUser() {
    try {
      const user = await AuthApi.me();
      Store.set({ user });
    } catch (responsError: any) {
      const error = await responsError;
      Store.set({ loginError: error.reason });
    }
  }

  async loginUser(data: LoginRequestData) {
    try {
      await AuthApi.login(data);
      await this.fetchUser();
      Router.go(Routes.Messenger);
    } catch (responsError: any) {
      const error = await responsError.json();
      Store.set({ loginError: error.reason });
    }
  }

  async registerUser(data: CreateUser) {
    try {
      await AuthApi.create(data);
      await this.fetchUser();
      Router.go(Routes.Messenger);
    } catch (responsError:any) {
      const error = await responsError.json();
      Store.set({ loginError: error.reason });
    }
  }

  async logoutUser() {
    try {
      await AuthApi.logout();
      Router.go(Routes.Navigate);
    } catch (responsError:any) {
      const error = await responsError.json();
      Store.set({ loginError: error.reason });
    }
  }
}

export default new AuthService();
