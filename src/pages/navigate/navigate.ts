import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import { withRouter } from '../../utils/withRouter.ts';

class NavigatePage extends Block {
  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'nav',
    });
  }

  public render(): string {
    return `
      <ul>
        <li><a href="#" page="/">Вход</a></li>
        <li><a href="#" page="messenger">Список чатов</a></li>
        <li><a href="#" page="sign-up">Регистрация</a></li>
        <li><a href="#" page="profile">Профиль</a></li>
        <li><a href="#" page="settings">Изменить данные</a></li>
        <li><a href="#" page="resetPassword">Изменить пароль</a></li>
        <li><a href="#" page="500">500</a></li>
        <li><a href="#" page="400">404</a></li>
    </ul>
    `;
  }
}

export default withRouter(NavigatePage);
