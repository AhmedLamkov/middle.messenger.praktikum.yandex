export interface BlockMeta {
  tagName: string;
  props?: Record<string, any>;
}
export interface PropsDialog extends Partial<HTMLElement> {
  showDialog?: boolean;
}

export type Props = Record<string, any>;
