// import { expect } from 'chai';
// import { describe, it } from 'mocha';
// import ChatList from './chatList.ts';

// describe('ChatList', () => {
//   it('должен рендерить', () => {
//     new ChatList({
//       chats: [],
//     });
//   });

//   it('элемент должен возвращать ChatList элементы', () => {
//     const { element } = new ChatList({
//       chats: [],
//     });

//     expect(element)
//       .to
//       .be
//       .instanceof(window.HTMLUListElement);
//   });

//   it('должен рендерить дочерний элемент', () => {
//     const chats = [
//       {
//         id: 'test',
//         title: 'test',
//         avatar: 'test',
//         unread_count: 'test',
//         created_by: 'test',
//         last_message: {
//         user: {
//           first_name: 'test',
//           second_name: 'test',
//           avatar: 'test',
//           email: 'test',
//           login: 'test',
//           phone: 'test',
//         },
//           time: 'test',
//           content: 'test',
//         }
//       }
//     ];

//     const chatList = new ChatList({
//       chats,
//     });

//     expect(chatList.children.chatUsers)
//       .to
//       .have
//       .lengthOf(2);
//   });
// });
