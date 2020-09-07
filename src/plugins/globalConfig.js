const config = {
  install(Vue) {
    const vue = Vue;
    vue.prototype.$globalConfig = config;
  },
  RUN_MODE: process.env.VUE_APP_RUN_MODE
};

export default config;
