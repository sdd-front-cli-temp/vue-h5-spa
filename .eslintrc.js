module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-use-before-define': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-bitwise': 'off',
    'no-shadow': 'off',
    radix: 'off',
    'import/no-cycle': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'no-param-reassign': 'off',
    'no-unused-expressions': 'off',
    'import/extensions': 'off',
    'prefer-destructuring': 'off',
    'no-plusplus': 'off',
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-properties': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    'no-nested-ternary': 'off',
    'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }],
    'max-len': 'off',
    'no-undef': 'off',
    camelcase: 'off'
  },
};
