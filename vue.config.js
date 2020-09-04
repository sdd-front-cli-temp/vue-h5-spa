const path = require('path');
const config = require('./src/config');

const resolve = (dir) => path.join(__dirname, dir);
const isPro = process.env.NODE_ENV === 'production';
const runMode = process.env.RUN_MODE || 'dev';
const { publicPath, preFlag } = config.ossConfig;

// 注入css变量
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/styles/stylu/index.styl')
      ],
    });
}

function transpileDependencies() {
  if (!isPro) return [];
  return [
    /[/\\]node_modules[/\\]swiper|dom7|mand-mobile|vue-lazyload|vue-echarts|resize-detector[/\\]/
  ];
}

// const BASE_URL = isPro ? `${publicPath}${preFlag}${runMode}` : '/';

module.exports = {
  publicPath: '/',

  devServer: {
    inline: true,
    port: 3000,
    disableHostCheck: true,
    proxy: {
      '/req': {
        target: config.baseUrl.dev,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/req': ''
        }
      }
    }
  },

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,

  configureWebpack: {
    plugins: []
  },
  transpileDependencies: transpileDependencies(),

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
      .set('_p', resolve('src/plugins'));
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) => addStyleResource(config.module.rule('stylus').oneOf(type)));

    config.plugin('html').tap((args) => {
      const ret = (args || []).map((item) => ({ ...item, inject: 'body' }));
      return ret;
    });
  },

  productionSourceMap: false,

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isPro
  },

};
