<template>
	<v-container style="height: 95vh;">
		<v-row class="my-2">
			<v-card
				width="100%"
				flat
			>
				<v-row justify="center">
					<v-col
						cols="4"
						class="pa-2">
						<activity-calendar
							@update-range="setActivities"
						/>

					</v-col>
					<v-col cols="7">
						<month-aggregate-stats
							:weeks="weeks"
							:month="$_.get(start, 'month')"
							:activityList="activities"
						/>
					</v-col>
				</v-row>
			</v-card>
		</v-row>
		<v-row class="my-4 mx-4 pt-4">
			<v-card width="100%">
				other stats
			</v-card>
		</v-row>
	</v-container>
</template>

<script>
import ActivityCalendar from './ActivityCalendar.vue';
import MonthAggregateStats from './MonthAggregateStats.vue';

/** Keeps epoch times to define weeks */
class Week {
	constructor(startTime, endTime) {
		this.startTime = startTime;
		this.endTime = endTime;
	}
}

export default {
	components: { ActivityCalendar, MonthAggregateStats },
	data() {
		return {
			activities: [],
			start: null,
			end: null,
			weeks: []
		};
	},
	methods: {
		setActivities({ activityList, start, end }) {
			// Have to loop over and push so Vue catchs the changes
			this.activities = [];
			activityList.forEach(element => {
				this.activities.push(element);
			});

			this.start = start;
			this.end = end;
			this.setWeeks();
		},
		dateStringToEpoch(date) {
			return new Date(date).valueOf();
		},
		addDaysToDate(date, days) {
			const dt = new Date(date);
			return dt.setDate(dt.getDate() + days);
		},
		setWeeks() {
			this.weeks = [];

			let { day } = this.start;

			// do first week
			const daysTilEndOfWeek = 7 - this.start.weekday; // 0th weekday is Monday
			day += this.start.day;
			let date = this.addDaysToDate(this.start.date, daysTilEndOfWeek);

			this.weeks.push(new Week(this.dateStringToEpoch(this.start.date), this.dateStringToEpoch(date)));

			let runs = 0;
			while (day + 7 < this.end.day && runs < 5) {
				const startOfWeek = date;
				const endOfWeek = this.addDaysToDate(date, 7);
				this.weeks.push(new Week(this.dateStringToEpoch(startOfWeek), this.dateStringToEpoch(endOfWeek)));
				day += 7;
				date = endOfWeek;
				runs++;
			}

			// add last week
			this.weeks.push(new Week(this.dateStringToEpoch(date), this.dateStringToEpoch(this.end.date)));
		}
	}
};
</script>

<style>

</style>
