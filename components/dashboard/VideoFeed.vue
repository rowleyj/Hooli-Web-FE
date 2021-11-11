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
				:key="video.id">
				<video-card :title="video.title"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import VideoBar from './videos/VideoBar.vue'
import VideoCard from './videos/VideoCard.vue'
export default {
	components: {
		VideoBar,
		VideoCard
	},
	data(){
		return {
			videos: [
				{
					title: 'ride video 1',
					id: 'rd1',
					length: 178060
				},
				{
					title: 'close pass 1',
					id: 'cp1',
					length: 35000
				},
				{
					title: 'close pass 2',
					id: 'cp2',
					length: 31000
				}
			]
		}
	}
}
</script>