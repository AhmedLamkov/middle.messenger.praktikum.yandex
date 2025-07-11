import ChatsApi from '../api/chatsApi.ts';
import { ROUTER } from '../constants.ts';
import MessagesService from './MessagesService.ts';

export class ChatsService {
  async createChat(title: string) {
    try {
      await ChatsApi.createChat(title);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(ROUTER.error);
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
      window.router.go(ROUTER.error);
    }
  }

  async deleteChat(id: number) {
    try {
      await ChatsApi.deleteChat(id);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(ROUTER.error);
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      await ChatsApi.deleteUserFromChat(id, userId);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(ROUTER.error);
    }

    return null;
  }

  getChatToken(id: number) {
    try {
      return ChatsApi.getChatToken(id);
    } catch (e: any) {
      console.error(e.message);
      window.router.go(ROUTER.error);
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
      window.router.go(ROUTER.error);
    }

    return null;
  }

  async changeChatAvatar(data: FormData) {
    try {
      await ChatsApi.changeChatAvatar(data);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
      window.router.go(ROUTER.error);
    }
  }
}

export default new ChatsService();
