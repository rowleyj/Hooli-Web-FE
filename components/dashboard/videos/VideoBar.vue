<template>
	<v-toolbar
		class="mb-4"
		color="accent"
		height="54">
		<v-row align="center">
			<v-col cols="4">
				<v-text-field
					label="Search videos..."
					hide-details
					append-icon="mdi-magnify"
					@click:append="search()"
				></v-text-field>
			</v-col>

			<v-spacer></v-spacer>
			<upload-video-dialog />
		</v-row>
	</v-toolbar>
</template>

<script>
import UploadVideoDialog from './UploadVideoDialog.vue';

export default {
	components: {
		UploadVideoDialog

	},
	methods: {
		/**
		 * Search and filter the users activities
		 */
		search() {

		}
	}
};
</script>

<style>

</style>
