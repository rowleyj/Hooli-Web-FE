<template>
	<div style="position: relative;">
		<video
			width="100%"
			controls
			ref="video"
		>
			<source
				:src="videoUrl"
				type="video/mp4">
			Your browser does not support the video tag. </video>
		<canvas
			width="100%"
			style="z-index: 1;position: absolute; left: 0; pointer-events:none;"
			ref="videoCanvas"></canvas>
	</div>
</template>

<script>

export default {
	data() {
		return {
			canvas: null,
		};
	},
	mounted() {
		this.initCanvas();
	},
	methods: {
		initCanvas() {
			const controlSize = 50;
			this.canvas = this.$refs.videoCanvas;
			const { video } = this.$refs;

			const self = this;
			video.addEventListener('loadeddata', function (e) {
				self.canvas.height = this.videoHeight - controlSize;
				self.canvas.width = this.videoWidth;

				if (this.boundingCube) self.drawBoxes();
			});
		},
		drawBoxes() {
			const { video } = this.$refs;
			const { start, end, boxes } = this.boundingCube;

			video.addEventListener('timeupdate', (e) => {
				// convert current time to box index
				const { currentTime } = video;
				if (currentTime > start && currentTime < end && boxes && boxes.length) {
					const timeSinceStart = currentTime - start;
					const timeDelta = (end - start) / boxes.length;
					const updateIdx = Math.round(timeSinceStart / timeDelta);

					this.drawBox(updateIdx);
				}

				// enforce clear canvas when nothing is running
				if (currentTime < start || currentTime > end) {
					this.clearCanvas();
				}
			});
		},
		drawBox(boxIdx) {
			// clear last box
			this.clearCanvas();
			const ctx = this.canvas.getContext('2d');
			const {
				x, x1, y, y1
			} = this.boundingCube.boxes[boxIdx];

			ctx.strokeRect(x, y, x1, y1);
		},
		clearCanvas() {
			const ctx = this.canvas.getContext('2d');

			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	},
	props: {
		videoUrl: {
			type: String,
			default: ''
		}
	},
	watch: {
		videoUrl() {
			// if videoUrl changes at all then we should clear the canvas
			this.clearCanvas();
		},
		boundingCube: {
			type: Object,
			default: () => ({
				start: 0,
				end: 0,
				boxes: []
			})
		}
	}
};
</script>

<style>

</style>
