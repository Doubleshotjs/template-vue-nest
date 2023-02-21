process.env.ESLINT_TSCONFIG = 'tsconfig.json';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
  },
  extends: [
    '@antfu',
  ],
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
        ecmaVersion: 'latest',
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        'no-undef': 'off',
        'import/first': 'off',
      },
    },
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsx: 'preserve',
    emitDecoratorMetadata: true,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'quote-props': ['error', 'as-needed'],
    'no-console': 'off',
    semi: 'off',
    '@typescript-eslint/semi': ['warn', 'always'],
    curly: ['error', 'all'],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],
    '@typescript-eslint/member-delimiter-style': ['warn', {
      multiline: { delimiter: 'semi', requireLast: true },
      singleline: { delimiter: 'semi', requireLast: false },
      multilineDetection: 'brackets',
    }],
    'import/order': ['warn', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
      pathGroups: [
        {
          pattern: '@/**',
          group: 'internal',
        },
      ],
    }],

    // 关闭下面过于严格的验证
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off',
    // 'no-debugger': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off', // setup()
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      // 未使用变量约束
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: false,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // any
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/await-thenable': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/unbound-method': 'off',
  },
};
