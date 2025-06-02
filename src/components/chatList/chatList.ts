import Block from '../../core/block.ts';
import { ChatCard } from '../chatCard/index.ts';
import type { Props } from '../../core/types';
import type { ChatProps } from '../chatCard/chatCard';

export default class ChatList extends Block {
  constructor(props: Props | undefined) {
    super('ul', {
      ...props,
      chatUsers: props?.chatUsers.map(
        (props: ChatProps) => new ChatCard(props),
      ),
    });
  }

  public render(): string {
    return `
      {{#each chatUsers }}
        {{{ this }}}
      {{/each }}
    `;
  }
}
