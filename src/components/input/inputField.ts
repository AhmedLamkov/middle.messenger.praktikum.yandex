import Input from './input.ts';
import Block from '../../core/block.ts';

interface InputFieldProps extends Partial<HTMLInputElement> {
  label?: string;
  error?: string;
  events?: Record<string, (e: Event) => void>;
  icon?: boolean;
}

export default class InputField extends Block {
  constructor({
    label, error, events, icon, className, ...elementProps
  }: InputFieldProps) {
    super('div', {
      className: `input ${className}`,
      label,
      error,
      icon,
      Input: new Input({
        className: 'input__element',
        events: { ...events },
        ...elementProps,
      }),
    });
  }

  public render(): string {
    return `
        <label class="input__container">
          {{{ Input }}}
          <div class="input__label">{{label}}</div>
          {{#if error}}
            <div class="input__error">{{error}}</div>
          {{/if}}
          {{#if icon}}
              <div class="input__icon"></div>
          {{/if}}
        </label>
    `;
  }
}
