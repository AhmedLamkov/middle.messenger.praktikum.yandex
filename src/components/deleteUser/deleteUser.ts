import Block from '../../core/block.ts';
import type { Props } from '../../core/types';

export default class DeleteUser extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'div',
      className: 'deleteUser',
    });
  }

  public render(): string {
    return `
      <div class="deleteUser__icon"></div>
      <div class="deleteUser__text">Удалить пользователя</div>
    `;
  }
}
