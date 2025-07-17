import Handlebars from 'handlebars';
import './reset.scss';
import './style.scss';
import * as Components from './components/index.ts';
import * as Pages from './pages/index.ts';

import Router from './core/Router.ts';
import Store from './core/Store.ts';
import AuthService from './services/AuthService.ts';

export const Routes = {
  Login: '/',
  Signup: '/sign-up',
  Profile: '/profile',
  Settings: '/settings',
  Messenger: '/messenger',
  ResetPassword: '/resetPassword',
  notFound: '/400',
  ServerError: '/500',
  Navigate: 'navigate',
} as const;

Object.entries(Components).forEach(([name, template]) => {
  if (typeof template === 'function') {
    return;
  }
  Handlebars.registerPartial(name, template);
});

window.store = Store;
window.router = Router;
window.addEventListener('DOMContentLoaded', async () => {
  window.router
    .use(Routes.Login, Pages.LoginPage)
    .use(Routes.Messenger, Pages.ChatsPage)
    .use(Routes.Settings, Pages.EditProfilePage)
    .use(Routes.ServerError, Pages.ErrorPage)
    .use(Routes.notFound, Pages.NotFoundPage)
    .use(Routes.Profile, Pages.ProfilePage)
    .use(Routes.Signup, Pages.RegisterPage)
    .use(Routes.ResetPassword, Pages.ResetPasswordPage)
    .use(Routes.Navigate, Pages.NavigatePage)
    .start();

  await AuthService.fetchUser();
});
