module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: [
		"plugin:vue/essential",
		"airbnb-base"
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module"
	},
	plugins: [
		"vue"
	],
	rules: {
		quotes: 0,
		"import/no-unresolved": 0,
		"max-len": 0,
		"object-shorthand": 0,
		"comma-dangle": 0,
		"no-underscore-dangle": 0,
		"consistent-return": 0,
		"no-shadow": 0,
		"vars-on-top": 0,
		"arrow-parens": 0,
		"no-var": 0,
		"no-use-before-define": 0,
		"no-unused-expressions": 0,
		"func-names": 0,
		"no-param-reassign": 0,
		"no-plusplus": 0,
		"no-useless-escape": 0,
		"no-inner-declarations": 0,
		"block-scoped-var": 0,
		"no-redeclare": 0,
		"global-require": 0,
		"linebreak-style": 0,
		indent: ["error", "tab"],
		"no-tabs": 0, // ["error", { allowIndentationTabs: true }],
		"no-trailing-spaces": 1,

		// vue
		"vue/html-indent": ["error", "tab"],
		"vue/no-v-html": "error",
		"vue/require-default-prop": "error",
		// "vue/html-quotes": ["error", "double"],
		"vue/no-unused-vars": "error",
		"vue/max-attributes-per-line": ["error", {
			singleline: 1,
			multiline: {
				max: 1,
				allowFirstLine: false
			}
		}],
		"vue/name-property-casing": ["error", "PascalCase"],
		"vue/prop-name-casing": ["error", "camelCase"],
		"vue/v-bind-style": ["error", "shorthand"],
		"vue/v-on-style": ["error", "shorthand"],
		"vue/this-in-template": ["error", "never"],

		// note that we use alphabetical order since it is way easier to debug
		"vue/order-in-components": ["error", {
			order: [
				"computed",
				["components", "directives", "filters"],
				["delimiters", "comments"],
				"data",
				"el",
				"extends",
				"functional",
				"inheritAttrs",
				"LIFECYCLE_HOOKS",
				"methods",
				"mixins",
				"model",
				"name",
				"parent",
				["props", "propsData"],
				["template", "render"],
				"renderError",
				"watch",

			]
		}]
		// "vue/return-in-computed-property": 0
	}
};
