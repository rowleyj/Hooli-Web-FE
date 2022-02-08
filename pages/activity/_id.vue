<template>
	<v-container>
		<v-card v-if="ride">
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
						:centerLat="centerLat"
						:centerLong="centerLong"
						:zoom="12">
						<template v-slot:route>
							<l-polyline
								:lat-lngs="routeGeo"
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
					<speed-chart
						:gpsDelay="gpsDelay"
						:speeds="speeds"
					/>
				</v-col>
			</v-row>
			<v-row>
				<v-col
					cols="4"
					class="pl-2">
					<video-scroller
						:videoUrl="ride.videoUrl"
						:closePassesIds="ride.closePasses"
					/>
				</v-col>
				<v-col cols="8">
					<v-card class="pa-2 mx-2">
						{{ride.description}}
					</v-card>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
import { LPolyline, LMarker } from 'vue2-leaflet';
import SpeedChart from '~/components/charts/SpeedChart.vue';
import VideoScroller from '~/components/dashboard/videos/VideoScroller.vue';
import Map from '~/components/Map.vue';

export default {
	computed: {
		ride() {
			return this.$store.getters['activities/getRideById'](this.$route.params.id);
		},
		route() {
			if (this.ride && this.ride.routeId) {
				return this.$store.getters['routes/getRouteById'](this.ride.routeId);
			}
			return null;
		},
		routeGeo() {
			return this.$_.get(this.route, 'geo.coordinates', null);
		},
		stats() {
			if (this.ride) {
				return this.computeStatsToShow(this.ride.stats);
			}
			return [];
		},
		speeds() {
			if (this.ride && this.ride.stats) {
				return this.ride.stats.speeds;
			}
			return [];
		},
		gpsDelay() {
			if (this.ride && this.ride.meta) {
				return this.ride.meta.gpsDelay;
			}
			return null;
		},
		center() {
			return this.$_.get(this.route, 'geo.coordinates[0]', [50, 50]);
		},
		centerLat() {
			return this.center[0];
		},
		centerLong() {
			return this.center[1];
		},
	},
	components: {
		Map,
		SpeedChart,
		VideoScroller,
		LPolyline
	},
	data() {
		return {
			statNamePairings: {
				caloriesBurned: 'Calories Burned',
				distance: 'Distance Travelled',
				avgSpeed: 'Average Speed',
				movementTimeMs: 'Movement Time'
			},
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
		};
	},
	methods: {
		backToDashboard() {
			this.$router.push('/dashboard');
		},
		formatMSToTimestamp(ms) {
			return new Date(ms).toISOString().substr(11, 8);
		},
		computeStatsToShow(stats) {
			const statsToShow = [];
			Object.entries(stats).forEach(([key, val]) => {
				const name = this.statNamePairings[key];
				let value = val;
				switch (key) {
				case 'speeds':
					// do nothing
					break;
				case 'avgSpeed':
					statsToShow.push({ name, value: `${value.toFixed(1)} km/h` });
					break;
				case 'caloriesBurned':
					statsToShow.push({ name, value: value.toFixed(1) });
					break;
				case 'movementTimeMs':
					value = this.formatMSToTimestamp(value);	// value is in ms
					statsToShow.push({ name, value });
					break;
				case 'distance':
					value /= 1000; // convert m -> km
					statsToShow.push({ name, value: `${value.toFixed(2)} km` });
					break;
				default:
					break;
				}
			});
			return statsToShow;
		}
	}
};
</script>

<style>

</style>
