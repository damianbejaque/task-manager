module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'eslint-config-prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'eslint-plugin-prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "prettier/prettier": [
      "error",
      {
        "semi": false,
        "singleQuote": true,
        "printWidth": 80,
        "trailingComma": "all",
        "arrowParens": "avoid",
        "endOfLine": "auto",
        "bracketSpacing": true,
        "jsxBracketSameLine": false
      }
    ]
  },
}
