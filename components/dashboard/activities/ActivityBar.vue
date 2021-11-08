<template>
	<v-toolbar
		class="mb-4"
		color="accent"
		dark
		dense>
		<v-row align="center">
			<v-col cols="4">
				<v-text-field
					label="Search activities..."
					hide-details
					append-icon="mdi-magnify"
					@click:append="search()"
				></v-text-field>
			</v-col>

			<v-spacer></v-spacer>

			<v-btn
				small
				class="mr-2"
				color="primary">
				<v-icon left>mdi-plus</v-icon>
				Add Activity</v-btn>
		</v-row>
	</v-toolbar>
</template>

<script>
export default {
	methods: {
		/**
		 * Search and filter the users activities
		 */
		search(){

		}
	}
}
</script>

<style>

</style>