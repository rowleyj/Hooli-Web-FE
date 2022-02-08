<template>
	<chart
		:series="[getLineChart(speeds, 'speed')]"
		:xAxis="speedXChartAxis"
	/>
</template>

<script>
import Chart from './Chart.vue';

export default {
	computed: {
		speedXChartAxis() {
			if (!this.speeds) return [];
			if (this.gpsDelay) return this.speeds.map((position, index) => this.formatMSToTimestamp(this.gpsDelay * index));
			return this.speeds.map((position, index) => index);
		}
	},
	components: {
		Chart
	},
	methods: {
		formatMSToTimestamp(ms) {
			return new Date(ms).toISOString().substr(11, 8);
		},
		getLineChart(series, name) {
			return {
				type: 'line',
				data: series,
				name
			};
		},
	},
	props: {
		speeds: {
			type: Array,
			default: () => []
		},
		gpsDelay: {
			type: Number,
			default: 0
		}
	}
};
</script>
