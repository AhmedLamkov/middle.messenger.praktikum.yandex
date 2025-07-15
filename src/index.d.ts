import type Router from './core/Router';
import type { Store } from './core/Store';

declare global {
  interface Window {
    store: Store;
    router: Router;
  }
}
