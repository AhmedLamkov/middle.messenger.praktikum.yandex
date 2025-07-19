import { expect } from 'chai';
import sinon from 'sinon';
import { describe, it, beforeEach } from 'mocha';
import Router from './Router.ts';
import Block from './block.ts';

const router = Router;

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  beforeEach(() => {
    Router.reset();
    getContentFake.resetHistory();
  });

  class BlockMock extends Block {
    getContent = () => getContentFake();
  }

  it('.use() должен вернуть экземпляр Router', () => {
    const result = router.use('/', BlockMock);

    expect(result).to.eq(router);
  });

  it('должен отображать страницу при запуске', () => {
    router
      .use('/', BlockMock)
      .start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('.go() должен отобразить страницу c действием возврата истории', () => {
    router
      .use('/', BlockMock)
      .start();

    router.go('/');

    expect(getContentFake.callCount).to.eq(2);
  });

  it('.back() должен отобразить страницу c действием возврата истории', () => {
    router
      .use('/', BlockMock)
      .start();

    router.back();

    expect(getContentFake.callCount).to.eq(2);
  });

  it('.forward() должен отобразить страницу c действием возврата истории', () => {
    router
      .use('/', BlockMock)
      .start();

    router.forward();

    expect(getContentFake.callCount).to.eq(2);
  });
});
