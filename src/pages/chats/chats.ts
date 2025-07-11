import {
  Input, ChatList, ChatSetting,
  Modal,
  Button,
} from '../../components/index.ts';
import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import ChatsService from '../../services/ChatsService.ts';
import { withRouter } from '../../utils/withRouter.ts';
import withStore from '../../utils/withStore.ts';
import ActiveChat from '../../components/activeChat/activeChat.ts';
import UsersService from '../../services/UsersService.ts';
import HomeChat from '../../components/homeChat/homeChat.ts';

class ChatsPage extends Block {
  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'main',
      className: 'chats',
      ChatList: new ChatList({
        chats: props?.chats,
      }),
      search: new Input({
        placeholder: 'Поиск',
        className: 'chats__search',
        type: 'text',
        name: 'message',
        icon: true,
      }),
      createChatButton: new Button({
        className: 'chat',
        label: 'cоздать чат',
        events: {
          click: () => this.openCreateChat(),
        },
      }),
      homeChat: new HomeChat({}),
      ActiveChat: new ActiveChat({
        openSettings: () => this.openSettings(),
      }),
      chatSetting: new ChatSetting({
        open: false,
        events: {
          click: () => this.closeSettings(),
        },
        addUser: () => this.openUser('add'),
        deleteUser: () => this.openUser('delete'),
      }),
      createChatModal: new Modal({
        open: false,
        events: {
          click: () => this.closeCreateChat(),
        },
        title: 'Создать чат',
        onSubmit: (e: SubmitEvent) => this.createChat(e),
        buttonProps: {
          label: 'Создать',
          events: {
            click: () => this.closeCreateChat(),
          },
        },
        inputProps: {
          label: 'Имя чата',
          type: 'text',
          name: 'chat_name',
        },
      }),
      addUserModal: new Modal({
        open: false,
        events: {
          click: () => this.closeUser('add'),
        },
        title: 'Добавить пользователя',
        buttonProps: {
          label: 'Добавить',
          events: {
            click: () => this.closeUser('add'),
          },
        },
        onSubmit: (e: SubmitEvent) => this.addUserToChat(e),
        inputProps: {
          className: 'user',
          label: 'Логин',
          type: 'text',
          name: 'login',
        },
      }),
      deleteUserModal: new Modal({
        open: false,
        events: {
          click: () => this.closeUser('delete'),
        },
        title: 'Удалить пользователя',
        buttonProps: {
          label: 'Удалить',
          events: {
            click: () => this.closeUser('delete'),
          },
        },
        onSubmit: (e: SubmitEvent) => this.DeleteUserFromChat(e),
        inputProps: {
          className: 'user',
          label: 'Логин',
          type: 'text',
          name: 'login',
        },
      }),
    });
  }

  private async addUserToChat(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = Object.fromEntries(formData as any);
    const users = await UsersService.searchUsers(value.login);
    const user = users.find((user) => user.login === value.login);
    const chatId = this.props.selectedChat;
    user?.id && ChatsService.addUserToChat(chatId, user?.id);
  }

  private async DeleteUserFromChat(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = Object.fromEntries(formData as any);
    const users = await UsersService.searchUsers(value.login);
    const user = users.find((user) => user.login === value.login);
    const chatId = this.props.selectedChat;
    user?.id && ChatsService.deleteUserFromChat(chatId, user?.id);
  }

  private createChat(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const value = Object.fromEntries(formData as any);
    ChatsService.createChat(value.chat_name);
  }

  private openCreateChat() {
    (this.children.createChatModal as Block).setProps({ open: true });
  }

  private closeCreateChat() {
    (this.children.createChatModal as Block).setProps({ open: false });
  }

  private openSettings() {
    (this.children.chatSetting as Block).setProps({ open: true });
  }

  private closeSettings() {
    (this.children.chatSetting as Block).setProps({ open: false });
  }

  private openUser(action: 'add' | 'delete') {
    this.closeSettings();
    if (action === 'add') {
      (this.children.addUserModal as Block).setProps({ open: true });
    }
    if (action === 'delete') {
      (this.children.deleteUserModal as Block).setProps({ open: true });
    }
  }

  private closeUser(action: 'add' | 'delete') {
    if (action === 'add') {
      (this.children.addUserModal as Block).setProps({ open: false });
    }
    if (action === 'delete') {
      (this.children.deleteUserModal as Block).setProps({ open: false });
    }
  }

  init(): void {
    ChatsService.fetchChats();
    super.init();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    this.children.ChatList = new ChatList({ chats: newProps?.chats });

    return super.componentDidUpdate(oldProps, newProps);
  }

  public render(): string {
    return `
      <div class="chats__profiles">
        <nav>
          <a href="#" page="profile" class="chats__link">
            <span>Профиль</span> 
            <div class="chats__arrowLink"></div>
          </a>
        </nav>
          {{{ search }}}
          <div class="chats__iconSearch"></div>
          {{{ createChatButton }}}
          {{{ ChatList }}}
      </div>
      {{#if ${this.props.selectedChat === undefined}}}
        {{{ homeChat }}}
        {{else}}
        {{{ ActiveChat }}}
      {{/if}}
      {{{ chatSetting }}}
      {{{ addUserModal }}}
      {{{ deleteUserModal }}}
      {{{ createChatModal }}}
    `;
  }
}
const withChats = withStore((state) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
  user: state.user,
}));

export default withChats(withRouter(ChatsPage));
