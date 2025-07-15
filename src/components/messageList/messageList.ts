import type { messageProps } from '../../api/type.ts';
import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import getReadableTime from '../../utils/getRenableTime.ts';
import { Message } from '../message/index.ts';

class MessageList extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'ul',
      Messages: props.selectedChat && props.messages?.[props.selectedChat]?.map((message: messageProps) => new Message({
        message,
        className: message.user_id === props.user?.id ? 'sent' : 'received',
        time: getReadableTime(message.time),
      })),
    });
  }

  public render(): string {
    return `
      {{#each Messages }}
        {{{ this }}}
      {{/each }}
    `;
  }
}

export default MessageList;
