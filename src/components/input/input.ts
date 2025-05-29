import Block from "../../core/block";

type InputProps = {
	className?: string;
  onChange?: () => void;
  onBlur?: () => void;
};

export default class Input extends Block {
  constructor(props: InputProps) {
    super("input", {
      ...props,
    });
  }
}