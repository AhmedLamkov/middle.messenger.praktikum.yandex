import Block from '../../core/block.ts';

export interface ChatProps {
  name: string;
  message: string;
  date: string;
}

export default class ChatCard extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      tagName: 'li',
      className: 'chatCard',
    });
  }

  public render(): string {
    return `
      <div class="chatCard__icon"></div>
      <div class="chatCard__wrapper">
        <div class="chatCard__title">${this.props.name}</div>
        <div class="chatCard__description">${this.props.message}</div>
      </div>
      <div class="chatCard__date">${this.props.date}</div>
      <div class="chatCard__notification"></div>
    `;
  }
}
