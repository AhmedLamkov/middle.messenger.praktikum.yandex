import Block from './block.ts';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  root!.innerHTML = '';
  const element = block.getContent() as Node;
  element && root!.appendChild(element);
}

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  // Можно завязаться на реализации вашего класса Block
  const element = block.getContent() as Node;
  element && root?.appendChild(element);

  block.dispatchComponentDidMount();

  return root;
}
