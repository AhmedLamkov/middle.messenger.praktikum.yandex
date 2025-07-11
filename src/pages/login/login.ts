import { Button, Input } from '../../components/index.ts';
import { ROUTER } from '../../constants.ts';
import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import AuthService from '../../services/AuthService.ts';
import { withRouter } from '../../utils/withRouter.ts';

class LoginPage extends Block {
  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'main',
      formState: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      className: 'container',
      login: new Input({
        label: 'Логин',
        type: 'text',
        name: 'login',
        events: {
          blur: (e) => this.ValidateLogin(e),
        },
      }),
      password: new Input({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        events: {
          blur: (e) => this.ValidatePassword(e),
        },
      }),
      SignInButton: new Button({
        label: 'Авторизоваться',
      }),
      SignUpButton: new Button({
        label: 'Нет аккаунта?',
        events: {
          click: (e) => {
            e.preventDefault();
            props?.router.go(ROUTER.register);
          },
        },
      }),
    });
  }

  componentDidMount(): void {
    this.handleSubmit();
  }

  private ValidateLogin(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const { login } = this.children;

    let error = '';
    if (value.length < 3) {
      error = 'Логин должен быть не менее 3 символов';
    } else if (value.length > 20) {
      error = 'Логин должен быть не более 20 символов';
    } else if (/\s/g.test(value)) {
      error = 'Логин не должен содержать пробелы';
    } else if (/[^a-zA-Z0-9\-—–−_]/.test(value)) {
      error = 'В логин нельзя добавлять спецсимволы';
    } else if (!/[a-zA-Z]/g.test(value)) {
      error = 'Логин не может состоять из цифр';
    }

    if (Array.isArray(login)) {
      login.forEach((child) => child.setProps({ error }));
    } else {
      login.setProps({ error });
    }
  }

  private ValidatePassword(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const password = this.children.password as Block;
    const passwordElement = password.element?.querySelector('input');

    let error = '';

    if (target.name === 'password') {
      if (value.length < 8) {
        error = 'Пароль должен быть не менее 8 символов';
      } else if (value.length > 40) {
        error = 'Пароль должен быть не более 40 символов';
      }
      password.setProps({ error });

      if (error) {
        passwordElement?.classList.add('error');
      } else {
        passwordElement?.classList.remove('error');
      }
    }
  }

  private handleSubmit() {
    const form = document.querySelector('.login-form');
    const login = this.children.login as Block;
    const password = this.children.password as Block;
    const loginElement = login.element?.querySelector('input') as HTMLInputElement;
    const passwordElement = password.element?.querySelector('input') as HTMLInputElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (loginElement.value.trim() === '' || passwordElement.value.trim() === '') {
        return;
      }
      AuthService.loginUser({ login: loginElement.value, password: passwordElement.value });
    });
  }

  public render(): string {
    return `
      <div class="login">
        <h1 class="login__title">Вход</h1>
        <form class="login-form">
          <div class="login__wrapper">
            {{{ login }}}
            {{{ password }}}
          </div>
          <div class="login__btns">
            {{{ SignInButton }}}
            {{{ SignUpButton }}}
          </div>
        </form>
      </div>
    `;
  }
}

export default withRouter(LoginPage);
