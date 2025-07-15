import type Block from '../core/block';
import type { PropsWithTagName } from '../core/block';

export function withRouter(WrappedBlock: typeof Block) {
  return class extends WrappedBlock {
    constructor(props: PropsWithTagName = { tagName: 'div' }) {
      super({ ...props, router: window.router });
    }
  };
}
