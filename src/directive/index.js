import directive from './directives';

const importDirective = (Vue) => {
  Vue.directive('clipboard', directive.clipboard);
};

export default importDirective;
