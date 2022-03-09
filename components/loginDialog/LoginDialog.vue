<template>
	<v-dialog
		:value="dialog"
		@click:outside="closeDialog"
		width="600">
		<v-card>
			<v-card-title>
				<span class="text-h5">
					{{isLoginView ? 'Login' : 'Register'}}
				</span>
				<v-spacer></v-spacer>
				<v-btn
					:color="isLoginView ? 'primary' : 'secondary'"
					small
					@click="toggleView">
					{{isLoginView ? 'Register' : 'Login'}}
				</v-btn>
			</v-card-title>
			<v-divider class="mt-2"></v-divider>
			<login-form
				v-if="isLoginView"
				@close="closeDialog">
			</login-form>
			<register-form
				v-else
				@change-view="toggleView"
				@close="closeDialog">
			</register-form>

		</v-card>
	</v-dialog>
</template>

<script>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

export default {
	computed: {
		isLoginView() {
			return this.view === 'login';
		}
	},
	components: { LoginForm, RegisterForm },
	data() {
		return {
			view: 'login'
		};
	},
	methods: {
		closeDialog() {
			this.$emit('close');
		},
		toggleView() {
			if (this.view === 'login') this.view = 'register';
			else this.view = 'login';
		}
	},
	props: {
		dialog: {
			default: false
		}
	}
};
</script>
