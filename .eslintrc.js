module.exports = {
    "root": true,
    env: {
        "node": true,
        "jest": true,
        es2022: true,
    },
    "extends": [
        "plugin:vue/base",
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    rules: {
        'no-console': 'off',
        'vue/no-side-effects-in-computed-properties': 'warn',
        'radix': 'error',
    },
    "overrides": [
        {
            "files": [
                "**/__tests__/*.{j,t}s?(x)",
                "**/tests/unit/**/*.spec.{j,t}s?(x)"
            ],
            "env": {
                "jest": true
            }
        }
    ]
}
