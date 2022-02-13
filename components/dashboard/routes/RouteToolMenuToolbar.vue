<template>
	<v-toolbar
		color="primary"
		dense
		dark>Created Routes
		<v-spacer></v-spacer>
		<v-btn icon>
			<v-icon @click="toggleFilter">mdi-filter</v-icon>
		</v-btn>
		<div v-if="!drawingRoute">
			<v-btn
				icon
				@click="draw()">
				<v-icon>
					mdi-plus</v-icon>
			</v-btn>
		</div>
		<div v-else>
			<v-btn
				icon
				@click="stopDraw()">
				<v-icon>mdi-cancel</v-icon>
			</v-btn>
		</div>
	</v-toolbar>
</template>

<script>
export default {
	methods: {
		toggleFilter() {
			this.$emit('toggle-filter');
		},
		draw() {
			this.$emit('draw');
		},
		stopDraw() {
			this.$emit('stop-draw');
		}
	},
	props: {
		drawingRoute: {
			type: Boolean,
			default: false
		}
	}
};
</script>
