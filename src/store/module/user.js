// import {
//   getUserDetail
// } from '@/api/user';
// import { loginByPwd, loginBySms } from '@/api/login';
// import { loginByWxUnId } from '@/api/wx';
// import {
//   setToken, getToken, getUserInfo, setUserInfo
// } from '@/libs/util';
//
// export default {
//   state: {
//     userInfo: getUserInfo(),
//     token: getToken(),
//     hasGetInfo: false
//   },
//   mutations: {
//     setAccess(state, access) {
//       state.access = access;
//     },
//     setToken(state, token) {
//       state.token = token;
//       setToken(token);
//     },
//     setUserInfo(state, userInfo) {
//       state.userInfo = userInfo;
//       setUserInfo(userInfo);
//     },
//     setHasGetInfo(state, status) {
//       state.hasGetInfo = status;
//     }
//   },
//   getters: {
//     userInfo: (state) => state.userInfo
//   },
//   actions: {
//     getLoginUser({ commit }, { token }) {
//       return new Promise((resolve, reject) => {
//         getUserDetail(token).then((res) => {
//           commit('setToken', token);
//           commit('setUserInfo', res);
//           resolve();
//         }).catch((err) => {
//           reject(err);
//         });
//       });
//     },
//     loginByPwd({ commit }, data) {
//       return new Promise((resolve, reject) => {
//         loginByPwd(data).then((res) => {
//           const { access_token, ...other } = res;
//           commit('setToken', access_token);
//           commit('setUserInfo', other);
//           resolve();
//         }).catch((err) => {
//           reject(err);
//         });
//       });
//     },
//     loginBySms({ commit }, data) {
//       return new Promise((resolve, reject) => {
//         loginBySms(data).then((res) => {
//           const { access_token, ...other } = res;
//           commit('setToken', access_token);
//           commit('setUserInfo', other);
//           resolve();
//         }).catch((err) => {
//           reject(err);
//         });
//       });
//     },
//     loginByUnionId({ commit }, { weChatUnionId }) {
//       return new Promise((resolve, reject) => {
//         loginByWxUnId({ weChatUnionId }).then((res) => {
//           const { access_token, ...other } = res;
//           const phone = other.mobileNo;
//           commit('setToken', phone ? access_token : '');
//           commit('setUserInfo', other);
//           resolve(phone);
//         }).catch((err) => {
//           reject(err);
//         });
//       });
//     },
//     // 退出登录
//     handleLogOut({ commit }) {
//       return new Promise((resolve) => {
//         // logout(state.token).then(() => {
//         //   commit('setToken', '');
//         //   commit('setAccess', []);
//         //   resolve();
//         // }).catch((err) => {
//         //   reject(err);
//         // });
//         // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
//         commit('setToken', '');
//         commit('setUserInfo', null);
//         resolve();
//       });
//     }
//   }
// };
