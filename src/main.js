import Vue from 'vue';
import '@/styles/stylu/base.styl';
import { noZoomIn, addVHPro, batchImportGlobalCom } from '@/libs/util';
import '_p/ui';
import App from './App.vue';
import router from './router';
import store from './store';

noZoomIn();
addVHPro();
batchImportGlobalCom();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
