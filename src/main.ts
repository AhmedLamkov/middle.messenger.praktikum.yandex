import Handlebars from 'handlebars';
import './reset.scss';
import './style.scss';
import * as Components from './components/index.ts';
import * as Pages from './pages/index.ts';
import renderDOM from './core/renderDom.ts';
import type { PageInfo } from './types';

const pages: Record<string, PageInfo> = {
  login: { source: Pages.LoginPage },
  error: { source: Pages.ErrorPage },
  editProfile: {
    source: Pages.EditProfilePage,
    showDialog: true,
  },
  notFound: { source: Pages.NotFoundPage },
  profile: {
    source: Pages.ProfilePage,
    showDialog: true,
  },
  register: { source: Pages.RegisterPage },
  resetPassword: { source: Pages.ResetPasswordPage },
  chats: { source: Pages.ChatsPage },
  nav: { source: Pages.NavigatePage },
};

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

const setupDialog = () => {
  const openModal = document.querySelector('[data-open-dialog]');
  const dialog = document.querySelector('.dialog');
  const dialogContainer = document.querySelector('.dialog__container');

  openModal?.addEventListener('click', () => {
    dialog?.classList.add('open');
  });

  dialog?.addEventListener('click', (event) => {
    if (!dialogContainer?.contains(event?.target as HTMLElement)) {
      dialog.classList.remove('open');
    }
  });

  document?.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      dialog?.classList.remove('open');
    }
  });
};

const navigate = (page: string) => {
  const { source: Source, ...context } = pages[page];
  if (typeof Source === 'function') {
    renderDOM(new Source(context));

    const dialog = document.querySelector('.dialog');
    if (dialog) setupDialog();
    return;
  }

  const container = document.getElementById('app')!;

  const temlpatingFunction = Handlebars.compile(Source);
  container.innerHTML = temlpatingFunction(context);

  const dialog = document.querySelector('.dialog');
  if (dialog) setupDialog();
};

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
  const page = (e.target as HTMLElement).getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
