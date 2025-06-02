// import Block from "./core/block";
import * as Pages from './pages/index.ts';

export interface Events {
  INIT: string;
  FLOW_CDM: string;
  FLOW_CDU: string;
  FLOW_RENDER: string;
}

export interface PageInfo {
  source: typeof Pages[keyof typeof Pages];
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
