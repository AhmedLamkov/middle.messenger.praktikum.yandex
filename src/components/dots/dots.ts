import Block from '../../core/block.ts';
import type { Props } from '../../core/types.ts';

interface DotsProps extends Props {
  events?: Record<string, (e: Event) => void>;
}

export default class Dots extends Block {
  constructor({ events, ...props } : DotsProps) {
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
