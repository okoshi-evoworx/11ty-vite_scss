module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
  ],
  rules: {
    'no-descending-specificity': null,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'function-name-case': null,
    'keyframes-name-pattern': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'theme'],
      },
    ],
    'scss/load-partial-extension': null,
    'scss/at-mixin-pattern': null,
    'scss/at-function-pattern': null,
  },
}
