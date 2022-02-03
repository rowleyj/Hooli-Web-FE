<template>
	<v-dialog
		v-model="dialog"
		width="600">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				small
				v-on="on"
				v-bind="attrs"
				class="mr-2"
				color="primary">
				<v-icon left>mdi-plus</v-icon>
				Upload Video
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="text-h5">
					Upload Ride Video
				</span>
				<v-spacer></v-spacer>
				<v-btn
					small
					icon
					@click="closeDialog">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-card-title>
			<v-divider class="my-2"></v-divider>
			<v-card-text>
				<v-text-field
					v-model="title"
					label="Title">

				</v-text-field>
				<video-input
					@change="updateVideo"
				/>
			</v-card-text>
			<submit-buttons
				submit-text="Upload Video"
				@submit="uploadVideo()"
				@close="closeDialog"
			/>
		</v-card>
	</v-dialog>
</template>

<script>
import VideoInput from './VideoInput.vue';
import SubmitButtons from '../../forms/SubmitButtons.vue'

export default {
	computed: {
		accessToken() {
			return this.$store.getters['getAccessToken'];
		},
		axiosConfig() {
			return this.$store.getters['getAxiosConfig'];
		}
	},
	components: {
		SubmitButtons,
		VideoInput },
	data(){
		return {
			dialog: false,
			videoFile: null,
			title: ''
		}
	},
	methods: {
		closeDialog(){
			this.dialog = false;
		},
		/**
		 * Handles child component video file change
		 */
		updateVideo(newVideoFile){
			this.videoFile = newVideoFile;
		},
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
		},
		/**
		 * Upload a single ride video to server
		 */
		async uploadVideo(){
			try {
				console.log('upload video')
				const formData = new FormData();
				formData.append("video", this.videoFile);
				formData.append("title", this.title);

				let uploaded = this.$store.dispatch('videos/uploadVideo', {
					axiosConfig: this.axiosConfig,
					formData
				});

				if(uploaded) this.closeDialog();
				else alert('unable to upload!');
			} catch (error) {
				console.log(error);
			}
		}
	},
	props: {
	}
}
</script>