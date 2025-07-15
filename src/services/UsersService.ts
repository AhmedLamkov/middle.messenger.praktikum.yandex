import UsersApi from '../api/usersApi.ts';
import type { ChangePasswordData, ChangeProfileData } from '../api/type';
import { Routes } from '../main.ts';

class UsersService {
  async changeProfileData(data: ChangeProfileData) {
    try {
      const user = await UsersApi.changeProfile(data);
      window.store.set({ user });
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }

  async changeAvatar(avatar: File) {
    try {
      const user = await UsersApi.changeAvatar(avatar);
      window.store.set({ user });
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }

  async changePassword(data: ChangePasswordData) {
    try {
      await UsersApi.changePassword(data);
      window.router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }

  async searchUsers(login: string) {
    try {
      return await UsersApi.searchUsers(login);
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }

    return [];
  }
}

export default new UsersService();
