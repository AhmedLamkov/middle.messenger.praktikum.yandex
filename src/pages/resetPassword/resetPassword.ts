import { Button , Input } from "../../components";
import Block from "../../core/block";
import type { Props } from "../../core/types";
import avatar from "../../assets/avatar.svg";

export default class EditProfilePage extends Block {
	constructor(props: Props | undefined) {
		super("main", {
			...props,
			oldPassword: new Input({
				placeholder: "•••••••••",
				className:"edit",
				type:"password",
				name:"oldPassword"
			}),
			newPassword: new Input({
				placeholder: "•••••••••••••",
				className:"edit",
				type:"password",
				name:"newPassword",
				events: {
					blur: (e) => this.ValidatePassword(e)
				}
			}),
			confirmNewPassword: new Input({
				placeholder: "•••••••••••••",
				className:"edit",
				type:"password",
				name:"confirmNewPassword",
				events: {
					blur: (e) => this.ValidatePassword(e)
				}
			}),
			SaveButton: new Button({
				className: "save",
				label: "Сохранить",
			}),
		})
	}

	private ValidatePassword(e: Event) {
			const target = e.target as HTMLInputElement;
			const value = target.value.trim();
			const newPassword = this.children.newPassword as Block;
			const newPasswordElement = newPassword.element?.querySelector('input') as HTMLInputElement;
			
			const newpasswordValue = newPasswordElement?.value;
			const confirmNewPassword = this.children.confirmNewPassword as Block;
			const confirmNewPasswordElement = confirmNewPassword.element?.querySelector('input') as HTMLInputElement;
	
			let error = "";
	
			if (target.name === 'newPassword') {
				if (value.length < 8) {
					error = "Пароль должен быть не менее 8 символов";
				} else if (value.length > 40) {
					error = "Пароль должен быть не более 40 символов";
				}
				newPassword.setProps({ error })
	
				if (error) {
					newPasswordElement?.classList.add('error');
				} else {
					newPasswordElement?.classList.remove('error');
				}
			} else {
				if (newpasswordValue !== value) {
					error = "Пароли не совпадают";
				}
	
				confirmNewPassword.setProps({ error })
				if (error) {
					newPasswordElement?.classList.add('error');
					confirmNewPasswordElement?.classList.add('error');
				} else {
					newPasswordElement?.classList.remove('error');
					confirmNewPasswordElement?.classList.remove('error');
				}
			}
		}

	public render(): string {
		return `
			<div class="resetPassword">
				<form class="resetPassword__wrapper">
					<div class="resetPassword__background data-open-dialog">
						<img class="resetPassword__image" src="${avatar}" alt="Здесь должен быть ваш аватар">
					</div>
					<div class="resetPassword__item">
						<div class="resetPassword__label">Старый пароль</div>
						{{{ oldPassword }}}
					</div>
					<div class="resetPassword__item">
						<div class="resetPassword__label">Новый пароль</div>
						{{{ newPassword }}}
					</div>
					<div class="resetPassword__item">
						<div class="resetPassword__label">Повторите новый пароль</div>
						{{{ confirmNewPassword }}}
					</div>
				</form>
			</div>
			{{{ SaveButton }}}
			<div class="editProfile__back">
				<div class="profile__icon"></div>
			</div>
		`
	}
}