<template>
	<client-only>
		<v-chart
			style="height: 400px;"
			autoresize
			:option="option"
			:updateOptions="{option: option, replaceMerge: ['series', 'xAxis']}" />
	</client-only>
</template>

<script>
import VChart from 'vue-echarts';

export default {
	computed: {
		option() {
			if (this.xAxis && this.series) return this.getGraphOptions();
			return null;
		}
	},
	components: {
		'v-chart': VChart
	},
	methods: {
		getGraphOptions() {
			const option = {
				tooltip: {
					position: 'top'
				},
				grid: {
					left: '10%',
					top: '10%',
					bottom: '10%',
					right: '10%'
				},
				xAxis: {
					type: 'category',
					data: this.xAxis
				},
				yAxis: {
					type: 'value'
				},
				series: this.series,
				legend: {
					show: true
				},
			};
			return option;
		},
	},
	props: {
		series: {
			type: Array,
			default: () => []
		},
		xAxis: {
			type: Array,
			default: () => []
		}
	},
};
</script>

<style>
</style>
