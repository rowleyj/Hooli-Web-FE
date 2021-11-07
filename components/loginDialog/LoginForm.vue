<template>
	<v-container
		class="ma-0 pa-0">
		<v-card-text>
			<v-container>
				<v-row>
					<v-col cols="12">
						<v-text-field
							label="Email"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12">
						<v-text-field
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
		>
		</submit-buttons>
	</v-container>
</template>

<script>
import SubmitButtons from '../forms/SubmitButtons.vue'
export default {
	components: { SubmitButtons },
	methods:{
		login(){
			// perform login logic
			this.$router.push('/dashboard')
		},
	}
}
</script>