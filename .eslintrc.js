module.exports = {
  'env': {
    'es6': true,
    'mocha': true,
  },
  'extends': 'google',
  'globals': {
    '$': true,
    '$$': true,
    'browser': true,
    'expect': true,
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'mocha',
    'babel',
  ],
  'rules': {
    'no-invalid-this': 0,
    'babel/no-invalid-this': 0,
    'arrow-parents': [0, 'as-needed'],
    'require-jsdoc': 'off',
    'brace-style': [0, 'allman', { 'allowSingleLine': true }],
    'max-len': ['error', { 'code': 200 }],
    'object-curly-spacing': ['error', 'always'],
    'babel/semi': 1,
  },
};
