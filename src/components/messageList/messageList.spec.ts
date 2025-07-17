import { expect } from 'chai';
import { describe, it } from 'mocha';
import { MessageList } from './index.ts';

describe('MessageList', () => {
  it('должен рендерить', () => {
    new MessageList({
      messages: [],
    });
  });

  it('элемент должен возвращать ChatList элементы', () => {
    const { element } = new MessageList({
      messages: [],
    });

    expect(element)
      .to
      .be
      .instanceof(window.HTMLUListElement);
  });

  it('должен рендерить дочерний элемент', () => {
    const messages = {
      1: [
        {
          chat_id: 1,
          time: 'test',
          type: 'test',
          user_id: 1,
          content: 'test',
          file: {
            id: 1,
            user_id: 1,
            path: 'test',
            filename: 'test',
            content_type: 'test',
            content_size: 1,
            upload_date: 'test',
          },
        },
        {
          chat_id: 1,
          time: 'test',
          type: 'test',
          user_id: 2,
          content: 'test',
          file: {
            id: 2,
            user_id: 2,
            path: 'test',
            filename: 'test',
            content_type: 'test',
            content_size: 2,
            upload_date: 'test',
          },
        },
      ],
    };

    const messageList = new MessageList({
      selectedChat: 1,
      messages,
    });

    expect(messageList.children.Messages)
      .to
      .have
      .lengthOf(2);
  });
});
