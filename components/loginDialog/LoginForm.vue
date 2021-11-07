<template>
	<v-container
		class="ma-0 pa-0">
		<v-card-text>
			<v-container>
				<v-row>
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
import SubmitButtons from '../forms/SubmitButtons.vue'
export default {
	components: { SubmitButtons },
	data(){
		return {
			form: {
				email: '',
				password: ''
			}
		}
	},
	methods:{
		async login(){
			const response = await this.$store.dispatch('user/login', this.form);
			if(response){
				this.$emit('close');
				this.$router.push('/dashboard');
			} else{
				alert('not logged in')
			}
		},
	}
}
</script>