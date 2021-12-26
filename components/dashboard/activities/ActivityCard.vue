<template>
	<v-card
		class="mx-8 mb-8 mt-4 pb-2"
		@click="viewActivity"
		hover>
		<v-toolbar
			flat
			color="primary"
			dark
			dense>
			<v-toolbar-title>
				{{ride.title}}
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<distance :distance="ride.distance"/>

		</v-toolbar>
		<v-row>
			<v-col cols="9">
				<v-row>
					<v-container class="px-4 pt-2 pb-0 ma-2">
						{{ride.description}}
					</v-container>
				</v-row>
				<v-row
					justify="center"
					class="py-2">
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
</template>

<script>
import Distance from '~/components/Distance.vue'
export default {
	components: {
		Distance
	},
	methods: {
		viewActivity(){
			if(this.ride && this.ride.id){
				this.$router.push(`/activity/${this.ride.id}`);
			}else{
				console.error('Unable to find ride');
			}
		}
	},
	props: {
		ride: {
			img: {
				type: String,
				default: ''
			},
			caloriesBurned: {
				type: Number,
				default: 0
			},
			closePasses:  {
				type: Number,
				default: 0
			},
			description: {
				type: String,
				default: ''
			},
			distance:  {
				type: Number,
				default: 0
			},
			title: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: ''
			},
			default: () => {}
		}

	}
}
</script>