import Block from '../../core/block.ts';
import type { Props } from '../../core/types.ts';

interface DotsProps extends Props {
  events?: Record<string, (e: Event) => void>;
  props?: Record<string, any>;
}

export default class Dots extends Block {
  constructor({ props, events } : DotsProps) {
    super({
      ...props,
      tagName: 'div',
      className: 'dots',
      events: { ...events },
    });
  }

  public render(): string {
    return '';
  }
}
