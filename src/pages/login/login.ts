import { Button , Input } from "../../components";
import Block from "../../core/block";
import type { Props } from "../../core/types";

export default class LoginPage extends Block {
	constructor(props: Props | undefined) {
		super("div", {
			...props,
			formState: {
  			login: "",
	  		password: "",
			},
			errors: {
				login: "",
				password: "",
			},
			className: "container",
			InputLogin: new Input({
				label: "Логин",
				type:"text",
				name:"login"
			}),
			InputPassword: new Input({
				label: "Пароль",
				type:"text",
				name:"password"
			}),
			SignInButton: new Button({
				label: "Авторизоваться",
			}),
			SignUpButton: new Button({
				label: "Нет аккаунта?"
			}) 
		})
	}
	public render(): string {
    return `
			<div class="login">
				<h1 class="login__title">Вход</h1>
				<form class="login-form">
					<div class="login__wrapper">
						{{{ InputLogin }}}
						{{{ InputPassword }}}
					</div>
					<div class="login__btns">
						{{{ SignInButton }}}
						{{{ SignUpButton }}}
					</div>
				</form>
			</div>
    `;
  }
}