import type Block from '../core/block';
import { StoreEvents } from '../core/Store.ts';
import type { State } from '../core/types.ts';

export default function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends HTMLElement, SP>(Component: typeof Block<P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(window.store.getState());

        super({ ...props, ...previousState });

        window.store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(window.store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps } as SP & P);
        });
      }
    };
  };
}
