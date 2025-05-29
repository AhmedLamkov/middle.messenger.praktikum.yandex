import Block from "../../core/block";

type ButtonProps = {
  type?: string;
  label: string;
	className?: string;
  onChange?: () => void;
  onBlur?: () => void;
};

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", {
      ...props,
      className: `button button__${props.className}`,
    });
  }
  public render(): string {
    return `
      {{label}}
    `;
  }
}
