import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import { Button } from '../button/index.ts';
import Input from '../input/inputField.ts';

export default class Dialog extends Block {
  constructor(props: Props | undefined) {
    super('div', {
      ...props,
      avatar: new Input({
        type: 'file',
        name: 'avatar',
        label: 'Выбрать файл на компьютере',
        accept: '.jpg,.jpeg,.png',
        className: 'file',
        events: {
          change: (e) => this.ChangeFile(e),
        },
      }),
      buttonChange: new Button({
        label: 'Поменять',
        type: 'submit',
        events: {
          click: () => this.SubmitFile(),
        },
      }),
    });
  }

  private ChangeFile(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    const name = target.files?.[0].name;
    const container = this.element?.querySelector('.dialog__container');
    const fileName = this.element?.querySelector('.dialog__fileName');

    container?.classList.add('selected');
    if (fileName && name) {
      fileName.textContent = name;
    }
  }

  private SubmitFile() {
    this.element?.querySelector('.dialog')?.classList.remove('open');
  }

  public render(): string {
    return `
      <div class="dialog">
      <div class="dialog__container">
        <h2 class="dialog__title">Загрузите файл</h2>
        <h2 class="dialog__selected">Файл загружен</h2>
        <span class="dialog__fileName"></span>
        {{{ avatar }}}
        {{{ buttonChange }}}
        <div class="dialog__error">Нужно выбрать файл</div>
      </div>
      </div>
    `;
  }
}
