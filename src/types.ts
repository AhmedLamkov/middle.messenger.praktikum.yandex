import * as Pages from './pages/index.ts';

export interface Events {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
}

export type Block = typeof Pages[keyof typeof Pages];

export interface PageInfo {
  source: Block;
  chatUsers?: ChatUser[];
  name?: string;
  avatar?: string;
  showDialog?: boolean;
}

export interface ChatUser {
  name: string;
  message: string;
  date: string;
  active?: boolean;
}
