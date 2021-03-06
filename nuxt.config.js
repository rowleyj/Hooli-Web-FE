import colors from 'vuetify/es5/util/colors';

export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: false,

	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: '%s | Ride Safe',
		title: 'Hooli',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/icon.ico' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		{ src: '~/plugins/vuex-persist', ssr: false },
		{ src: '~/plugins/lodash', ssr: false },
		{ src: "~/plugins/vue-echarts.js", ssr: false },
		{ src: '~/plugins/alerts.js', ssr: false }
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
		'@nuxtjs/composition-api/module',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		// https://go.nuxtjs.dev/pwa
		'@nuxtjs/pwa',
		// https://go.nuxtjs.dev/content
		'@nuxt/content',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: 'http://localhost:8080'
	},

	router: {
		middleware: ['authenticated'],
	},

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en'
		}
	},

	// Content module configuration: https://go.nuxtjs.dev/config-content
	content: {},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			// dark: true,
			themes: {
				light: {
					primary: colors.grey.darken3,
					accent: "#4dffff",
					secondary: colors.amber.darken3,
					// primary: "#4dffff",
					// accent: colors.grey.darken3,
					// secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3
				}

			}
		}
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {

	}
};
