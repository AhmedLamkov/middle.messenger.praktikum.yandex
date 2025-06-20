import Block from '../../core/block.ts';
import { Button } from '../../components/index.ts';
import type { Props } from '../../core/types';

export default class ErrorPage extends Block {
  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'main',
      className: 'error',
      backButton: new Button({
        label: 'Назад к чатам',
        className: 'back',
      }),
    });
  }

  public render(): string {
    return `
      <div class="error__title">500</div>
      <div class="error__description">Мы уже фиксим</div>
      {{{ backButton }}}
    `;
  }
}
