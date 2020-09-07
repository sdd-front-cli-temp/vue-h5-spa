import BrowserType from '@/libs/browserType';

const objKey = 'jsBridge';

const jsBridge = function (methodKey, strParams = ' ') {
  try {
    let ret = '';
    const params = `${strParams || ''}`;
    const { system } = BrowserType();
    const isIos = system === 'ios';
    if (isIos) {
      window[objKey] && window[objKey][methodKey](params);
      window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers[methodKey].postMessage(params);
    } else {
      ret = window[objKey][methodKey](params);
    }
    return ret;
  } catch (e) {
    return '';
  }
};

export default jsBridge;
