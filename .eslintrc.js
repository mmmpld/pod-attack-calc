module.exports = {
    rules: {
        'no-console': 'off',
        'vue/no-side-effects-in-computed-properties': 'warn',
        'radix': 'error',
    },
    "extends": ["plugin:vue/base"],
    "plugins": ["jest"],
};
