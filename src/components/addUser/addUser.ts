import Block from '../../core/block.ts';
import type { Props } from '../../core/types';

export default class AddUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'div',
      className: 'addUser',
    });
  }

  public render(): string {
    return `
      <div class="addUser__icon"></div>
      <div class="addUser__text">Добавить пользователя</div>
    `;
  }
}
