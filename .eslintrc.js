module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parserOptions": {
        "ecmaVersion": 9,
        "sourceType": "module"
    },
    "extends": ["plugin:vue/base"],
    plugins: [
        'vue'
    ],
    "rules": {
        "indent": [
            "error",
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
