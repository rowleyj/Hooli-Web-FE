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
				Add Activity
			</v-btn>
		</template>
		<v-card>
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
				<v-textarea label="Description"></v-textarea>
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
				@submit="createActivity()"
				@close="closeDialog"
			/>
		</v-card>
	</v-dialog>
</template>

<script>
import SubmitButtons from "@/components/forms/SubmitButtons.vue";
import VideoInput from '@/components/dashboard/videos/VideoInput.vue';

export default {
	computed: {
		axiosConfig() {
			return this.$store.getters['getAxiosConfig'];
		}
	},
	components: { SubmitButtons, VideoInput },
	data(){
		return {
			dialog: false,
			rideFile: null,
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
			console.log('updating video', newVideoFile)
			this.videoFile = newVideoFile;
		},
		/**
		 * Create a users activity, upload files to server
		 */
		async createActivity(){
			try {
				if(!this.rideFile) throw Error('Missing GPS file')

				const formData = new FormData();
				formData.append('ride', this.rideFile);
				formData.append('title', this.title);
				const {data, status} = await this.$axios.post('/ride', formData, this.axiosConfig);
				if(status == 201){
					console.log(data);
				}else{
					throw Error('unable to add video');
				}
			} catch (error) {
				console.log(error);
			}
		},
		/**
		 * Uploads the video - NEED to associate with ride
		 */
		uploadVideo(){
			const formData = new FormData();
			formData.append("video", this.videoFile);
			formData.append("title", this.title);

			let uploaded = this.$store.dispatch('videos/uploadVideo', {
				axiosConfig: this.axiosConfig,
				formData
			});
			console.log('video uploaded?', uploaded);
		}
	},
	props: {
	}
}
</script>