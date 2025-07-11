import Handlebars from 'handlebars';
import './reset.scss';
import './style.scss';
import * as Components from './components/index.ts';
import * as Pages from './pages/index.ts';

import Router from './core/Router.ts';
import { ROUTER } from './constants.ts';
import { Store } from './core/Store.ts';
import AuthService from './services/AuthService.ts';

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

window.store = new Store({});

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

await AuthService.fetchUser();
