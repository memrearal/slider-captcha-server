module.exports = {
  extends: 'airbnb',
  globals: {
    fetch: false,
    test: false,
    expect: false,
  },
  rules: {
    'no-confusing-arrow': 'off',
    'implicit-arrow-linebreak': 'off',
    indent: 'off',
    'react/jsx-filename-extension': 'off',
    'import/no-unresolved': 'off',
    'operator-linebreak': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'object-curly-spacing': 'off',
    'object-curly-newline': 'off',
    'newline-per-chained-call': 'off',
    'arrow-body-style': 'off',
    'max-len': 'off',
    'import/extensions': 'off',
  },
  ignorePatterns: ['lib/**'],
};