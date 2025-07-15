import Block from '../../core/block.ts';

interface BackButtonProps extends Partial<BackButton> {
  onClick: () => void;
  events?: Record<string, (e: Event) => void>;
  className?: string;
}

export default class BackButton extends Block {
  constructor(props: BackButtonProps) {
    super({
      ...props,
      tagName: 'div',
      className: 'backButton',
      events: {
        click: props.onClick,
      },
    });
  }

  public render() : string {
    return `
      <div class="backButton__icon"></div>
    `;
  }
}
