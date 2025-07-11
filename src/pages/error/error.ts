import Block from '../../core/block.ts';
import { Button } from '../../components/index.ts';
import type { Props } from '../../core/types';
import { withRouter } from '../../utils/withRouter.ts';
import { Routes } from '../../main.ts';

class ErrorPage extends Block {
  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'main',
      className: 'error',
      backButton: new Button({
        label: 'Назад к чатам',
        className: 'back',
        events: {
          click: () => {
            props?.router.go(Routes.Messenger);
          },
        },
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

export default withRouter(ErrorPage);
