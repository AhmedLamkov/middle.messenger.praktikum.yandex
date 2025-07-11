import Block from '../../core/block.ts';
import { Button } from '../../components/index.ts';
import type { Props } from '../../core/types';
import { withRouter } from '../../utils/withRouter.ts';
import { ROUTER } from '../../constants.ts';

class NotFoundPage extends Block {
  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'main',
      className: 'notFound',
      backButton: new Button({
        label: 'Назад к чатам',
        className: 'back',
        events: {
          click: () => {
            props?.router.go(ROUTER.chats);
          },
        },
      }),
    });
  }

  public render(): string {
    return `
      <div class="notFound__title">404</div>
      <div class="notFound__description">Не туда попали</div>
      {{{ backButton }}}
    `;
  }
}

export default withRouter(NotFoundPage);
