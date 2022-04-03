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
/**
 * List of boxes over a time interval (start - end)
 */
class BoundingCube {
	constructor(start, end, boxes) {
		this.start = start;
		this.end = end;
		this.boxes = boxes;
	}
}

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

				if (this.boundingCubes) self.drawCubes();
			});
		},
		drawCubes() {
			this.boundingCubes.forEach((cube, idx) => {
				this.drawBoxes(idx);
			});
		},
		drawBoxes(cubeIdx) {
			const { video } = this.$refs;
			const { start, end, boxes } = this.boundingCubes[cubeIdx];

			video.addEventListener('timeupdate', (e) => {
				// convert current time to box index
				const { currentTime } = video;
				if (currentTime > start && currentTime < end && boxes && boxes.length) {
					const timeSinceStart = currentTime - start;
					const timeDelta = (end - start) / boxes.length;
					const boxIdx = Math.round(timeSinceStart / timeDelta);

					this.drawBox(boxIdx);
				}

				// enforce clear canvas when nothing is running
				if (currentTime < start || currentTime > end) {
					this.clearCanvas();
				}
			});
		},
		drawBox(cubeIdx, boxIdx) {
			const ctx = this.canvas.getContext('2d');
			const {
				x, x1, y, y1
			} = this.boundingCubes[cubeIdx].boxes[boxIdx];

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
		boundingCubes: {
			type: [BoundingCube]
		}
	}
};
</script>
