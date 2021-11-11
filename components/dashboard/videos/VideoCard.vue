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
					{{title}}
				</v-toolbar-title>
				<v-spacer></v-spacer>
			</v-toolbar>

			<v-row
				justify="center"
				class="ma-2">
				<video
					height="200px"
				>
					<source
						src="/test_vid.mp4"
						type="video/mp4">
					Your browser does not support the video tag. </video>
			</v-row>


		</v-card>
	</v-container>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null
		}
	}
}
</script>

<style>

</style>