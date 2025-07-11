import { Button, Input } from '../../components/index.ts';
import { ROUTER } from '../../constants.ts';
import Block from '../../core/block.ts';
import type { Props } from '../../core/types.ts';
import AuthService from '../../services/AuthService.ts';
import { withRouter } from '../../utils/withRouter.ts';

class RegisterPage extends Block {
  formState = {
    login: '',
    password: '',
    phone: '',
  };

  errors = {
    login: '',
    password: '',
    phone: '',
  };

  constructor(props: Props | undefined) {
    super({
      ...props,
      tagName: 'main',
      className: 'register',
      email: new Input({
        label: 'Почта',
        type: 'email',
        name: 'email',
        events: {
          blur: (e) => this.ValidateEmail(e),
        },
      }),
      login: new Input({
        label: 'Логин',
        type: 'text',
        name: 'login',
        events: {
          blur: (e) => this.ValidateLogin(e),
        },
      }),
      first_name: new Input({
        label: 'Имя',
        type: 'text',
        name: 'first_name',
        events: {
          blur: (e) => this.ValidateFirstName(e),
        },
      }),
      second_name: new Input({
        label: 'Фамилия',
        type: 'text',
        name: 'second_name',
        events: {
          blur: (e) => this.ValidateSecondName(e),
        },
      }),
      phone: new Input({
        label: 'Телефон',
        type: 'tel',
        name: 'phone',
        events: {
          blur: (e) => this.ValidatePhone(e),
        },
      }),
      password: new Input({
        label: 'Пароль',
        type: 'password',
        name: 'password',
        autocomplete: 'new-password',
        events: {
          blur: (e) => this.ValidatePassword(e),
        },
      }),
      confirm_password: new Input({
        label: 'Пароль еще раз',
        type: 'password',
        name: 'confirm_password',
        events: {
          blur: (e) => this.ValidatePassword(e),
        },
      }),
      SignUpButton: new Button({
        label: 'Зарегистрироваться',
      }),
      SignInButton: new Button({
        label: 'Войти',
        className: 'link',
        events: {
          click: () => props?.router.go(ROUTER.login),
        },
      }),
    });
  }

  componentDidMount(): void {
    this.handleSubmit();
  }

  private ValidateEmail(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const { email } = this.children;

    let error = '';
    if (!/^[A-Za-z\d\-_]+@[A-Za-z\d\-_]+\.[A-Za-z\d\-_]+$/.test(value)) {
      error = 'Введите корректную почту';
    }

    if (Array.isArray(email)) {
      email.forEach((child) => child.setProps({ error }));
    } else {
      email.setProps({ error });
    }
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
    const passwordValue = passwordElement?.value;
    const confirmPassword = this.children.confirm_password as Block;
    const confirmPasswordElement =
      confirmPassword.element?.querySelector('input') as HTMLInputElement;

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
    } else {
      if (passwordValue !== value) {
        error = 'Пароли не совпадают';
      }

      confirmPassword.setProps({ error });
      if (error) {
        passwordElement?.classList.add('error');
        confirmPasswordElement?.classList.add('error');
      } else {
        passwordElement?.classList.remove('error');
        confirmPasswordElement?.classList.remove('error');
      }
    }
  }

  private ValidateFirstName(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const firstName = this.children.first_name;

    let error = '';
    if (!/^[a-zA-Zа-яА-Я-]+$/g.test(value)) {
      error = 'Можно использовать только латинские буквы или кирилицу';
    } else if (!/^[A-Z]|[А-ЯЁ]/g.test(value)) {
      error = 'Первая буква должна быть заглавной';
    } else if (/['0-9']/g.test(value)) {
      error = 'Нельзя вводить цифры';
    } else if (/\s/g.test(value)) {
      error = 'Имя не должно содержать пробелы';
    }

    if (Array.isArray(firstName)) {
      firstName.forEach((child) => child.setProps({ error }));
    } else {
      firstName.setProps({ error });
    }
  }

  private ValidateSecondName(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const secondName = this.children.second_name;

    let error = '';
    if (!/^[a-zA-Zа-яА-Я-]+$/g.test(value)) {
      error = 'Можно использовать только латинские буквы или кирилицу';
    } else if (!/^[A-Z]|[А-ЯЁ]/g.test(value)) {
      error = 'Первая буква должна быть заглавной';
    } else if (/['0-9']/g.test(value)) {
      error = 'Нельзя вводить цифры';
    } else if (/\s/g.test(value)) {
      error = 'Имя не должно содержать пробелы';
    }

    if (Array.isArray(secondName)) {
      secondName.forEach((child) => child.setProps({ error }));
    } else {
      secondName.setProps({ error });
    }
  }

  private ValidatePhone(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const { phone } = this.children;
    let error = '';

    if (value.length > 15) {
      error = 'Номер телефона должен быть не более 15 символов';
    }

    if (value.length < 10) {
      error = 'Номер телефона должен быть не менее 10 символов';
    }

    if (Array.isArray(phone)) {
      phone.forEach((child) => child.setProps({ error }));
    } else {
      phone.setProps({ error });
    }
  }

  private handleSubmit() {
    const form = document.querySelector('.register__form');
    const login = this.children.login as Block;
    const password = this.children.password as Block;
    const confirmPassword = this.children.confirm_password as Block;
    const email = this.children.email as Block;
    const firstName = this.children.first_name as Block;
    const secondName = this.children.second_name as Block;
    const phone = this.children.phone as Block;

    const loginElement = login.element?.querySelector('input') as HTMLInputElement;
    const passwordElement = password.element?.querySelector('input') as HTMLInputElement;
    const emailElement = email.element?.querySelector('input') as HTMLInputElement;
    const confirmPasswordElement =
      confirmPassword.element?.querySelector('input') as HTMLInputElement;
    const firstNameElement = firstName.element?.querySelector('input') as HTMLInputElement;
    const secondNameElement = secondName.element?.querySelector('input') as HTMLInputElement;
    const phoneElement = phone.element?.querySelector('input') as HTMLInputElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (login.props.error ||
        password.props.error ||
        confirmPassword.props.error ||
        email.props.error ||
        firstName.props.error ||
        secondName.props.error ||
        phone.props.error
      ) {
        return;
      }

      if (loginElement.value.trim() === '' ||
        passwordElement.value.trim() === '' ||
        confirmPasswordElement.value.trim() === '' ||
        emailElement.value.trim() === '' ||
        firstNameElement.value.trim() === '' ||
        secondNameElement.value.trim() === '' ||
        phoneElement.value.trim() === ''
      ) {
        return;
      }
      AuthService.registerUser({
        login: loginElement.value,
        password: passwordElement.value,
        first_name: firstNameElement.value,
        second_name: secondNameElement.value,
        phone: phoneElement.value,
        email: emailElement.value,
      });
    });
  }

  public render(): string {
    return `
      <h1 class="register__title">Регистрация</h1>
      <form class="register__form">
        <div class="register__wrapper">
          {{{ email }}}
          {{{ login }}}
          {{{ first_name }}}
          {{{ second_name }}}
          {{{ phone }}}
          {{{ password }}}
          {{{ confirm_password }}}
        </div>
        <div class="register__btns">
          {{{ SignUpButton }}}
          {{{ SignInButton }}}
        </div>
      </form>
    `;
  }
}

export default withRouter(RegisterPage);
