import Vue from 'vue';
import ToastOptions from './toast';

/**
 * Toast factory
 *
 * @param {Object} props
 * @return {Toast}
 */
const Toast = function ({
  content = '',
  icon = '',
  iconSvg = false,
  duration = 3000,
  position = 'center',
  hasMask = false,
  parentNode = document.body
}) {
  // eslint-disable-next-line no-underscore-dangle
  let vm = Toast._instance;

  if (!vm) {
    const ToastConstructor = Vue.extend(ToastOptions);
    // eslint-disable-next-line no-underscore-dangle,no-multi-assign
    vm = Toast._instance = new ToastConstructor({
      propsData: {
        content,
        icon,
        iconSvg,
        duration,
        position,
        hasMask
      }
    }).$mount();
  }

  if (!vm.$el.parentNode) {
    parentNode.appendChild(vm.$el);
  }

  vm.content = content;
  vm.icon = icon;
  vm.iconSvg = iconSvg;
  vm.duration = duration;
  vm.position = position;
  vm.hasMask = hasMask;
  // vm.visible = true
  // vm.fire()
  vm.show();

  return vm;
};


// There is only one toast singleton
// eslint-disable-next-line no-underscore-dangle,no-multi-assign
Toast._instance = null;

/**
 * Hide toast
 */
Toast.hide = () => {
  const ToastConstructor = Vue.extend(ToastOptions);

  // eslint-disable-next-line no-underscore-dangle,no-multi-assign
  if (Toast._instance instanceof ToastConstructor && Toast._instance.visible) {
    // eslint-disable-next-line no-underscore-dangle,no-multi-assign
    Toast._instance.hide();
  }
};

/**
 * Show info toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.info = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => Toast({
  icon: '',
  content,
  duration,
  hasMask,
  parentNode
});

/**
 * Show succeed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.succeed = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => Toast({
  icon: 'icon-chenggongx',
  content,
  duration,
  hasMask,
  parentNode
});

/**
 * Show failed toast
 * @param {string} content
 * @param {number=} [duration=3000]
 * @param {boolean=} [hasMask=true]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */

Toast.failed = (content = '', duration = 3000, hasMask = false, parentNode = document.body) => Toast({
  icon: 'icon-guanbi-haibaox',
  content,
  duration,
  hasMask,
  parentNode
});

/**
 * Show loading toast
 * @param {string} content
 * @param {number=} [duration=0]
 * @param {boolean=} [hasMask=false]
 * @param {node=} [parentNode=document.body]
 * @returns {Toast}
 */
Toast.loading = (content = '', duration = 0, hasMask = true, parentNode = document.body) => Toast({
  icon: 'spinner',
  iconSvg: true,
  content,
  duration,
  hasMask,
  parentNode
});

Toast.component = ToastOptions;

export default Toast;
