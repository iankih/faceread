module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true, 
    node: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { 
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'destructuredArrayIgnorePattern': '^_'
      }
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-console': 'off', // 개발 환경에서는 console 허용
    'no-undef': 'off', // TypeScript가 처리
    'no-prototype-builtins': 'off',
    'react-hooks/exhaustive-deps': 'warn'
  },
} 