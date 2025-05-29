import Block from "../../core/block";
import { Button } from "../../components";
import type { Props } from "../../core/types";

export default class NotFoundPage extends Block {
	constructor(props: Props | undefined) {
		super("main", {
			...props,
			className:"notFound",
			backButton: new Button ({
				label: "Назад к чатам",
				className: "back"
			})
		})
	}
	public render(): string {
		return `
			<div class="notFound__title">404</div>
			<div class="notFound__description">Не туда попали</div>
			{{{ backButton }}}
		`;
	}
}
