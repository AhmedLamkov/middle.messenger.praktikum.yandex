import Block from "../../core/block";
import type { Props } from "../../core/types";

export default class ProfilePage extends Block {
	constructor(props: Props | undefined) {
		super("main", {
			...props,
		})
	}
	public render(): string {
		return `
			<div class="profile">
				<div class="profile__wrapper">
					<div class="profile__background" data-open-dialog>
						<img class="profile__image" id="image" src="{{avatar}}" alt="Здесь должен быть ваш аватар">
					</div>
					<h1 class="profile__title">Иван</h1>
					<div class="profile__item">
						<div class="profile__label">Почта</div>
						<div class="profile__text">pochta@yandex.ru</div>
					</div>
					<div class="profile__item">
						<div class="profile__label">Логин</div>
						<div class="profile__text">ivanivanov</div>
					</div>
					<div class="profile__item">
						<div class="profile__label">Имя</div>
						<div class="profile__text">Иван</div>
					</div>
					<div class="profile__item">
						<div class="profile__label">Фамилия</div>
						<div class="profile__text">Иванов</div>
					</div>
					<div class="profile__item">
						<div class="profile__label">Имя в чате</div>
						<div class="profile__text">Иван</div>
					</div>
					<div class="profile__item">
						<div class="profile__label">Телефон</div>
						<div class="profile__text">+7 (909) 967 30 30</div>
					</div>
					<nav class="profile__actions">
						<div class="profile__item">
							<a href="#" class="profile__edit" page="editProfile">Изменить данные</a>
						</div>
						<div class="profile__item">
							<a href="#" class="profile__edit" page="resetPassword">Изменить пароль</a>
						</div>
						<div class="profile__exit">Выйти</div>
					</nav>
			</div>
		</div>
		<div class="profile__back">
			<div class="profile__icon"></div>
		</div>
		{{#if showDialog}}
			{{#> Dialog}}{{/ Dialog}}
		{{/if}}
		`
	}
}