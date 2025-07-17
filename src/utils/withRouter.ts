import type Block from '../core/block';
import type { PropsWithTagName } from '../core/block';
import Router from '../core/Router.ts';

export function withRouter(WrappedBlock: typeof Block) {
  return class extends WrappedBlock {
    constructor(props: PropsWithTagName = { tagName: 'div' }) {
      super({ ...props, router: Router });
    }
  };
}
