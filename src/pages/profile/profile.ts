import Block from '../../core/block.ts';
import type { Props, State } from '../../core/types';
import { BackButton, Button, ChangeAvatar } from '../../components/index.ts';
import { withRouter } from '../../utils/withRouter.ts';
import withStore from '../../utils/withStore.ts';
import AuthService from '../../services/AuthService.ts';
import { Routes } from '../../main.ts';

class ProfilePage extends Block {
  constructor(props: State) {
    super({
      ...props,
      tagName: 'main',
      ChangeAvatar: new ChangeAvatar({
        src: props.user?.avatar,
      }),
      exitButton: new Button({
        className: 'exit',
        label: 'Выйти',
        events: {
          click: () => this.Logout(),
        },
      }),
      BackButton: new BackButton({
        onClick: () => window.router.go(Routes.Messenger),
      }),
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    (this.children.ChangeAvatar as Block).setProps({ src: newProps.user.avatar });

    return super.componentDidUpdate(oldProps, newProps);
  }

  private Logout() {
    AuthService.logoutUser();
  }

  public render(): string {
    return `
      <div class="profile">
        <div class="profile__wrapper">
          {{{ ChangeAvatar }}}
          <h1 class="profile__title">${this.props.user?.first_name || ''}</h1>
          <div class="profile__item">
            <div class="profile__label">Почта</div>
            <div class="profile__text">${this.props.user?.email || ''}</div>
          </div>
          <div class="profile__item">
            <div class="profile__label">Логин</div>
            <div class="profile__text">${this.props.user?.login || ''}</div>
          </div>
          <div class="profile__item">
            <div class="profile__label">Имя</div>
            <div class="profile__text">${this.props.user?.first_name || ''}</div>
          </div>
          <div class="profile__item">
            <div class="profile__label">Фамилия</div>
            <div class="profile__text">${this.props.user?.second_name || ''}</div>
          </div>
          <div class="profile__item">
            <div class="profile__label">Имя в чате</div>
            <div class="profile__text">${this.props.user?.display_name || ''}</div>
          </div>
          <div class="profile__item">
            <div class="profile__label">Телефон</div>
            <div class="profile__text">${this.props.user?.phone || ''}</div>
          </div>
          <nav class="profile__actions">
            <div class="profile__item">
              <a href="#" class="profile__edit" page="settings">Изменить данные</a>
            </div>
            <div class="profile__item">
              <a href="#" class="profile__edit" page="resetPassword">Изменить пароль</a>
            </div>
            {{{ exitButton }}}
          </nav>
      </div>
    </div>
    {{{ BackButton }}}
    `;
  }
}
const userStore = withStore((state) => ({ user: state.user }));
export default userStore(withRouter(ProfilePage));
