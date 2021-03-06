<template>
	<v-dialog
		v-model="dialog"
		transition="dialog-bottom-transition"
		scrollable
		width="600">
		<template
			v-slot:activator="
				{
					on,
					attrs
				}">
			<v-btn
				v-if="isMobile"
				x-small
				v-on="on"
				fab
				class="mr-2"
				v-bind="attrs"
				color="primary">
				<v-icon>mdi-plus</v-icon>
			</v-btn>
			<v-btn
				v-else
				v-on="on"
				class="mr-2"
				v-bind="attrs"
				color="primary">
				<v-icon>mdi-plus</v-icon>
				<span
					class="ml-2">
					Add Activity
				</span>
			</v-btn>
		</template>
		<v-container
			class="ma-0 pa-0">
			<v-card >
				<v-card-title>
					<span class="text-h5">
						Add New Activity
					</span>
					<v-spacer></v-spacer>
					<v-btn
						small
						icon
						@click="closeDialog">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-card-title>
				<v-divider class="mt-2"></v-divider>
				<v-card-text>
					<v-text-field
						label="Title"
						v-model="title"></v-text-field>
					<v-textarea
						label="Description"
						v-model="description"></v-textarea>
					<v-file-input
						v-model="rideFile"
						label="Ride File"
						prepend-icon="mdi-bicycle"
						hint="We use your data to calculate speed, calories burned, and show your route"
						accept="application/json"></v-file-input>
					<video-input
						@change="updateVideo"/>
				</v-card-text>
				<submit-buttons
					submit-text="Create Activity"
					@submit="processActivity()"
					@close="closeDialog"
					:loading="processing"
					:disabled="processing"
				/>
			</v-card>
		</v-container>

	</v-dialog>
</template>

<script>
import SubmitButtons from "@/components/forms/SubmitButtons.vue";
import VideoInput from '@/components/dashboard/videos/VideoInput.vue';

export default {
	computed: {
		axiosConfig() {
			return this.$store.getters.getAxiosConfig;
		},
		isMobile() {
			return this.$vuetify.breakpoint.mobile;
		}
	},
	components: { SubmitButtons, VideoInput },
	data() {
		return {
			dialog: false,
			rideFile: null,
			title: '',
			description: '',
			processing: false
		};
	},
	methods: {
		closeDialog() {
			this.dialog = false;
		},
		/**
		 * Handles child component video file change
		 */
		updateVideo(newVideoFile) {
			this.videoFile = newVideoFile;
		},
		/**
		 * Process ridefile
		 */
		async processRideFile() {
			if (!this.rideFile) throw Error('No ride file!');
			return this.fileToJSON(this.rideFile);
		},
		async fileToJSON(file) {
			return new Promise((resolve, reject) => {
				const fileReader = new FileReader();
				fileReader.onload = event => resolve(JSON.parse(event.target.result));
				fileReader.onerror = error => {
					this.processing = false;
					this.$alerts.setErrorSnackbar('create_activity_error');
					reject(error);
				};
				fileReader.readAsText(file);
			});
		},
		/**
		 * Uploads video, then uploads activity
		 */
		async processActivity() {
			try {
				this.processing = true;
				const { url } = await this.uploadVideo();
				const activity = await this.createActivity(url);
				this.processing = false;
				if (activity) this.closeDialog();
				else {
					this.$alerts.setErrorSnackbar('create_activity_error');
				}
			} catch (error) {
				console.error(error);
				this.processing = false;
			}
		},
		/**
		 * Create a users activity, upload files to server
		 * @param {string} videoUrl - the url of the uploaded video
		 */
		async createActivity(videoUrl) {
			try {
				const body = {
					ride: {
						...await this.processRideFile()
					},
					title: this.title,
					videoUrl: videoUrl,
					description: this.description
				};

				const { data, status } = await this.$axios.post('/ride', body, this.axiosConfig);
				if (status === 201) {
					this.$store.commit('activities/ADD_RIDE', data);
					this.$store.dispatch('routes/getRoute', data.routeId);
					return data;
				}
				throw Error('unable to add video');
			} catch (error) {
				this.$alerts.setErrorSnackbar('create_activity_error');
				console.error(error);
			}
		},
		/**
		 * Uploads the video
		 * @returns {object} {url: 'path to video', ...}
		 */
		async uploadVideo() {
			const formData = new FormData();
			formData.append("video", this.videoFile);
			formData.append("title", this.title);

			const uploaded = await this.$store.dispatch('videos/uploadVideo', {
				axiosConfig: this.axiosConfig,
				formData
			});

			return uploaded;
		}
	},
	props: {
	}
};
</script>
