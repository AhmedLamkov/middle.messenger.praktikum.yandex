import type { Block } from '../types.ts';
import type { Props, RouteInterface } from './types';

class Route implements RouteInterface {
  private _pathname: string;

  private _blockClass: Block;

  private _block: InstanceType<Block> | null;

  private _props: Props;

  constructor(pathname: string, view: Block, props: Props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  _renderDom(query: string, block: InstanceType<Block>) {
    const root = document.querySelector(query);
    if (root) {
      const content = block.getContent();
      root.innerHTML = '';
      content && root.append(content);
    }
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({ router: this });
    }

    // this._block.show();
    this._renderDom(this._props.rootQuery, this._block);
    this._block?.componentDidMount();
  }
}

export default Route;
