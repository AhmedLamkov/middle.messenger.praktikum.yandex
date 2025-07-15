import type { ChatInfo } from '../../api/type.ts';
import Block from '../../core/block.ts';
import ChatsService from '../../services/ChatsService.ts';
import getReadableTime from '../../utils/getRenableTime.ts';

export interface ChatProps {
  chat: ChatInfo
}

export default class ChatCard extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      tagName: 'li',
      className: 'chatCard',
      events: {
        click: () => this.selectChat(),
      },
    });
  }

  selectChat() {
    ChatsService.selectChat(this.props.id);
  }

  public render(): string {
    const lastMessageTime = this.props?.last_message?.time ? getReadableTime(this.props?.last_message?.time) : null;
    return `
      <img class="chatCard__icon" src=https://ya-praktikum.tech/api/v2/resources${this.props.avatar}></img>
      <div class="chatCard__wrapper">
        <div class="chatCard__title">${this.props.title}</div>
        <div class="chatCard__description">${this.props.last_message?.user?.login}: ${this.props.last_message?.content}</div>
      </div>
      <div class="chatCard__date">${lastMessageTime || ''}</div>
      <div class="chatCard__notification"></div>
    `;
  }
}
