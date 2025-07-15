import type { ChatInfo } from '../../api/type.ts';
import Block from '../../core/block.ts';
import type { Props, State } from '../../core/types.ts';
import MessagesService from '../../services/MessagesService.ts';
import withStore from '../../utils/withStore.ts';
import {
  Button, Dots, Input, MessageList,
} from '../index.ts';

interface ActiveChatProps extends State {
  openSettings?: () => void;
}

class ActiveChat extends Block {
  constructor(props: ActiveChatProps) {
    super({
      ...props,
      tagName: 'div',
      className: 'activeChat',
      messageList: new MessageList({
        user: props.user,
        selectedChat: props.selectedChat,
        messages: props.messages,
      }),
      sendMessage: new Input({
        placeholder: 'Сообщение',
        className: 'activeChat__input',
        type: 'text',
        name: 'message',
        events: {
          blur: () => this.ValidateMessage(),
        },
      }),
      dots: new Dots({
        events: {
          click: () => props.openSettings?.(),
        },
      }),
      SendButton: new Button({
        className: 'icon',
      }),
    });
  }

  private ValidateMessage() {
    const message = this.children.sendMessage as Block;
    const messageElement = message.element?.querySelector('input') as HTMLInputElement;
    let error = '';

    if (messageElement.value.trim() === '') {
      error = 'Сообщение не должно быть пустым';
    }

    if (Array.isArray(message)) {
      message.forEach((child) => child.setProps({ error }));
    } else {
      message.setProps({ error });
    }
  }

  private handleSubmitMessage() {
    const form = document.querySelector('.activeChat__sendMessage');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const values = Object.fromEntries(formData);
      const message = this.children.sendMessage as Block;
      const messageElement = message.element?.querySelector('input') as HTMLInputElement;

      if (messageElement.value.trim() !== '' && this.props.selectedChat) {
        MessagesService.sendMessage(this.props.selectedChat, values.message as string);
      }
    });
  }

  componentDidMount(): void {
    this.handleSubmitMessage();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    this.children.messageList = new MessageList({
      user: newProps.user,
      selectedChat: newProps.selectedChat,
      messages: newProps.messages,
    });

    return super.componentDidUpdate(oldProps, newProps);
  }

  public render(): string {
    const selectedChat = this.props.chats?.find((chat: ChatInfo) => chat.id === this.props.selectedChat);
    return `
    <div class="activeChat__detail">
      <div class="activeChat__title">
        <img class="activeChat__icon scr="https://ya-praktikum.tech/api/v2/resources${selectedChat?.avatar}"></img>
        <div class="activeChat__name">${selectedChat?.title}</div>
      </div> 
      {{{ dots }}}
    </div>
    {{{ messageList }}}
    <form class="activeChat__sendMessage">
      <div class="activeChat__clip"></div>
      <div class="activeChat__sendText">
        {{{ sendMessage }}}
        {{{ SendButton }}}
      </div>
    </form>
    `;
  }
}
const withChats = withStore((state) => ({
  user: state.user,
  chats: state.chats,
  selectedChat: state.selectedChat,
  messages: state.messages,
}));

export default withChats(ActiveChat);
