<template>
	<v-dialog
		v-model="dialog"
		width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				small
				v-on="on"
				v-bind="attrs"
				class="mr-2"
				color="primary">
				<v-icon left>mdi-plus</v-icon>
				Add Activity
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="text-h5">
					Add New Activity
				</span>
				<v-spacer></v-spacer>
				<v-btn
					small
					icon
					@click="closeDialog">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider class="mt-2"></v-divider>
			<v-card-text>
				<v-text-field
					label="Title"></v-text-field>
				<v-textarea label="Description"></v-textarea>
				<v-file-input
					label="Ride File"
					prepend-icon="mdi-bicycle"
					hint="We use your data to calculate speed, calories burned, and show your route"></v-file-input>
				<v-file-input
					label="Video"
					prepend-icon="mdi-video"></v-file-input>
			</v-card-text>
			<submit-buttons
				submit-text="Create Activity"
				@submit="createActivity()"
				@close="closeDialog"
			/>
		</v-card>
	</v-dialog>
</template>

<script>
const { default: SubmitButtons }=require("~/components/forms/SubmitButtons.vue")

export default {
	components: { SubmitButtons },
	data(){
		return {
			dialog: false
		}
	},
	methods: {
		closeDialog(){
			this.dialog = false;
		},
		/**
		 * Create a users activity, upload files to server
		 */
		createActivity(){
			console.log('create activity')
		}
	},
	props: {
	}
}
</script>