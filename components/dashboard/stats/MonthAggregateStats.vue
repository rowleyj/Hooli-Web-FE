<template>
	<v-card
		rounded
		height="100%">
		<v-row
			no-gutters
			class="pb-3">
			<v-toolbar
				color="primary"
				rounded
				dark
				dense
				flat>
				<v-toolbar-title>
					Stats for {{monthNames[month-1]}}
				</v-toolbar-title>
			</v-toolbar>
		</v-row>
		<v-row
			no-gutters
			v-if="weeks && weeks.length && showDistancesByWeek">
			<v-col
				md="6"
				cols="12"
				class="text-center">
				<vue-bar-graph
					:points="distancesByWeek"
					:width="450"
					:height="200"
					show-x-axis
					:custom-labels="weekStrings"
					use-custom-labels
					show-values
				/>
				<span>Distances</span>
			</v-col>
			<v-col
				md="6"
				cols="12"
				class="text-center">
				<vue-bar-graph
					:points="closePassesByWeek"
					:width="450"
					:height="200"
					show-x-axis
					:custom-labels="weekStrings"
					use-custom-labels
					show-values
				/>
				<div>Close Passes</div>
			</v-col>
			<v-col
				md="6"
				cols="12"
				class="text-center">
				<vue-bar-graph
					:points="caloriesByWeek"
					:width="450"
					:height="200"
					show-x-axis
					:custom-labels="weekStrings"
					use-custom-labels
					show-values
				/>
				<div>Calories</div>
			</v-col>
			<v-col
				md="6"
				cols="12"
				class="text-center">
				<vue-bar-graph
					:points="movementTimeByWeek"
					:width="450"
					:height="200"
					show-x-axis
					:custom-labels="weekStrings"
					use-custom-labels
					show-values
				/>
				<div>Movement Time (minutes)</div>
			</v-col>
		</v-row>
		<v-row
			no-gutters
			v-else>
			No activities...
		</v-row>
	</v-card>
</template>

<script>
import VueBarGraph from 'vue-bar-graph';

export default {
	computed: {
		activityByWeek() {
			if (this.weeks && this.activityList) {
				// fill with zeros
				const activities = this.weeks.map(() => []);

				this.activityList.forEach(activity => {
					const { createdAt } = activity;
					const createdTime = this.dateStringToEpoch(createdAt);
					this.weeks.forEach(({ startTime, endTime }, idx) => {
						if (createdTime > startTime && createdTime < endTime) {
							activities[idx].push(activity);
						}
					});
				});

				return activities;
			}
			return [];
		},
		distancesByWeek() {
			if (this.activityByWeek) {
				return this.activityByWeek.map(listOfActivities => (listOfActivities.reduce((acc, val) => acc + val.stats.distance, 0) / 1000).toFixed(2));
			}
			return [];
		},
		showDistancesByWeek() {
			let flag = false;
			if (this.distancesByWeek && this.distancesByWeek.length) {
				this.distancesByWeek.forEach(distance => {
					if (Number(distance) > 0) flag = true;
				});
			}
			return flag;
		},
		closePassesByWeek() {
			if (this.activityByWeek) {
				return this.activityByWeek.map(listOfActivities => (listOfActivities.reduce((acc, val) => acc + val.closePasses.length, 0)));
			}
			return [];
		},
		caloriesByWeek() {
			if (this.activityByWeek) {
				return this.activityByWeek.map(listOfActivities => (listOfActivities.reduce((acc, val) => acc + Number(val.stats.caloriesBurned), 0).toFixed(2)));
			}
			return [];
		},
		movementTimeByWeek() {
			if (this.activityByWeek) {
				return this.activityByWeek.map(listOfActivities => (listOfActivities.reduce((acc, val) => acc + Number(val.stats.movementTimeMs), 0) / 60000).toFixed(2));
			}
			return [];
		},
		weekStrings() {
			if (this.weeks) {
				return this.weeks.map(({ startTime, endTime }) => {
					const startDate = this.addDaysToDate(new Date(startTime), 1);
					return `${new Date(startDate).toUTCString().slice(5, 11)} - ${new Date(endTime).toUTCString().slice(5, 11)}`;
				});
			}
			return [];
		}
	},
	components: {
		VueBarGraph
	},
	data() {
		return {
			monthNames: [
				"January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			],
		};
	},
	methods: {
		dateStringToEpoch(date) {
			return new Date(date).valueOf();
		},
		addDaysToDate(date, days) {
			const dt = new Date(date);
			return dt.setDate(dt.getDate() + days);
		},
	},
	props: {
		activityList: {
			type: Array,
			default: () => []
		},
		month: {
			type: Number,
			default: 0
		},
		weeks: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style>

</style>
