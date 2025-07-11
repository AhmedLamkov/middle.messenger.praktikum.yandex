import { ROUTER } from '../constants.ts';
import AuthApi from '../api/authApi.ts';
import type { CreateUser, LoginRequestData } from '../api/type.ts';

class AuthService {
  async fetchUser() {
    try {
      const user = await AuthApi.me();
      window.store.set({ user });
    } catch (responsError: any) {
      const error = await responsError;
      window.store.set({ loginError: error.reason });
    }
  }

  async loginUser(data: LoginRequestData) {
    try {
      await AuthApi.login(data);
      await this.fetchUser();
      window.router.go(ROUTER.chats);
    } catch (responsError: any) {
      const error = await responsError.json();
      window.store.set({ loginError: error.reason });
    }
  }

  async registerUser(data: CreateUser) {
    try {
      await AuthApi.create(data);
      await this.fetchUser();
      window.router.go(ROUTER.chats);
    } catch (responsError:any) {
      const error = await responsError.json();
      window.store.set({ loginError: error.reason });
    }
  }

  async logoutUser() {
    try {
      await AuthApi.logout();
      window.router.go(ROUTER.navigate);
    } catch (responsError:any) {
      const error = await responsError.json();
      window.store.set({ loginError: error.reason });
    }
  }
}

export default new AuthService();
