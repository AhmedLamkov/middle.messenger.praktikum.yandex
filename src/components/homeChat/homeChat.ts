import Block from '../../core/block.ts';
import type { Props } from '../../core/types';

export default class HomeChat extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'div',
      className: 'homeChat',
    });
  }

  public render(): string {
    return `
      <div class="homeChat__title">Выберите чат чтобы отправить сообщение</div>
    `;
  }
}
