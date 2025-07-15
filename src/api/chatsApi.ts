import { HTTPTransport } from '../core/httpTransport.ts';
import type {
  ChatInfo, User,
} from './type.ts';

const chatApi = new HTTPTransport('chats');

class ChatsApi {
  async getChats(): Promise<ChatInfo[]> {
    return chatApi.get('/');
  }

  async createChat(title: string) {
    return chatApi.post('/', { data: { title } });
  }

  async deleteChat(id: number): Promise<unknown> {
    return chatApi.delete('/', { data: { chatId: id } });
  }

  async getUsers(id: number): Promise<Array<User & { role: string }>> {
    return chatApi.get(`/${id}/users`);
  }

  async addUsers(id: number, users: number[]): Promise<unknown> {
    return chatApi.put('/users', { data: { users, chatId: id } });
  }

  async deleteUserFromChat(id: number, userId: number) {
    return chatApi.delete('/users', { data: { chatId: id, users: [userId] } });
  }

  async changeChatAvatar(data: FormData) {
    return chatApi.put('/avatar', { data });
  }

  async getChatToken(id: number): Promise<string> {
    const response = await chatApi.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }
}

export default new ChatsApi();
