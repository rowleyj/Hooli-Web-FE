<template>
	<v-container
		class="ma-0 pa-0">
		<v-card-text>
			<v-container>
				<v-row justify="center">
					<v-col cols="12">
						<v-text-field
							v-model="form.email"
							label="Email"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="form.password"
							label="Password"
							type="password"
							required
						></v-text-field>
					</v-col>
					<v-alert
						v-if="failedLogin"
						dense
						icon="mdi-alert-circle"
						dark
						shaped
						color="error">
						Wrong email/password/. Please try again!
					</v-alert>

				</v-row>
			</v-container>
		</v-card-text>
		<submit-buttons
			submit-text="Login"
			@submit="login()"
			@close="$emit('close')"
		>
		</submit-buttons>
	</v-container>
</template>

<script>
import SubmitButtons from '../forms/SubmitButtons.vue';

export default {
	components: { SubmitButtons },
	data() {
		return {
			form: {
				email: '',
				password: ''
			},
			failedLogin: false
		};
	},
	methods: {
		async login() {
			try {
				this.failedLogin = false;
				const response = await this.$store.dispatch('user/login', this.form);

				if (response) {
					this.$emit('close');
					this.$router.push('/dashboard');
				} else {
					this.$alerts.setDefaultErrorSnackbar();
				}
			} catch (error) {
				if (error.response.status === 401) {
					this.failedLogin = true;
				} else {
					this.$alerts.setDefaultErrorSnackbar();
				}
			}
		},
	}
};
</script>
