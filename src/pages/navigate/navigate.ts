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
        <li><a href="#" page="login">Вход</a></li>
        <li><a href="#" page="chats">Список чатов</a></li>
        <li><a href="#" page="register">Регистрация</a></li>
        <li><a href="#" page="profile">Профиль</a></li>
        <li><a href="#" page="editProfile">Изменить данные</a></li>
        <li><a href="#" page="resetPassword">Изменить пароль</a></li>
        <li><a href="#" page="error">500</a></li>
        <li><a href="#" page="notFound">404</a></li>
    </ul>
    `;
  }
}

export default withRouter(NavigatePage);
