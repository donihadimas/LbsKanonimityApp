module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        'no-inline-styles': false,
        noImplicitAny: false,
      },
    ],
    'react-native/no-inline-styles': 0,
    'no-unused-vars': 'off',
  },
};
