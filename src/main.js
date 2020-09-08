import Vue from 'vue';
import '@/styles/stylu/base.styl';
import '@/styles/css/reset.css';
import { noZoomIn, addVHPro, batchImportGlobalCom } from '@/libs/util';
import '_p/ui';
import '_p/others';
import globalConfig from '_p/globalConfig';
import importDirective from '@/directive/index';
import App from './App.vue';
import router from './router';
import store from './store';

noZoomIn();
addVHPro();
batchImportGlobalCom();
importDirective(Vue);
Vue.use(globalConfig);
Vue.config.productionTip = false;

store.commit('setBrowserType');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
