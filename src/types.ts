// import Block from "./core/block";
import * as Pages from './pages';

export interface Events {
	INIT: string;
	FLOW_CDM: string;
	FLOW_CDU: string;
	FLOW_RENDER: string;
}

export interface PageInfo {
	source: typeof Pages[keyof typeof Pages];
	name?: string;
	avatar?: string;
	showDialog?: boolean;
	chatUsers?: ChatUser[];
}

export interface ChatUser {
	name: string;
	message: string;
	date: string;
	active?: boolean;
}