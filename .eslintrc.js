module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'next/core-web-vitals', 'prettier'],
    rules: {
        '@next/next/no-img-element': 'off',
        'no-console': 'warn',
        'react/no-unused-prop-types': 'error',
        'react/prop-types': 'error',
    },
}
