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
			<v-row
				v-if="videoUrl != null"
				no-gutters>
				<v-col
					cols="12"
				>
					<!-- Video -->
					<video
						width="100%"
						style="max-height: 300px;"
						id="myVideo"
						controls>
						<source :src="videoUrl" /> Your browser does not support video.
					</video>
				</v-col>
			</v-row>
			<v-card-text>
				<v-file-input
					v-model="videoFile"
					@change="previewVideo"
					label="Video"
					prepend-icon="mdi-video"></v-file-input>
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
const { default: SubmitButtons }=require("~/components/forms/SubmitButtons.vue")

export default {
	computed: {
		accessToken() {
			return this.$store.getters['getAccessToken'];
		},
		axiosConfig() {
			return this.$store.getters['getAxiosConfig'];
		}
	},
	components: { SubmitButtons },
	data(){
		return {
			dialog: false,
			videoFile: null,
			videoUrl: null
		}
	},
	methods: {
		closeDialog(){
			this.dialog = false;
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

				let response = await this.$axios.post('/video', formData, this.axiosConfig);
				console.log('res', response);
			} catch (error) {
				console.log(error);
			}

		}
	},
	props: {
	}
}
</script>