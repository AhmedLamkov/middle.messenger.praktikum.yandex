import { HTTPTransport } from '../core/httpTransport.ts';
import type {
  CreateUser, LoginRequestData, SignUpResponse, UserDTO,
} from './type.ts';

const authApi = new HTTPTransport('auth');

class AuthApi {
  async create(data: CreateUser): Promise<SignUpResponse> {
    return authApi.post<SignUpResponse>('/signup', { data });
  }

  async login(data: LoginRequestData): Promise<void> {
    return authApi.post('/signin', { data });
  }

  async me(): Promise<UserDTO> {
    return authApi.get('/user');
  }

  async logout(): Promise<void> {
    return authApi.post('/logout');
  }
}

export default new AuthApi();
