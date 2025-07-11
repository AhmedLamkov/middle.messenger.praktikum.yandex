import type { ChatInfo, UserDTO, messageProps } from '../api/type';

export interface BlockMeta {
  tagName: string;
  props?: Record<string, any>;
}

export type Props = Record<string, any>;

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
  leave: () => void;
}

export interface State {
  user?: UserDTO;
  loginError?: string;
  chats?: ChatInfo[];
  selectedChat?: number;
  onSubmit?: Event;
  messages?: Record<number, messageProps[]>;
  showDialog?: boolean;
}
