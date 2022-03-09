<template>
	<v-container class="ma-0 pa-0">
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
							v-model="form.name"
							label="Name"
							:rules="rules.name"
							required
						></v-text-field>
					</v-col>
					<v-col
						cols="12"
						md="6">
						<v-text-field
							v-model="form.height"
							label="Height"
							suffix="cm"
							:rules="rules.height"
							required>
						</v-text-field>
					</v-col>
					<v-col
						cols="12"
						md="6">
						<v-text-field
							v-model="form.weight"
							label="Weight"
							suffix="kg"
							:rules="rules.weight"
							required>
						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="form.email"
							label="Email"
							:rules="rules.email"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="form.password"
							label="Password"
							type="password"
							:rules="rules.password"
							required
						></v-text-field>
					</v-col>
				</v-row>
			</v-container>
		</v-card-text>
		<submit-buttons
			submit-text="Register"
			@submit="register()">
		</submit-buttons>

	</v-container>
</template>

<script>
import SubmitButtons from '../forms/SubmitButtons.vue';

export default {
	components: {
		SubmitButtons
	},
	data() {
		return {
			form: {
				name: '',
				height: null,
				weight: null,
				email: null,
				password: null
			},
			rules: {
				name: [
					(val) => !!val || 'This field is required'
				],
				height: [
					(val) => !!val || 'This field is required',
					(val) => !isNaN(val) || 'Height must be a number'
				],
				weight: [
					(val) => !!val || 'This field is required',
					(val) => !isNaN(val) || 'Weight must be a number'
				],
				email: [
					(val) => !!val || 'This field is required'
				],
				password: [
					(val) => !!val || 'This field is required'
				],
			},
		};
	},
	methods: {
		async register() {
			try {
				const { status } = await this.$axios.post('/users', this.form);
				if (status === 201) {
					this.$emit('change-view');
				} else {
					this.$alerts.setErrorSnackbar('create_account_failed');
				}
			} catch (error) {
				this.$alerts.setDefaultErrorSnackbar();
			}
		}
	}
};
</script>
