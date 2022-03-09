<template>
	<v-card class="text-center mx-4">
		<video-and-canvas
			:videoUrl="videoUrl"
		/>

		<v-toolbar
			color="accent"
			dense
			dark
			class="mt-n2">
			<v-toolbar-title>
				Complete Ride Video
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn
				icon
				dark
				@click="getNextVideo">
				<v-icon>
					mdi-chevron-right
				</v-icon>
			</v-btn>
		</v-toolbar>
	</v-card>
</template>

<script>
import VideoAndCanvas from './VideoAndCanvas.vue';

export default {
	computed: {
		maxState() {
			let numVids = 0;
			if (this.videoUrl)numVids++;
			if (this.closePassesIds) this.closePassesIds.reduce((acc, val) => acc + val, numVids);
			return numVids;
		},
		axiosConfig() {
			return this.$store.getters.getAxiosConfig;
		},
		video() {
			if (this.state === 0) return this.videoUrl;
			return this.currentClosePassUrl;
		}
	},
	components: {
		VideoAndCanvas
	},
	data() {
		return {
			state: 0,
			closePasses: {}, // caching mechanism for closePasses
			currentClosePassUrl: '',
		};
	},
	methods: {
		getNextVideo() {
			if (this.state < this.maxState) {
				if (this.state !== 0) {
					this.fetchClosePass(this.state);
				}
				this.state++;
			} else {
				console.error('out of range');
				this.state = 0;
			}
		},
		async fetchClosePass(state) {
			const closePassId = this.closePassesIds[state];

			if (this.closePasses[closePassId]) {
				// close pass available in cache
				const closePass = this.closePasses[closePassId];
				this.currentClosePassUrl = closePass.videoUrl;
			} else {
				if (!closePassId) throw Error('No closepass id available!');

				const closePass = this.$axios.get(`/closePass/${closePassId}`, this.axiosConfig);

				// update cache
				this.$set(this.closePasses, closePassId, closePass);
				this.currentClosePassUrl = closePass.videoUrl;
			}
		}
	},
	props: {
		videoUrl: {
			type: String,
			default: ''
		},
		closePassesIds: {
			type: Array,
			default: () => []
		}
	}
};
</script>
