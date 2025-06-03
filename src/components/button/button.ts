import Block from '../../core/block.ts';

interface ButtonProps extends Partial<Button> {
  type?: string;
  label: string;
  events?: Record<string, (e: Event) => void>;
  className?: string;
}

export default class Button extends Block {
  constructor({
    className, type, events, label, ...elementProps
  }: ButtonProps) {
    super('button', {
      elementProps,
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
