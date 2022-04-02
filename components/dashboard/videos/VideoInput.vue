<template>
	<div>
		<v-row
			v-if="videoUrl != null"
			no-gutters
			justify="center">
			<!-- Video -->
			<video
				style="max-height: 250px;"
				id="myVideo"
				controls>
				<source :src="videoUrl" /> Your browser does not support video.
			</video>
		</v-row>
		<v-file-input
			v-model="videoFile"
			@change="previewVideo"
			label="Video"
			prepend-icon="mdi-video"
			accept="video/*"
		></v-file-input>
	</div>
</template>

<script>
export default {
	data() {
		return {
			videoUrl: null,
			videoFile: null,
		};
	},
	methods: {
		/**
		 * Updates the preview video based on the input video (to upload)
		 * @param {HTMLEvent} e - event from inserting video into form input
		 */
		previewVideo(e) {
			if (e) {
				const url = URL.createObjectURL(e);
				this.videoUrl = url;
			} else {
				this.videoUrl = null;
			}
			this.emitVideoChange();
		},
		/**
         * Emits an event for parent component to pick up on video change
         */
		emitVideoChange() {
			this.$emit('change', this.videoFile);
		}
	}
};
</script>
