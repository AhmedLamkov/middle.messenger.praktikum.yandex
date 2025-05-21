import Handlebars from 'handlebars';
import './reset.scss';
import './style.scss';
import * as Components from './components';
import * as Pages from './pages';

import avatar from './assets/avatar.svg';

const pages = {
  'login': [ Pages.LoginPage ],
  'error': [ Pages.ErrorPage ],
  'editProfile': [ Pages.EditProfilePage, {
    name: 'avatar', avatar: avatar, showDialog: true,
  }],
  'notFound': [ Pages.NotFoundPage ],
  'profile': [ Pages.ProfilePage, {
    name: 'avatar', avatar: avatar,
  }],
  'register': [ Pages.RegisterPage ],
  'resetPassword': [ Pages.ResetPasswordPage, {
    name: 'avatar', avatar: avatar
  }],
  'chats': [ Pages.ChatsPage, {
    chat: [
      {name: 'Андрей', message: 'Изображение', date: '10:49'},
      {name: 'Киноклуб', message: 'Вы: стикер', date: '10:49'},
      {name: 'Илья', message: 'Друзья, у меня для вас особенный выпуск новостей!...', date: '10:49'},
      {name: 'Вадим', message: 'Вы: Круто!', date: '10:49', active: true},
      {name: 'тет-а-теты', message: 'И Human Interface Guidelines и Material Design рекомендуют...', date: '10:49'},
      {name: '1,2,3', message: 'Миллионы россиян ежедневно проводят десятки часов свое...', date: '10:49'},
      {name: 'Design Destroyer', message: 'В 2008 году художник Jon Rafman начал собирать...', date: '10:49'},
      {name: 'Day.', message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...', date: '10:49'},
      {name: 'Стас Рогозин', message: 'Можно или сегодня или завтра вечером.', date: '10:49'},
    ],
  }],
  'nav': [ Pages.NavigatePage ]
};

Object.entries(Components).forEach(([ name, template ]) => {
  console.log(name, template)
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(source);
  container.innerHTML = temlpatingFunction(context);

  const dialog = document.querySelector('.dialog');
  dialog && setupDialog();
}


document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

const setupDialog = () => {
  const openModal = document.querySelector('[data-open-dialog]');
	const dialog = document.querySelector('.dialog');
  const dialogContainer = document.querySelector('.dialog__container');

	openModal?.addEventListener('click', () => {
		dialog?.classList.add('open');
	});

  dialog?.addEventListener('click', (event) => {
    //@ts-ignore
    
    if(!dialogContainer?.contains(event?.target)) {
      dialog.classList.remove('open');
    }
  });

  document?.addEventListener('keydown', (event) => {
    //@ts-ignore
    if (event.key === "Escape") {
      dialog?.classList.remove('open');
    }
  })
};
