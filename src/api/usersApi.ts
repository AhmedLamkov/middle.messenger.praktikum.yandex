import { HTTPTransport } from '../core/httpTransport.ts';
import type {
  ChangePasswordData, ChangeProfileData, User, UserDTO,
} from './type.ts';

const userApi = new HTTPTransport('/user');

class UsersApi {
  async changeProfile(data: ChangeProfileData) {
    return userApi.put<UserDTO>('/profile', { data });
  }

  async changeAvatar(avatar: File) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return userApi.put<UserDTO>('/profile/avatar', { data: formData });
  }

  async changePassword(data: ChangePasswordData) {
    return userApi.put('/password', { data });
  }

  async getUserById(id: string): Promise<User> {
    return userApi.get(`/${id}`);
  }

  async searchUsers(login: string): Promise<User[]> {
    return userApi.post('/search', { data: { login } });
  }
}

export default new UsersApi();
