import {
  Button, Input, BackButton,
  Modal,
  ChangeAvatar,
} from '../../components/index.ts';
import Block from '../../core/block.ts';
import type { Props, State } from '../../core/types';
import { ROUTER } from '../../constants.ts';
import { withRouter } from '../../utils/withRouter.ts';
import withStore from '../../utils/withStore.ts';
import AuthService from '../../services/AuthService.ts';
import UsersService from '../../services/UsersService.ts';

class EditProfilePage extends Block {
  constructor(props: State) {
    super({
      ...props,
      tagName: 'main',
      changeAvatar: new ChangeAvatar({
        src: props.user?.avatar,
        events: {
          click: () => this.openModal(),
        },
      }),
      modalFile: new Modal({
        open: false,
        events: {
          click: () => this.closeModal(),
        },
        onSubmit: (e: SubmitEvent) => this.handleSubmitAvatar(e),
        title: 'Добавить пользователя',
        buttonProps: {
          label: 'Загрузите файл',
        },
        inputProps: {
          type: 'file',
          name: 'avatar',
          label: 'Выбрать файл на компьютере',
          accept: '.jpg,.jpeg,.png',
          className: 'file',
          events: {
            change: (e: Event) => this.ChangeFile(e),
          },
        },
      }),
      BackButton: new BackButton({
        onClick: () => props.router.go(ROUTER.profile),
      }),
      formState: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      email: new Input({
        value: props.user && props.user.email,
        className: 'edit',
        type: 'email',
        name: 'email',
        events: {
          blur: (e) => this.ValidateEmail(e),
        },
      }),
      login: new Input({
        value: props.user && props.user.login,
        className: 'edit',
        type: 'text',
        name: 'login',
        events: {
          blur: (e) => this.ValidateLogin(e),
        },
      }),
      first_name: new Input({
        value: props.user && props.user.first_name,
        className: 'edit',
        type: 'text',
        name: 'first_name',
        events: {
          blur: (e) => this.ValidateFirstName(e),
        },
      }),
      second_name: new Input({
        value: props.user && props.user.second_name,
        className: 'edit',
        type: 'text',
        name: 'second_name',
        events: {
          blur: (e) => this.ValidateSecondName(e),
        },
      }),
      display_name: new Input({
        value: props.user && props.user.display_name,
        className: 'edit',
        type: 'text',
        name: 'display_name',
        events: {
          blur: (e) => this.ValidateChatName(e),
        },
      }),
      phone: new Input({
        value: props.user && props.user.phone,
        className: 'edit',
        type: 'phone',
        name: 'tel',
        events: {
          blur: (e) => this.ValidatePhone(e),
        },
      }),
      SaveButton: new Button({
        className: 'save',
        label: 'Сохранить',
      }),

    });
  }

  private openModal() {
    (this.children.modalFile as Block).setProps({ open: true });
  }

  private closeModal() {
    (this.children.modalFile as Block).setProps({ open: false });
  }

  private ChangeFile(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const name = target.files?.[0].name;

    (this.children.modalFile as Block).setProps({ title: 'Файл загружен', selected: true });
    ((this.children.modalFile as Block).children.input as Block).setProps({ label: name });
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

  private ValidateChatName(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.trim();
    const chatName = this.children.display_name as Block;

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

    if (Array.isArray(chatName)) {
      chatName.forEach((child) => child.setProps({ error }));
    } else {
      chatName.setProps({ error });
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

  init(): void {
    AuthService.fetchUser();
    super.init();
  }

  componentDidMount(): void {
    this.handleSubmit();
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    const email = document.querySelector('input[name="email"]') as HTMLInputElement;
    const login = document.querySelector('input[name="login"]') as HTMLInputElement;
    const firstName = document.querySelector('input[name="first_name"]') as HTMLInputElement;
    const secondName = document.querySelector('input[name="second_name"]') as HTMLInputElement;
    const displayName = document.querySelector('input[name="display_name"]') as HTMLInputElement;
    const phone = document.querySelector('input[name="tel"]') as HTMLInputElement;

    email.value = newProps.user.email;
    login.value = newProps.user.login;
    firstName.value = newProps.user.first_name;
    secondName.value = newProps.user.second_name;
    displayName.value = newProps.user.display_name;
    phone.value = newProps.user.phone;

    return super.componentDidUpdate(oldProps, newProps);
  }

  private handleSubmit() {
    const form = document.querySelector('.editProfile__wrapper');
    const email = this.children.email as Block;
    const login = this.children.login as Block;
    const firstName = this.children.first_name as Block;
    const secondName = this.children.second_name as Block;
    const displayName = this.children.display_name as Block;
    const phone = this.children.phone as Block;

    const emailElement = email.element?.querySelector('input') as HTMLInputElement;
    const loginElement = login.element?.querySelector('input') as HTMLInputElement;
    const firstNameElement = firstName.element?.querySelector('input') as HTMLInputElement;
    const secondNameElement = secondName.element?.querySelector('input') as HTMLInputElement;
    const chatNameElement = displayName.element?.querySelector('input') as HTMLInputElement;
    const phoneElement = phone.element?.querySelector('input') as HTMLInputElement;

    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      if (login.props.error ||
        email.props.error ||
        firstName.props.error ||
        secondName.props.error ||
        displayName.props.error ||
        phone.props.error
      ) {
        return;
      }

      if (loginElement.value.trim() === '' ||
        emailElement.value.trim() === '' ||
        firstNameElement.value.trim() === '' ||
        secondNameElement.value.trim() === '' ||
        chatNameElement.value.trim() === '' ||
        phoneElement.value.trim() === ''
      ) {
        return;
      }
      UsersService.changeProfileData({
        email: emailElement.value,
        login: loginElement.value,
        first_name: firstNameElement.value,
        second_name: secondNameElement.value,
        display_name: chatNameElement.value,
        phone: phoneElement.value,
      });
    });
  }

  private handleSubmitAvatar(e: SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData as any);
    UsersService.changeAvatar(values.avatar);
  }

  public render(): string {
    return `
      <div class="editProfile"> 
        <form class="editProfile__wrapper">
          {{{ changeAvatar }}}
          <div class="editProfile__item">
            <div class="editProfile__label">Почта</div>
            {{{ email }}}
          </div>
          <div class="editProfile__item">
            <div class="editProfile__label">Логин</div>
            {{{ login }}}
          </div>
          <div class="editProfile__item">
            <div class="editProfile__label">Имя</div>
            {{{ first_name }}}
          </div>
          <div class="editProfile__item">
            <div class="editProfile__label">Фамилия</div>
            {{{ second_name }}}
          </div>
          <div class="editProfile__item">
            <div class="editProfile__label">Имя в чате</div>
            {{{ display_name }}}
          </div>
          <div class="editProfile__item">
            <div class="editProfile__label">Телефон</div>
            {{{ phone }}}
          </div>
          {{{ SaveButton }}}
        </form>
      </div>
      {{{ BackButton }}}
      {{{ modalFile }}}
    `;
  }
}
const userStore = withStore((state) => ({ user: state.user }));
export default userStore(withRouter(EditProfilePage));
