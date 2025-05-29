import { Button , Input } from "../../components";
import Block from "../../core/block";
import type { Props } from "../../core/types";

export default class EditProfilePage extends Block {
	constructor(props: Props | undefined) {
		super("main", {
			...props,
			InputOldPassword: new Input({
				placeholder: "•••••••••",
				className:"edit",
				type:"password",
				name:"oldPassword"
			}),
			InputNewPassword: new Input({
				placeholder: "•••••••••••••",
				className:"edit",
				type:"password",
				name:"newPassword"
			}),
			InputRepeatNewPassword: new Input({
				placeholder: "•••••••••••••",
				className:"edit",
				type:"password",
				name:"newPassword"
			}),
			SaveButton: new Button({
				className: "save",
				label: "Сохранить",
			}),
		})
	}
	public render(): string {
		return `
			<div class="resetPassword">
				<form class="resetPassword__wrapper">
					<div class="resetPassword__background">
						<img class="resetPassword__image" src="{{avatar}}" alt="Здесь должен быть ваш аватар">
					</div>
					<div class="resetPassword__item">
						<div class="resetPassword__label">Старый пароль</div>
						{{{ InputOldPassword }}}
					</div>
					<div class="resetPassword__item">
						<div class="resetPassword__label">Новый пароль</div>
						{{{ InputNewPassword }}}
					</div>
					<div class="resetPassword__item">
						<div class="resetPassword__label">Повторите новый пароль</div>
						{{{ InputRepeatNewPassword }}}
					</div>
				</form>
			</div>
			{{{ SaveButton }}}
			<div class="editProfile__back">
				<div class="profile__icon"></div>
			</div>
			{{#if showDialog}}
				{{#> Dialog}}{{/ Dialog}}
			{{/if}}
		`
	}
}