<template>
	<v-container>
		<v-card
			class="my-4"
			shaped
			width="100%"
			height="20vh"
			v-for="video in videos"
			:key="video.id">
			<v-card-title>{{video.title}}</v-card-title>
		</v-card>
	</v-container>
</template>

<script>
export default {
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