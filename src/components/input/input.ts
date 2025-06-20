import Block from '../../core/block.ts';

interface InputProps extends Partial<HTMLInputElement> {
  className?: string;
  events?: Record<string, (e: Event) => void>;
}

export default class Input extends Block {
  constructor({ events, className, ...elementProps }: InputProps) {
    super({
      events,
      tagName: 'input',
      className,
      elementProps,
    });
  }
}
