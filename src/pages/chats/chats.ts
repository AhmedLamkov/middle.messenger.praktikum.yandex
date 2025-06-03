import { Input, ChatList } from '../../components/index.ts';
import chatUsers from './chatUsers.ts';
import Block from '../../core/block.ts';
import type { Props } from '../../core/types';

export default class ChatsPage extends Block {
  constructor(props: Props | undefined) {
    super('main', {
      ...props,
      className: 'chats',
      ChatList: new ChatList({ chatUsers }),
      search: new Input({
        placeholder: 'Поиск',
        className: 'chats__search',
        type: 'text',
        name: 'message',
        icon: true,
      }),
      message: new Input({
        placeholder: 'Сообщение',
        className: 'chats__input',
        type: 'text',
        name: 'message',
        events: {
          blur: () => this.ValidateMessage(),
        },
      }),

    });
  }

  private ValidateMessage() {
    const message = this.children.message as Block;
    const messageElement = message.element?.querySelector('input') as HTMLInputElement;

    let error = '';
    if (messageElement.value.trim() === '') {
      error = 'Сообщение не должно быть пустым';
    }
    if (Array.isArray(message)) {
      message.forEach((child) => child.setProps({ error }));
    } else {
      message.setProps({ error });
    }
  }

  public render(): string {
    return `
      <div class="chats__profiles">
        <nav>
          <a href="#" page="profile" class="chats__link">
            <span>Профиль</span> 
            <div class="chats__arrowLink"></div>
          </a>
        </nav>
          {{{ search }}}
          <div class="chats__iconSearch"></div>
          {{{ ChatList }}}
      </div>
      <div class="chats__dialog">
        <div class="chats__detail">
          <div class="chats__title">
            <div class="chats__icon"></div>
            <div class="chats__name">Вадим</div>
          </div> 
          <div class="chats__dots"></div>
        </div> 
        <div class="chats__wrapper">
          <div class="chats__date">19 июня</div>
          <div class="chats__message-in">
            <div class="chats__container">
              <div class="chats__receive">
                <span class="chats__text">
                  Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент
                  попросила Хассельблад адаптировать модель SWC для полетов на Луну.
                  Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих
                  камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                  Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
                  Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
                </span>
                <div class="chats__time">11:56</div>
              </div>
            </div>
          </div>
          <div class="chats__message-out">
            <div class="chats__container">
              <div class="chats__answer">
                <span class="chats__text">Круто!</span>
                <div class="chats__info">
                  <div class="chats__cheked"></div>
                  <div class="chats__time">12:00</div>
                </div>
              </div>
            </div>    
          </div>
        </div>
        <div class="chats__sendMessage">
          <div class="chats__clip"></div>
          <div class="chats__sendText">
            {{{ message }}}
            <div class="chats__arrow"></div>
          </div>
        </div>
      </div>
    `;
  }
}
