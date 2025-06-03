import { Button, Input, Dialog } from '../../components/index.ts';
import Block from '../../core/block.ts';
import type { PropsDialog } from '../../core/types';
import avatar from '../../assets/avatar.svg';

export default class EditProfilePage extends Block {
  constructor(props: PropsDialog) {
    super('main', {
      ...props,
      Dialog: new Dialog({}),
      formState: {
        login: '',
        password: '',
      },
      errors: {
        login: '',
        password: '',
      },
      email: new Input({
        placeholder: 'pochta@yandex.ru',
        className: 'edit',
        type: 'email',
        name: 'email',
        events: {
          blur: (e) => this.ValidateEmail(e),
        },
      }),
      login: new Input({
        placeholder: 'ivanivanov',
        className: 'edit',
        type: 'text',
        name: 'login',
        events: {
          blur: (e) => this.ValidateLogin(e),
        },
      }),
      first_name: new Input({
        placeholder: 'Иван',
        className: 'edit',
        type: 'text',
        name: 'first_name',
        events: {
          blur: (e) => this.ValidateFirstName(e),
        },
      }),
      second_name: new Input({
        placeholder: 'Иванов',
        className: 'edit',
        type: 'text',
        name: 'second_name',
        events: {
          blur: (e) => this.ValidateSecondName(e),
        },
      }),
      chatName: new Input({
        placeholder: 'Иван',
        className: 'edit',
        type: 'text',
        name: 'display_name',
        events: {
          blur: (e) => this.ValidateChatName(e),
        },
      }),
      phone: new Input({
        placeholder: '+7 (909) 967 30 30',
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
    const chatName = this.children.chatName as Block;

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

  public render(): string {
    return `
      <div class="editProfile"> 
        <form class="editProfile__wrapper">
          <div class="editProfile__background" data-open-dialog>
            <img class="editProfile__image" id="image" src="${avatar}" alt="Здесь должен быть ваш аватар">
            <div class="editProfile__shadow">
              <div class="editProfile__text">Поменять аватар</div>
            </div>
          </div>
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
            {{{ chatName }}}
          </div>
          <div class="editProfile__item">
            <div class="editProfile__label">Телефон</div>
            {{{ phone }}}
          </div>
        </form>
      </div>
      {{{ SaveButton }}}
      <div class="editProfile__back">
        <div class="profile__icon"></div>
      </div>
      {{#if showDialog}}
        {{{ Dialog }}}
      {{/if}}
    `;
  }
}
