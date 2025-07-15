import ChatsApi from '../api/chatsApi.ts';
import { Routes } from '../main.ts';
import MessagesService from './MessagesService.ts';

export class ChatsService {
  async createChat(title: string) {
    try {
      await ChatsApi.createChat(title);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }

  async fetchChats() {
    try {
      const chats = await ChatsApi.getChats();

      chats.map(async (chat) => {
        const token = await this.getChatToken(chat.id);
        if (token) {
          await MessagesService.connect(chat.id, token);
        }
      });

      window.store.set({ chats });
    } catch (e: any) {
      console.error(e);
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await ChatsApi.addUsers(id, [userId]);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }

  async deleteChat(id: number) {
    try {
      await ChatsApi.deleteChat(id);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      await ChatsApi.deleteUserFromChat(id, userId);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }

    return null;
  }

  getChatToken(id: number) {
    try {
      return ChatsApi.getChatToken(id);
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }

    return null;
  }

  selectChat(id: number) {
    window.store.set({ selectedChat: id });
  }

  async getChatUsers(id: number) {
    try {
      return ChatsApi.getUsers(id);
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }

    return null;
  }

  async changeChatAvatar(data: FormData) {
    try {
      await ChatsApi.changeChatAvatar(data);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(Routes.ServerError);
    }
  }
}

export default new ChatsService();
