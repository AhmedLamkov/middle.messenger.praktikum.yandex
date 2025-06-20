import EventBus from './eventBus.ts';
import type { State } from './types.ts';

const StoreEvents = {
  Updated: 'UPDATED',
} as const;

export class Store extends EventBus<string> {
  private state: State = {};

  static __instance: Store;

  constructor(defaultState: State) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState() {
    return this.state;
  }

  public set(nextState: State) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }
}
