import Vue from 'vue';
import {
  ScrollView, Popup, Icon, Dialog, Button
} from 'mand-mobile';
import Toast from '@/components/toast';
import CommonList from '@/components/commonList';

Vue.component(Icon.name, Icon);
Vue.component(ScrollView.name, ScrollView);
Vue.component('CommonList', CommonList);
Vue.component(Popup.name, Popup);
Vue.component(Button.name, Button);
Vue.prototype.$toast = Toast;
Vue.prototype.$dialog = Dialog;
