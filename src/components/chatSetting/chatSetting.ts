import Block from '../../core/block.ts';
import type { Props } from '../../core/types';
import { AddUser, DeleteUser } from '../index.ts';

interface ChatSettingProps extends Props {
  addUser: () => void;
  deleteUser: () => void;
}
export default class ChatSetting extends Block {
  constructor(props : ChatSettingProps) {
    super({
      ...props,
      tagName: 'div',
      className: `chatSetting ${props.open ? 'open' : undefined}`,
      addUser: new AddUser({
        events: {
          click: () => props.addUser(),
        },
      }),
      deleteUser: new DeleteUser({
        events: {
          click: () => props.deleteUser(),
        },
      }),
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (newProps.open !== oldProps.open) {
      this.props.className = `chatSetting ${newProps.open ? 'open' : undefined}`;
      newProps.open ? this.element?.classList.add('open') : this.element?.classList.remove('open');
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  public render(): string {
    return `
    <div class="chatSetting__container" onclick="event.stopPropagation()"">
      {{{ addUser }}}
      {{{ deleteUser }}}
    </div>
    `;
  }
}
