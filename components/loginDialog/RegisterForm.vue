<template>
	<v-container class="ma-0 pa-0">
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
							label="Name"
							:rules="rules.name"
							required
						></v-text-field>
					</v-col>
					<v-col
						cols="12"
						md="6">
						<v-text-field
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
							label="Weight"
							suffix="kg"
							:rules="rules.weight"
							required>
						</v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
							label="Email"
							:rules="rules.email"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
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
import SubmitButtons from '../forms/SubmitButtons.vue'
export default {
	components:{
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
			rules:{
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
		}
	},
	methods: {
		async register(){
			console.log('register!')
			let {data, status} = await this.$axios.post('/users', this.form);
			console.log(data, status);
		}
	}
}
</script>