import axios from 'axios';
import { toWxLogin, toLogin } from '@/libs/util';
import store from '@/store';
import Toast from '@/components/toast';
import JsBridge from '@/libs/jsBridge';
const addErrorLog = () => {
  // const { statusText, status, request: { responseURL } } = errorInfo;
  // const info = {
  //   type: 'ajax',
  //   code: status,
  //   mes: statusText,
  //   url: responseURL
  // };
  // if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info);
};

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl;
    this.queue = {};
  }

  getInsideConfig() {
    const { user, app } = store.state;
    const { isNativeApp, params } = app.browserType;
    const config = {
      baseURL: this.baseUrl,
      headers: {
        authorization: user.token,
        isNativeApp: ~~isNativeApp,
        clientType: (params && params.plat) || 'h5',
        serverVersion: (params && params.appV) || '1.0.0'
      }
    };
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    // if (!Object.keys(this.queue).length) {}
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use((config) => {
      // 添加全局的loading...
      // if (!Object.keys(this.queue).length) {}
      this.queue[url] = true;
      return config;
    }, (error) => Promise.reject(error));
    // 响应拦截
    instance.interceptors.response.use((res) => {
      this.destroy(url);
      const { data, status: httpStatus } = res;
      let msg = '';
      if (data instanceof Blob) {
        return data;
      }
      if (httpStatus !== 200) {
        msg = '网络异常，请稍后再试！';
      }
      const { data: rawData, code: apiCode, message: apiMsg } = data;
      if ([408, 409, 444].indexOf(apiCode) !== -1) { // token过期登录流程
        const bType = store.state.app.browserType;
        const blackUrlPath = store.state.app.blackUrlPath;
        if (bType.isNativeApp) {
          JsBridge('callNativeLogin', 'callNativeLogin');
        } else {
          store.dispatch('handleLogOut');
          if (bType.isWx && blackUrlPath.indexOf(window.location.pathname) === -1) {
            toWxLogin();
          } else {
            toLogin();
          }
        }
        return Promise.reject();
      }
      if (res.config.isOri) {
        return data;
      }
      if (apiCode !== 200) {
        msg = apiMsg || '服务器异常，请稍后再试！';
      }
      if (msg) {
        Toast.info(msg);
        addErrorLog({
          statusText: msg,
          status: `httpStatus: ${httpStatus}, apiCode: ${apiCode}`,
          request: { responseURL: url }
        });
        return Promise.reject();
      }

      return rawData;
    }, (error) => {
      this.destroy(url);
      let errorInfo = error.response;
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error));
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        };
      }
      addErrorLog(errorInfo);
      return Promise.reject(error);
    });
  }

  request(options) {
    const instance = axios.create();
    const initConfig = this.getInsideConfig();
    const { headers, ...others } = initConfig;
    const { headers: optHeaders, ...optOther } = options;
    options = {
      ...others,
      ...optOther,
      headers: {
        ...headers,
        ...optHeaders
      }
    };
    this.interceptors(instance, options.url);
    return instance(options);
  }
}
export default HttpRequest;
