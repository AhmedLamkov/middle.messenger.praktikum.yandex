import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import { Input, Button } from '../index.ts';

export default class Modal extends Block {
  constructor(props: Props) {
    super({
      ...props,
      tagName: 'div',
      className: `modal ${props.open ? 'open' : undefined}`,
      open: props.open,
      input: new Input(props.inputProps),
      title: props.title,
      selected: props.selected,
      button: new Button(props.buttonProps),
    });
  }

  componentDidMount(): void {
    const modalForm = this.element?.querySelector('form.modal__container');

    modalForm?.addEventListener('submit', this.props.onSubmit);
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (newProps.open !== oldProps.open) {
      this.props.className = `modal ${newProps.open ? 'open' : undefined}`;
      newProps.open ? this.element?.classList.add('open') : this.element?.classList.remove('open');
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  public render(): string {
    return `
      <form class="modal__container ${this.props.selected ? 'selected' : ''}" onclick="event.stopPropagation()">
        <h2 class="modal__title">${this.props.title}</h2>
        {{{ input }}}
        {{{ button }}}
         <div class="modal__error">Нужно выбрать файл</div>
      </form>
    `;
  }
}
