import Block from '../../core/block.ts';

interface ButtonProps extends Partial<HTMLButtonElement> {
  label?: string;
  events?: Record<string, (e: Event) => void>;
}

export default class Button extends Block {
  constructor({
    className, type, events, label, ...elementProps
  }: ButtonProps) {
    super({
      elementProps,
      tagName: 'button',
      label,
      type,
      className: `button ${className}`,
      events: { ...events },
    });
  }

  public render(): string {
    return `
      {{label}}
    `;
  }
}
