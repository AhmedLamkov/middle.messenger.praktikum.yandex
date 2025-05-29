import { Button , Input } from "../../components";
import Block from "../../core/block";
import type { Props } from "../../core/types";

export default class EditProfilePage extends Block {
	constructor(props: Props | undefined) {
		super("main", {
			...props,
			formState: {
  			login: "",
	  		password: "",
			},
			errors: {
				login: "",
				password: "",
			},
			InputEmail: new Input({
				placeholder: "pochta@yandex.ru",
				className: "edit",
				type: "email",
				name: "email"
			}),
			InputLogin: new Input({
				placeholder: "ivanivanov",
				className: "edit",
				type:"text",
				name:"login"
			}),
			InputFirstName: new Input({
				placeholder: "Иван",
				className: "edit",
				type:"text",
				name:"first_name"
			}),
			InputSecondName: new Input({
				placeholder: "Иванов",
				className: "edit",
				type:"text",
				name:"second_name"
			}),
			InputChatName: new Input({
				placeholder: "Иван",
				className: "edit",
				type:"text",
				name:"display_name"
			}),
			InputPhone: new Input({
				placeholder: "+7 (909) 967 30 30",
				className: "edit",
				type:"phone",
				name:"tel"
			}),
			SaveButton: new Button({
				className: "save",
				label: "Сохранить",
			}),
		})
	}

	public render(): string {
		return `
			<div class="editProfile"> 
				<form class="editProfile__wrapper">
					<div class="editProfile__background" data-open-dialog>
						<img class="editProfile__image" id="image" src="{{avatar}}" alt="Здесь должен быть ваш аватар">
					</div>
					<div class="editProfile__item">
						<div class="editProfile__label">Почта</div>
						{{{ InputEmail }}}
					</div>
					<div class="editProfile__item">
						<div class="editProfile__label">Логин</div>
						{{{ InputLogin }}}
					</div>
					<div class="editProfile__item">
						<div class="editProfile__label">Имя</div>
						{{{ InputFirstName }}}
					</div>
					<div class="editProfile__item">
						<div class="editProfile__label">Фамилия</div>
						{{{ InputSecondName }}}
					</div>
					<div class="editProfile__item">
						<div class="editProfile__label">Имя в чате</div>
						{{{ InputChatName }}}
					</div>
					<div class="editProfile__item">
						<div class="editProfile__label">Телефон</div>
						{{{ InputPhone }}}
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