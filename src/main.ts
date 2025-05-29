import Handlebars from 'handlebars';
import './reset.scss';
import './style.scss';
import * as Components from './components';
import * as Pages from './pages';
import renderDOM from "./core/renderDom";
import type { PageInfo } from './types';

import avatar from './assets/avatar.svg';

const pages: Record<string, PageInfo> = {
  login: { source: Pages.LoginPage },
  error: { source: Pages.ErrorPage },
  editProfile: { source: Pages.EditProfilePage, 
    name: 'avatar', avatar: avatar, showDialog: true,
  },
  notFound: { source: Pages.NotFoundPage },
  profile: { source: Pages.ProfilePage, 
    name: 'avatar', avatar: avatar,
  },
  register: { source: Pages.RegisterPage },
  resetPassword: { source: Pages.ResetPasswordPage, 
    name: 'avatar', avatar: avatar
  },
  chats: { source: Pages.ChatsPage },
  nav: { source: Pages.NavigatePage }
};

Object.entries(Components).forEach(([ name, template ]) => {
  if (typeof template === "function") {
    return;
  }
  Handlebars.registerPartial(name, template);
});

function navigate(page: string) {

  const { source, ...context } = pages[page];
  if (typeof source === "function") {
    renderDOM(new source({}));
    return;
  }

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
