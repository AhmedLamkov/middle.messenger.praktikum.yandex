import Handlebars from 'handlebars';
import './reset.scss';
import './style.scss';
import * as Components from './components/index.ts';
import * as Pages from './pages/index.ts';
// import renderDOM from './core/renderDom.ts';
// import type { PageInfo } from './types';

import Router from './core/Router.ts';
import { ROUTER } from './constants.ts';
// import { Store, StoreEvents } from './core/Store';

// const pages: Record<string, PageInfo> = {
//   login: { source: Pages.LoginPage },
//   error: { source: Pages.ErrorPage },
//   editProfile: {
//     source: Pages.EditProfilePage,
//     showDialog: true,
//   },
//   notFound: { source: Pages.NotFoundPage },
//   profile: {
//     source: Pages.ProfilePage,
//     showDialog: true,
//   },
//   register: { source: Pages.RegisterPage },
//   resetPassword: { source: Pages.ResetPasswordPage },
//   chats: { source: Pages.ChatsPage },
//   nav: { source: Pages.NavigatePage },
// };

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

// const setupDialog = () => {
//   const openModal = document.querySelector('[data-open-dialog]');
//   const dialog = document.querySelector('.dialog');
//   const dialogContainer = document.querySelector('.dialog__container');

//   openModal?.addEventListener('click', () => {
//     dialog?.classList.add('open');
//   });

//   dialog?.addEventListener('click', (event) => {
//     if (!dialogContainer?.contains(event?.target as HTMLElement)) {
//       dialog.classList.remove('open');
//     }
//   });

//   document?.addEventListener('keydown', (event) => {
//     if (event.key === 'Escape') {
//       dialog?.classList.remove('open');
//     }
//   });
// };

// const navigate = (page: string) => {
//   const { source: Source, ...context } = pages[page];
//   if (typeof Source === 'function') {
//     renderDOM(new Source(context));

//     const dialog = document.querySelector('.dialog');
//     if (dialog) setupDialog();
//     return;
//   }

//   const container = document.getElementById('app')!;

//   const temlpatingFunction = Handlebars.compile(Source);
//   container.innerHTML = temlpatingFunction(context);

//   const dialog = document.querySelector('.dialog');
//   if (dialog) setupDialog();
// };

// document.addEventListener('DOMContentLoaded', () => navigate('nav'));

// document.addEventListener('click', (e) => {
//   const page = (e.target as HTMLElement).getAttribute('page');
//   if (page) {
//     navigate(page);

//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });

// window.store = new Store({
//   isLoading: false,
//   user: null,
//   loginError: null,
// });

// store.on(StoreEvents.Updated, (prevState, newState) => {
//   console.log("prevState", prevState);
//   console.log("newState", newState);
// });

const APP_ROOT_ELEMNT = '#app';
window.router = new Router(APP_ROOT_ELEMNT);
window.router
  .use(ROUTER.login, Pages.LoginPage)
  .use(ROUTER.chats, Pages.ChatsPage)
  .use(ROUTER.editProfile, Pages.EditProfilePage)
  .use(ROUTER.error, Pages.ErrorPage)
  .use(ROUTER.notFound, Pages.NotFoundPage)
  .use(ROUTER.profile, Pages.ProfilePage)
  .use(ROUTER.register, Pages.RegisterPage)
  .use(ROUTER.resetPassword, Pages.ResetPasswordPage)
  .use('*', Pages.NavigatePage)
  .start();
