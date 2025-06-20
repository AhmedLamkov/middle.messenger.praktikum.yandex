import type { APIError, UserDTO } from '../api/type';

export interface BlockMeta {
  tagName: string;
  props?: Record<string, any>;
}
export interface PropsDialog extends Partial<HTMLElement> {
  router: any;
  showDialog?: boolean;
}

export type Props = Record<string, any>;

export interface RouteInterface {
  render: () => void;
  match: (path: string) => boolean;
  leave: () => void;
}

export interface State {
  isLoading?: boolean;
  user?: UserDTO | APIError;
  loginError?: string;
}
