module.exports = {
  presets: [
    ['@vue/app', {
      polyfills: [
        'es.promise',
        'es.symbol'
      ]
    }]
  ],
  plugins: [
    ['import', {
      libraryName: 'mand-mobile',
      libraryDirectory: 'lib'
    }]
  ]
};
