const path = require('path');
const config = require('./src/config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

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
    if (!isPro) return;
    // 修改html-webpack-plugin,注入到body
    config.plugin('html').tap((args) => {
      const ret = (args || []).map((item) => ({ ...item, inject: 'body' }));
      return ret;
    });
    // 分割代码
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        },
        vueBase: {
          test: (module) => /vue|vuex|vue-router/.test(module.context),
          chunks: 'initial',
          name: 'vueBase',
          priority: 10,
        }
      }
    });
    // gzip support
    config.plugin('compressGzip').use(CompressionPlugin, [{
      algorithm: 'gzip',
      test: /\.(js|css)$/, // 匹配文件名
      threshold: 10240, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 不删除源文件
      minRatio: 0.8 // 压缩比
    }]);
    // webpack打包分析
    config.plugin('bundleAnalyzer').use(BundleAnalyzerPlugin, []);
  },

  productionSourceMap: false,

  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isPro
  },

};
