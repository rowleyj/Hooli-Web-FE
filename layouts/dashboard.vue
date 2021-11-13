<template>
	<v-app>
		<v-app-bar
			fixed
			app
		>
			<v-btn
				fab
				class="mx-2"
				x-small
				to="/dashboard">
				<v-img
					src="/icon.png"
					style="border-radius: 50%"
					max-width="40"
					max-height="40"></v-img>
			</v-btn>
			<v-toolbar-title v-text="title" />
			<v-spacer />
			<v-btn
				color="primary"
				outlined
				class="mx-1"
			>
				Purchase
			</v-btn>
			<nav-menu> </nav-menu>
		</v-app-bar>
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
		<v-footer
			absolute
			app
		>
			<span>&copy; {{ new Date().getFullYear() }}</span>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	computed:{
		/**
		 * Check if the user has an accessToken
		 */
		isLoggedIn(){
			return !!this.$store.getters['getAccessToken'];
		}
	},
	components: {
		NavMenu
	},
	data () {
		return {
			title: 'Hooli',
			loginDialog: false
		}
	},
	mounted(){
		if(!this.isLoggedIn){
			console.log('redirect');
			// TODO: not reliable... need to find different soln
			// this.$router.push('/')
		}
	},
	methods: {

	}
}
</script>
