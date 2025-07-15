import Block from '../../core/block.ts';
import type { Props } from '../../core/types.ts';

interface ChangeAvatarProps extends Props {
  src?: string;
}
export default class ChangeAvatar extends Block {
  constructor(props: ChangeAvatarProps) {
    super({
      ...props,
      tagName: 'div',
      className: 'changeAvatar',
    });
  }

  public render(): string {
    return `
        <img class="changeAvatar__image" id="image" src="https://ya-praktikum.tech/api/v2/resources${this.props.src}" 
        alt="Здесь должен быть ваш аватар">
        <div class="changeAvatar__shadow">
          <div class="changeAvatar__text">Поменять аватар</div>
        </div>
    `;
  }
}
