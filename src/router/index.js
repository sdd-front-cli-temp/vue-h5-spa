import Vue from 'vue';
import VueRouter from 'vue-router';
import { setTitle } from '@/libs/util';
import LoadingBar from '_c/loadingBar';
import store from '@/store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/about1',
    name: 'About1',
    component: () => import(/* webpackChunkName: "about" */ '../views/About1.vue'),
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  const { token } = to.query;
  const bType = store.state.app.browserType;
  if (token && !bType.isWx) { // 有token的时候，查询用户信息
    next();
    // store
    //   .dispatch('getLoginUser', { token })
    //   .then(() => {
    //     next();
    //   }).catch(() => {
    //     next();
    //   });
  } else {
    next();
  }
});

router.afterEach((to) => {
  LoadingBar.finish();
  setTitle(to, router.app);
  window.scrollTo(0, 0);
});

export default router;
