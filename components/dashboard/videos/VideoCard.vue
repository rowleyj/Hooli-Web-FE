<template>
	<v-container>
		<v-card
			class="mx-8 mb-8 mt-4 pb-4"
			hover
		>
			<v-toolbar
				flat
				color="primary"
				dark
				dense>
				<v-toolbar-title>
					{{video.title}}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn
					icon
					@click="$emit('delete-video', video._id)">
					<v-icon>mdi-delete</v-icon>
				</v-btn>
			</v-toolbar>

			<v-row
				justify="center"
				class="ma-2">
				<video
					height="200px"
					controls
				>
					<source
						:src="video.url"
						type="video/mp4">
					Your browser does not support the video tag. </video>
			</v-row>

		</v-card>
	</v-container>
</template>

<script>
export default {
	props: {
		video: {
			type: Object,
			default: () => ({
				title: '',
				_id: '',
				url: ''
			})
		}
	}
};
</script>

<style>

</style>
