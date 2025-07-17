// /* eslint no-unused-expressions: 0 */

// import { expect } from 'chai';
// import sinon from 'sinon';
// import { describe, beforeEach, it } from 'mocha';
// import esmock from 'esmock';
// import AuthService from './AuthService.ts';

// const mockFunctions = {
//   signin: sinon.fake(),
//   signup: sinon.fake(),
//   logout: sinon.fake(),
//   read: sinon.fake(),
//   set: sinon.fake(),
//   go: sinon.fake(),
//   closeAll: sinon.fake(),
// };

// let AuthService: typeof AuthService;

// describe('AuthService', async () => {
//   beforeEach(async () => {
//     AuthService = (await esmock('./AuthService', {
//       '../../api/AuthApi/AuthApi.ts': {
//         default: new class {
//           read = mockFunctions.read;

//           signin = mockFunctions.signin;

//           signup = mockFunctions.signup;

//           logout = mockFunctions.logout;
//         }(),
//       },
//       '../../utils/Store/Store.ts': {
//         default: new class {
//           set = mockFunctions.set;
//         }(),
//       },
//       '../../utils/Router/Router.ts': {
//         default: new class {
//           go = mockFunctions.go;
//         }(),
//       },
//       '../MessagesController.ts': {
//         default: new class {
//           closeAll = mockFunctions.closeAll;
//         }(),
//       },
//     })).default;
//   });

//   describe('.fetchUser()', () => {
//     it('should call read() method of api', async () => {
//       await AuthService.fetchUser();

//       expect(mockFunctions.read.called)
//         .to.be.true;
//     });

//     it('should set user data in store', async () => {
//       await AuthService.fetchUser();

//       expect(mockFunctions.set.lastCall.firstArg)
//         .to
//         .eq('user');
//     });
//   });

//   describe('.signin()', () => {
//     it('should redirect to /messenger', async () => {
//       await AuthService.signin({
//         login: 'kek',
//         password: 'kek',
//       });

//       expect(mockFunctions.go.lastCall.firstArg)
//         .to
//         .eq('/messenger');
//     });

//     it('should call signin() method of api', async () => {
//       await AuthService.signin({
//         login: 'kek',
//         password: 'kek',
//       });

//       expect(mockFunctions.signin.called)
//         .to.be.true;
//     });
//   });

//   describe('.signup()', () => {
//     it('should redirect to /messenger', async () => {
//       await AuthService.signup({
//         login: 'kek',
//         password: 'kek',
//         email: 'kek',
//         first_name: 'kek',
//         second_name: 'kek',
//         phone: 'kek',
//       });

//       expect(mockFunctions.go.lastCall.firstArg)
//         .to
//         .eq('/messenger');
//     });

//     it('should call signup() method of api', async () => {
//       await AuthService.signup({
//         login: 'kek',
//         password: 'kek',
//         email: 'kek',
//         first_name: 'kek',
//         second_name: 'kek',
//         phone: 'kek',
//       });

//       expect(mockFunctions.signup.called)
//         .to.be.true;
//     });
//   });

//   describe('.logout()', () => {
//     it('should call closeAll() method of MessagesController', () => {
//       AuthService.logout();

//       expect(mockFunctions.closeAll.called)
//         .to.be.true;
//     });

//     it('should call logout() method of api', () => {
//       AuthService.logout();

//       expect(mockFunctions.logout.called)
//         .to.be.true;
//     });

//     it('should redirect to /', () => {
//       AuthService.logout();

//       expect(mockFunctions.go.lastCall.firstArg)
//         .to
//         .eq('/');
//     });
//   });
// });
