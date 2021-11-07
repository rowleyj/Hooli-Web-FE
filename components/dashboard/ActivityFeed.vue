<template>
	<v-container>
		<v-card
			v-for="ride in testRides"
			:key="ride.id"
			class="mx-8 mb-8 mt-4"
			hover>
			<v-toolbar
				flat
				color="secondary"
				dark
				dense>
				<v-toolbar-title>{{ride.title}}</v-toolbar-title>
				<v-spacer></v-spacer>
				{{toKm(ride.distance)}} km

			</v-toolbar>
			<v-row>
				<v-col cols="9">
					<v-row>
						<v-container class="pa-4 ma-2">
							{{ride.description}}
						</v-container>
					</v-row>
					<v-row justify="center">
						<span class="mx-2">
							<v-icon>mdi-car-arrow-right</v-icon>{{ride.closePasses}} close passes
						</span>
						<span>
							<v-icon>mdi-fire</v-icon>{{ride.caloriesBurned}} calories burned

						</span>

					</v-row>
				</v-col>
				<v-col cols="3">
					<v-img
						:src="ride.img"
						max-height="300"
						width="300"
						contain
						class="pa-1"></v-img>
					<!-- <Map :height="150" :width="150"/> -->
				</v-col>
			</v-row>

		</v-card>
	</v-container>
</template>

<script>
import Map from '../Map.vue'
export default {
	components: { Map },
	data(){
		return {
			testRides: [
				{
					id: 'b1',
					title: 'Ride around the block',
					img: 'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2017/02/best-road-trip-major-landmarks.png',
					distance: 21000,
					closePasses: 3,
					caloriesBurned: 315,
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
				},
				{
					id: 'b12',
					title: 'Out with the boys',
					img: 'https://img.theculturetrip.com/450x/smart/wp-content/uploads/2017/02/best-road-trip-major-landmarks.png',
					distance: 37000,
					closePasses: 8,
					caloriesBurned: 615,
					description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
				}
			]
		}
	},
	methods: {
		toKm(distance){
			return Number(distance/1000).toFixed(2)
		}
	}
}
</script>