module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-import': {}, // 主要用来处理@import引入路径问题。
    'postcss-url': {}, // 用来处理文件，比如图片文件、字体文件等引用路径的处理。
    'postcss-aspect-ratio-mini': {}, // 处理元素容器宽高比。
    'postcss-write-svg': { // 主要使用的是border-image和background来做1px的相关处理。
      utf8: false
    },
    'postcss-px-to-viewport': { // 用来把px单位转换为vw、vh、vmin或者vmax这样的视窗单位。
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      landscape: true,
      landscapeUnit: 'vw',
      landscapeWidth: 667
    },
    'postcss-viewport-units': {
      filterRule: rule => {
        return !rule.selector.includes('::after')
          && !rule.selector.includes('::before')
          && !rule.selector.includes(':after')
          && !rule.selector.includes(':before')
      }
    }
  }
  // preset: {
  //   // 更改postcss-preset-env 设置
  //   // 主要用来处理浏览器前缀问题。
  //   autoprefixer: {}
  // }
}
