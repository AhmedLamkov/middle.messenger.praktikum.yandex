import Block from '../../core/block.ts';
import type { Props } from '../../core/types.ts';

export default class Message extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'li',
      className: `message ${props.className}`,
    });
  }

  public render(): string {
    return `
      <div class="message__container">
        <p class="message__text">${this.props.message.content}</p>
        <div class="message__info">
          <div class="message__read"></div>
          <div class="message__time">${this.props.time}</div>
        </div>
      </div>
    `;
  }
}
