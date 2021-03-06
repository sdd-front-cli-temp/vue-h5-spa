import BrowserType from '@/libs/browserType';

export default {
  state: {
    browserType: {
      isNativeApp: false,
      isWx: false,
      isAndroid: false,
      isIos: true,
      params: {}
    },
    blackUrlPath: ['/lesson/exclusive', '/lesson/svip', '/lesson/all']
  },
  mutations: {
    setBrowserType(state) {
      const bt = BrowserType();
      if (!bt) return;
      const { shell, system, params } = bt;
      state.browserType = {
        ...state.browserType,
        isNativeApp: shell === 'captainApp',
        isWx: shell === 'wechat',
        isAndroid: system === 'android',
        isIos: system === 'ios',
        params
      };
    }
  }
};
