<template>
	<v-container>
		<v-card>
			<v-toolbar
				flat
				color="primary"
				dark
				dense>
				<v-toolbar-title>
					{{ride.title}}
				</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-btn
					icon
					@click="backToDashboard">
					<v-icon>
						mdi-arrow-left
					</v-icon>
				</v-btn>
			</v-toolbar>
			<v-row>
				<v-col
					cols="12"
					sm="8">
					<Map
						:height="600"
						width="100%"
						:zoom="12">
						<template v-slot:route>
							<l-polyline
								:lat-lngs="ride.latlngs"
							> </l-polyline>
						</template>
					</Map>
				</v-col>
				<v-col
					cols="12"
					sm="4">
					<v-data-table
						:headers="headers"
						:items="stats"
						hide-default-header
						hide-default-footer
						class="elevation-1 ma-2"
					></v-data-table>
				</v-col>
				<v-col cols="12">
					<v-card class="pa-2 mx-2">
						{{ride.description}}
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
import Map from '~/components/Map.vue';
export default {
	computed:{
		ride(){
			return this.$store.getters['activities/getRideById'](this.$route.params.id);
		}
	},
	components:{
		Map
	},
	data(){
		return {
			headers: [
				{
					value: 'name',
					text: 'Stat Name'
				},
				{
					value: 'value',
					text: 'Stat Value'
				}
			],
			stats: [
				{
					name: 'Distance',
					value: 23
				},
				{
					name: 'Average Speed',
					value: 10
				},
				{
					name: 'Number of Close Passes',
					value: 3
				},
				{
					name: 'Total Cars Passed',
					value: 300
				},
				{
					name: 'Closest pass',
					value: 0.33
				},
				{
					name: 'Calories burned',
					value: 621
				},
				{
					name: 'Elapsed Time',
					value: '3 hours 21 minutes'
				},
				{
					name: 'Moving Time',
					value: '3 hours 2 minutes'
				}
			]
		}
	},
	methods: {
		backToDashboard(){
			this.$router.push('/dashboard');
		}
	}
}
</script>

<style>

</style>