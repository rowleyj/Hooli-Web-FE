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
				to="/">
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
			<v-btn
				color="primary"
				@click="loginDialog = true"
				v-if="!isLoggedIn"
			>
				Login
			</v-btn>
			<v-btn
				v-else
				to="/dashboard">
				Dashboard
			</v-btn>
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
		<login-dialog
			:dialog="loginDialog"
			@close="loginDialog = false"/>
	</v-app>
</template>

<script>
import LoginDialog from '~/components/loginDialog/LoginDialog.vue';
export default {
	computed:{
		/**
		 * Check if the user has an accessToken
		 */
		isLoggedIn(){
			return !!this.$store.getters['getAccessToken'];
		}
	},
	components: { LoginDialog },
	data () {
		return {
			title: 'Hooli',
			loginDialog: false
		}
	},
	methods: {

	}
}
</script>
