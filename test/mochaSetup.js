import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.MouseEvent = jsdom.window.MouseEvent;
global.Node = jsdom.window.Node;
