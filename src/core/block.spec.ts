import sinon from 'sinon';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import Block from './block.ts';
import type { Props } from './types.ts';

describe('Block', () => {
  class Page extends Block {
    constructor(props: Props) {
      super({
        tagName: 'div',
        ...props,
      });
    }

    render() {
      return `<div>
                  <span id="test-text">{{text}}</span>
                  <button>{{text-button}}</button>
              </div>`;
    }
  }

  it('Должен создать компонент с состоянием из конструктора', () => {
    const text = 'Hello';

    const pageComponent = new Page({ text });

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('Компонент должен иметь реактивное поведение', () => {
    const newValue = 'New value';

    const pageComponent = new Page({ text: 'Hello' });

    pageComponent.setProps({ text: newValue });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(newValue);
  });

  it('Компонент должен установить события на элемент', () => {
    const clickhadnlerStub = sinon.stub();
    const pageComponent = new Page({
      events: {
        click: clickhadnlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(clickhadnlerStub.calledOnce).to.be.true;
  });
});
