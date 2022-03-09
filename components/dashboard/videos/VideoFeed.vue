<template>
	<v-container class="ma-0 pa-0">
		<video-bar />
		<v-row
			justify="center"
		>
			<v-col
				cols="12"
				md="4"
				v-for="video in videos"
				:key="video._id">
				<video-card
					:video="video"
					@delete-video="deleteVideo"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import VideoBar from './VideoBar.vue';
import VideoCard from './VideoCard.vue';

export default {
	computed: {
		videos() {
			return this.$store.getters['videos/getVideos'];
		},
		axiosConfig() {
			return this.$store.getters.getAxiosConfig;
		}
	},
	components: {
		VideoBar,
		VideoCard
	},
	data() {
		return {
		};
	},
	methods: {
		async deleteVideo(id) {
			try {
				const { status } = await this.$axios.delete(`/video/${id}`, this.axiosConfig);
				if (status === 200) {
					this.$store.commit('videos/REMOVE_VIDEO', id);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}
};
</script>
