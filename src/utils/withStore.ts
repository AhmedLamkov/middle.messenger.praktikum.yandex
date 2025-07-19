import type Block from '../core/block';
import Store, { StoreEvents } from '../core/Store.ts';
import type { State } from '../core/types.ts';

export default function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P extends HTMLElement, SP>(Component: typeof Block<P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(Store.getState());

        super({ ...props, ...previousState });

        Store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(Store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps } as SP & P);
        });
      }
    };
  };
}
