import Block from "../../core/block";

interface InputProps extends Partial<HTMLInputElement> {
	className?: string;
	events?: Record<string, (e: Event) => void>;
};

export default class Input extends Block {
  constructor({ events, className, ...elementProps }: InputProps) {
    super("input", {
      events,
      className,
      elementProps,
    });
  }
}