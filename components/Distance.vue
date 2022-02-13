<template>
	<span>{{toKm(distance)}} km</span>
</template>

<script>
export default {
	methods: {
		toKm(distance) {
			return Number(distance / 1000).toFixed(2);
		}
	},
	props: {
		distance: {
			type: Number,
			default: 0
		}
	}
};
</script>
