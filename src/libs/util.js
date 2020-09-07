import Vue from 'vue';
import Cookies from 'js-cookie';
import qs from 'qs';
import config from '@/config';
import store from 'store';

const { cookieExpires, title } = config;

// 解决safari会把工具栏高度算进100vh的问题
export const addVHPro = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
};

export const noZoomIn = () => {
  // 解决safari自带放大功能：阻止双指放大
  document.addEventListener('touchmove', (event) => {
    if (event.scale !== 1) { event.preventDefault(); }
  }, { passive: false });
};

export function importAll(r) {
  const __modules = {};
  r.keys().forEach((key) => {
    const m = r(key).default;
    const n = m.name;
    __modules[n] = m;
  });
  return __modules;
}

// 导入components下所有的组件
export function batchImportGlobalCom() {
  const componentsContext = require.context('../components', true, /.vue$/);
  componentsContext.keys().forEach((component) => {
    // 获取文件中的 default 模块
    const componentConfig = componentsContext(component).default;
    Vue.component(componentConfig.name, componentConfig);
  });
}

export const getQsData = (obj) => qs.stringify(obj);

export const TOKEN_KEY = 'token';
export const USERINFO_KEY = 'userInfo';

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 });
};

export const setUserInfo = (userInfo) => {
  store.set(USERINFO_KEY, userInfo);
};

export const getUserInfo = () => store.get(USERINFO_KEY);

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  return '';
};

export const getRouteTitleHandled = (route) => {
  const router = { ...route };
  const meta = { ...route.meta };
  let title = '';
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true;
      title = meta.title(router);
    } else title = meta.title;
  }
  meta.title = title;
  router.meta = meta;
  return router;
};

export const showTitle = (item) => {
  let { title } = item.meta;
  if (!title) return;
  title = (item.meta && item.meta.title) || item.name;
  return title;
};

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const setTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem);
  const pageTitle = showTitle(handledRoute, vm);
  window.document.title = pageTitle || title;
};

export const loadJS = (url, callback) => {
  const script = document.createElement('script');
  const fn = callback || function () {};
  script.type = 'text/javascript';
  // IE
  if (script.readyState) {
    script.onreadystatechange = () => {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    // 其他浏览器
    script.onload = () => {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
};

export const toWxLogin = () => {
  const { pathname, search } = window.location;
  const referrer = `${pathname}${search}`;
  console.log('---wxLogin refer---', referrer);
  window.location.replace(`/login/wx?referrer=${encodeURIComponent(encodeURIComponent(referrer))}`);
};

export const toLogin = () => {
  const { pathname, search } = window.location;
  const referrer = `${pathname}${search}`;
  console.log('---toLogin refer---', referrer);
  window.location.replace(`/login?referrer=${encodeURIComponent(encodeURIComponent(referrer))}`);
};

export const genObjByMatch = (arr = [], obj = {}, filterEmpty = false) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    const isExt = arr.findIndex((v) => v === key) !== -1;
    if (isExt) {
      if (filterEmpty) {
        if (obj[key]) {
          newObj[key] = obj[key];
        }
      } else {
        newObj[key] = obj[key];
      }
    }
  });
  return newObj;
};

export const wrapImg = (url) => {
  if (!url) return '';
  if (['http', 'https'].find((item) => url.indexOf(item) !== -1)) {
    return url;
  }
  return `https://imgs.hellokid.com/${url}`;
};

export const toFixedByNum = (v, n = 1) => v.toFixed(n);
// 微信中时间格式必须是yyyy/mm/hh
export const wxTimeHandler = (time) => (time && time.replace(/-/g, '/')) || '';

/**
 *  计算思路
 *  时间差 = 期限时间 - 当前时间
 *  天数 = 时间差 / 一天的时间（60秒 x 60分钟 x 24小时） 注意：（取整，小数部分给 小时 来计算）
 *  小时 = 时间差 减去 天数的时间，剩下的时间除以 小时（60秒 x 60分）  注意：（取整，小数部分给 分钟 来计算）
 *  分钟 = 时间差 减去 天数加小时的时间， 剩下的时间除以 分钟 (60秒)
 */
export const filterDeadline = (time) => {
  const deadlineDate = new Date(wxTimeHandler(time)).getTime();
  const newDate = Date.now();
  const getTime = parseInt((deadlineDate - newDate) / 1000);
  let [d, h, m, s] = [0, 0, 0, 0];
  // eslint-disable-next-line no-return-assign
  const checkTime = (v) => (v < 10 ? `0${v}` : `${v}`);
  if (getTime > 0) {
    d = parseInt(getTime / 3600 / 24); //  天数
    h = parseInt((getTime - (d * 3600 * 24)) / 3600); //  小时
    m = parseInt((getTime - ((d * 3600 * 24) + h * 3600)) / 60); //  分钟
    s = parseInt((getTime - ((d * 3600 * 24) + h * 3600)) % 60); // 秒
  }
  return {
    leftTime: getTime,
    d: checkTime(d),
    h: checkTime(h),
    m: checkTime(m),
    s: checkTime(s)
  };
};
