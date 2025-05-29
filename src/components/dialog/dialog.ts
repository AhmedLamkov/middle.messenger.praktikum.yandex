import Block from "../../core/block";
import type { Props } from "../../core/types";
import { Button } from "../button";
import Input from "../input/inputField";
export default class Dialog extends Block {
	constructor(props: Props | undefined) {
		super("div", {
			...props,
			InputFile: new Input({
				type: "file",
				name: "avatar",
				label: "Выбрать файл на компьютере",
				className: "file"
			}),
			ButtonChange: new Button({
				label:"Поменять",
				type: "submit"
			})
		})
	}
	public render(): string {
		return `
			<div class="dialog">
			<div class="dialog__container">
				<div class="dialog__title">Загрузите файл</div>
				{{{ InputFile }}}
				{{{ ButtonChange }}}
			</div>
			</div>
			{{#dialog}}{{/dialog}}
		`
	}
}