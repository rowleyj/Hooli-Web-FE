<template>
	<v-container>
		<v-toolbar
			flat
		>
			<v-btn
				outlined
				class="mr-4"
				color="grey darken-2"
				@click="setToday"
			>
				Today
			</v-btn>
			<v-btn
				fab
				text
				small
				color="grey darken-2"
				@click="prev"
			>
				<v-icon small>
					mdi-chevron-left
				</v-icon>
			</v-btn>
			<v-btn
				fab
				text
				small
				color="grey darken-2"
				@click="next"
			>
				<v-icon small>
					mdi-chevron-right
				</v-icon>
			</v-btn>
			<v-toolbar-title v-if="$refs.calendar">
				{{ $refs.calendar.title }}
			</v-toolbar-title>
			<v-spacer></v-spacer>
		</v-toolbar>
		<v-sheet
			color="primary"
			class="pa-1"
			height="350">
			<v-calendar
				ref="calendar"
				v-model="focus"
				color="primary"
				type="month"
				:events="activities"
				@change="updateRange"></v-calendar>
		</v-sheet>
	</v-container>

</template>

<script>
class Event {
	constructor(name, start, end, color, timed) {
		this.name = name;
		this.start = start;
		this.end = end;
		this.color = color;
		this.timed = timed;
	}
}

export default {
	computed: {
		activityList() {
			return this.$store.getters['activities/getRides'];
		}
	},
	data() {
		return {
			focus: '',
			activities: [],
			// colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
		};
	},
	methods: {
		prev() {
			this.$refs.calendar.prev();
		},
		next() {
			this.$refs.calendar.next();
		},
		setToday() {
			this.focus = '';
		},
		updateRange({ start, end }) {
			this.getActivitiesInRange(start, end);
		},
		/**
		 * Filters activity list for in range, then converts activities to calendar events
		 */
		getActivitiesInRange(start, end) {
			if (!this.activityList || this.activityList.length === 0) {
				console.warn('No activities found');
				return;
			}

			const startOfRange = this.dateStringToEpoch(start.date);
			const endOfRange = this.dateStringToEpoch(end.date);
			const activities = this.activityList.filter((val) => {
				const activityStart = this.dateStringToEpoch(val.createdAt);
				if (activityStart > startOfRange && activityStart < endOfRange) return true;
				return false;
			});

			// push full activities up
			this.$emit('update-range', { activityList: activities, start, end });

			this.activities = [];
			activities.forEach((val) => {
				this.activities.push(new Event(val.title, this.dateStringToEpoch(val.createdAt), this.dateStringToEpoch(val.createdAt) + val.endTime, 'orange', false));
			});
		},
		dateStringToEpoch(date) {
			return new Date(date).valueOf();
		}
	}
};
</script>

<style>

</style>
