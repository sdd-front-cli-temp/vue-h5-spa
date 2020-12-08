/* eslint-disable */
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, () =>

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  // eslint-disable-next-line implicit-arrow-linebreak
  ({
    title: '',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description api请求基础路径
     */
    baseUrl: {
      dev: ''
    },
    ossConfig: {
      publicPath: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      preFlag: ''
    }
  })));
