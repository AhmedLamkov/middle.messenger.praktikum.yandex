import { BackButton, Button, Input } from '../../components/index.ts';
import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import avatar from '../../assets/avatar.svg';
import { withRouter } from '../../utils/withRouter.ts';
import UsersService from '../../services/UsersService.ts';
import withStore from '../../utils/withStore.ts';
import { Routes } from '../../main.ts';
import Router from '../../core/Router.ts';

class ResetPasswordPage extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'main',
      BackButton: new BackButton({
        onClick: () => Router.go(Routes.Profile),
      }),
      oldPassword: new Input({
        value: props.user && props.user.password,
        placeholder: '•••••••••',
        className: 'edit',
        type: 'password',
        name: 'oldPassword',
      }),
      newPassword: new Input({
        placeholder: '•••••••••••••',
        className: 'edit',
        type: 'password',
        name: 'newPassword',
        events: {
          blur: (e) => this.ValidatePassword(e),
        },
      }),
      confirmNewPassword: new Input({
        placeholder: '•••••••••••••',
        className: 'edit',
        type: 'password',
        name: 'confirmNewPassword',
        events: {
          blur: (e) => this.ValidatePassword(e),
        },
      }),
      SaveButton: new Button({
        className: 'save',
        label: 'Сохранить',
      }),
    });
  }

  private ValidatePassword(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const newPassword = this.children.newPassword as Block;
    const newPasswordElement = newPassword.element?.querySelector('input') as HTMLInputElement;

    const newpasswordValue = newPasswordElement?.value;
    const confirmNewPassword = this.children.confirmNewPassword as Block;
    const confirmNewPasswordElement =
      confirmNewPassword.element?.querySelector('input') as HTMLInputElement;

    let error = '';

    if (target.name === 'newPassword') {
      if (value.length < 8) {
        error = 'Пароль должен быть не менее 8 символов';
      } else if (value.length > 40) {
        error = 'Пароль должен быть не более 40 символов';
      }
      newPassword.setProps({ error });

      if (error) {
        newPasswordElement?.classList.add('error');
      } else {
        newPasswordElement?.classList.remove('error');
      }
    } else {
      if (newpasswordValue !== value) {
        error = 'Пароли не совпадают';
      }

      confirmNewPassword.setProps({ error });
      if (error) {
        newPasswordElement?.classList.add('error');
        confirmNewPasswordElement?.classList.add('error');
      } else {
        newPasswordElement?.classList.remove('error');
        confirmNewPasswordElement?.classList.remove('error');
      }
    }
  }

  componentDidMount(): void {
    this.handleSubmit();
  }

  private handleSubmit() {
    const resetPassword = document.querySelector('.resetPassword__wrapper');
    const oldPassword = this.children.oldPassword as Block;
    const newPassword = this.children.newPassword as Block;
    const confirmNewPassword = this.children.confirmNewPassword as Block;

    const oldPasswordElement = oldPassword.element?.querySelector('input') as HTMLInputElement;
    const newPasswordElement = newPassword.element?.querySelector('input') as HTMLInputElement;
    const confirmNewPasswordElement =
      confirmNewPassword.element?.querySelector('input') as HTMLInputElement;
    resetPassword?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (oldPassword.props.error || confirmNewPassword.props.error || newPassword.props.error) {
        return;
      }

      if (oldPasswordElement.value.trim() === '' || confirmNewPasswordElement.value.trim() === '' || newPasswordElement.value.trim() === '') {
        return;
      }

      UsersService.changePassword({
        oldPassword: oldPasswordElement.value,
        newPassword: newPasswordElement.value,
      });
    });
  }

  public render(): string {
    return `
      <div class="resetPassword">
        <form class="resetPassword__wrapper">
          <div class="resetPassword__background">
            <img class="resetPassword__image" src="${avatar}" alt="Здесь должен быть ваш аватар">
          </div>
          <div class="resetPassword__item">
            <div class="resetPassword__label">Старый пароль</div>
            {{{ oldPassword }}}
          </div>
          <div class="resetPassword__item">
            <div class="resetPassword__label">Новый пароль</div>
            {{{ newPassword }}}
          </div>
          <div class="resetPassword__item">
            <div class="resetPassword__label">Повторите новый пароль</div>
            {{{ confirmNewPassword }}}
          </div>
          {{{ SaveButton }}}
        </form>
      </div>
      {{{ BackButton }}}
    `;
  }
}
const userStore = withStore((state) => ({ user: state.user }));
export default userStore(withRouter(ResetPasswordPage));
