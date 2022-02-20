<template>
	<v-container class="mt-0 pa-0">
		<activity-bar />
		<v-row
			justify="space-between"
			class="px-2"
		>
			<v-col
				cols="12"
				md="4"
				v-for="ride in rides"
				:key="ride.id">
				<activity-card
					:ride="ride"> </activity-card>
			</v-col>

		</v-row>
	</v-container>
</template>

<script>
import ActivityBar from './ActivityBar.vue';
import ActivityCard from './ActivityCard.vue';

export default {
	computed: {
		rides() {
			return this.$store.getters['activities/getRides'];
		}
	},
	components: { ActivityCard, ActivityBar }
};
</script>
