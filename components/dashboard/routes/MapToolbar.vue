<template>
	<v-toolbar
		color="primary"
		dense>
		<v-spacer></v-spacer>
		<v-btn
			@click="toggleHeatmap"
			icon>
			<v-icon
				color="secondary"
				v-if="!showHeatmap">
				mdi-map-marker-path
			</v-icon>
			<v-icon
				v-else
				color="secondary">mdi-eye-off-outline</v-icon>
		</v-btn>
	</v-toolbar>
</template>

<script>
export default {
	data() {
		return {
			showHeatmap: false
		};
	},
	methods: {
		toggleHeatmap() {
			this.showHeatmap = !this.showHeatmap;
			this.$emit('toggle-heatmap', this.showHeatmap);
		}
	}
};
</script>
