import { Button , Input } from "../../components";
import Block from "../../core/block";
import type { Props } from "../../core/types";

export default class RegisterPage extends Block {
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
			className:"register",
			InputEmail: new Input({
				label: "Почта",
				type:"email",
				name:"email"
			}),
			InputLogin: new Input({
				label: "Логин",
				type:"text",
				name:"login"
			}),
			InputFirstName: new Input({
				label: "Имя",
				type:"text",
				name:"first_name"
			}),
			InputSecondName: new Input({
				label: "Фамилия",
				type:"text",
				name:"second_name"
			}),
			InputPhone: new Input({
				label: "Телефон",
				type:"phone",
				name:"tel"
			}),
			InputPassword: new Input({
				label: "Пароль",
				type:"text",
				name:"password"
			}),
			InputRepeatPassword: new Input({
				label: "Пароль еще раз",
				type:"text",
				name:"password"
			}),
			SignUpButton: new Button({
				label: "Зарегистрироваться"
			}),
			SignInButton: new Button({
				label: "Войти",
				className: "link"
			}), 
		})
	}
	public render(): string {
    return `
				<h1 class="register__title">Регистрация</h1>
				<form class="register__form">
					<div class="register__wrapper">
						{{{ InputEmail }}}
						{{{ InputLogin }}}
						{{{ InputFirstName }}}
						{{{ InputSecondName }}}
						{{{ InputPhone }}}
						{{{ InputPassword }}}
						{{{ InputRepeatPassword }}}
					</div>
					<div class="register__btns">
						{{{ SignUpButton }}}
						{{{ SignInButton }}}
					</div>
				</form>
    `;
  }
}