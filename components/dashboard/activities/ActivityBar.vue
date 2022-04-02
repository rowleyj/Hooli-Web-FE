<template>
	<v-toolbar
		class="mb-4"
		color="accent"
		height="54">
		<v-row
			align="center"
			no-gutters>
			<v-col
				cols="10"
				md="4">
				<v-text-field
					label="Search activities..."
					hide-details
					append-icon="mdi-magnify"
					@click:append="search()"
				></v-text-field>
			</v-col>

			<v-spacer></v-spacer>

			<add-activity-dialog />
		</v-row>
	</v-toolbar>
</template>

<script>
import AddActivityDialog from './AddActivityDialog.vue';

export default {
	components: { AddActivityDialog },
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
