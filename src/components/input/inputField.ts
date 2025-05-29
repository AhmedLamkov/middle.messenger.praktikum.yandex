import Input  from "./input";
import Block from "../../core/block";

type InputFieldProps = {
  label?: string;
	name: string;
	type: string;
	className?:string;
	icon?: boolean;
	placeholder?: string;
  onChange?: () => void;
  onBlur?: () => void;
};

export default class InputField extends Block {
	constructor(props: InputFieldProps) {
		super("div", {
			...props,
			className: `input`,
			placeholder: props.placeholder || "",
			label: props.label,
			icon: props.icon,
			Input: new Input({
				className: `input__element ${props.className}`
			})
		});
	}
	public render(): string {
    return `
        <label class="input__container">
          {{{ Input }}}
          <div class="input__label">{{label}}</div>
					<div class="input__error">{{#if error}}{{error}}{{/if}}</div>
					{{#if icon}}
	            <div class="input__icon"></div>
	        {{/if}}
        </label>
    `;
  }
}
