<template>
	<v-card
		class="ma-2"
		max-height="65vh"
		width="100vh"
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
			<distance :distance="$_.get(ride, 'stats.distance', 0)"/>
			<v-btn icon>
				<v-icon @click.stop="removeRide">mdi-delete</v-icon>
			</v-btn>

		</v-toolbar>
		<v-row class="pt-1">
			<Map
				:centerLat="centerLat"
				:centerLong="centerLong"
				:height="$vuetify.breakpoint.mobile ? '50vh' : '35vh'"
			>
				<template v-slot:route>
					<l-polyline
						v-if="routeGeo"
						:lat-lngs="routeGeo"
					> </l-polyline>
				</template>
				<template v-slot:closepassmarkers>
					<l-circle-marker
						v-for="(closePass, idx) in closePasses"
						:key="`closepassmarker${idx}`"
						color="red"
						:fill-opacity="1"
						:radius="5"
						name="closePass"
						:lat-lng="closePass.geo.coords">
					</l-circle-marker>
				</template>
			</Map>
		</v-row>
		<v-row
			justify="center"
			class="py-2 px-2">
			<span class="mr-2">
				<v-icon
					color="error">mdi-car-arrow-right</v-icon>{{numberClosePasses}} close passes
			</span>
			<span v-if="caloriesBurned">
				<v-icon
					color="warning">mdi-fire</v-icon>{{caloriesBurned}} calories burned
			</span>
		</v-row>

	</v-card>
</template>

<script>
import { LPolyline, LCircleMarker } from 'vue2-leaflet';
import Distance from '~/components/Distance.vue';

export default {
	computed: {
		numberClosePasses() {
			if (this.ride.closePasses) return this.ride.closePasses.length;
			return 0;
		},
		caloriesBurned() {
			if (this.ride.stats && this.ride.stats.caloriesBurned) {
				return this.ride.stats.caloriesBurned.toFixed(1);
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
		route() {
			if (this.ride && this.ride.routeId) {
				return this.$store.getters['routes/getRouteById'](this.ride.routeId);
			}
			return null;
		},
		routeGeo() {
			return this.$_.get(this.route, 'geo.coordinates', null);
		},
		closePasses() {
			if (this.ride && this.ride.closePasses) return this.$store.getters['activities/getClosePasses'](this.ride.closePasses);
			return [];
		}
	},
	components: {
		Distance,
		LPolyline,
		LCircleMarker
	},
	methods: {
		viewActivity() {
			if (this.ride && this.ride._id) {
				this.$router.push(`/activity/${this.ride._id}`);
			} else {
				console.error('Unable to find ride');
			}
		},
		removeRide() {
			this.$store.dispatch('activities/deleteRide', this.ride._id);
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
			closePasses: {
				type: Number,
				default: 0
			},
			description: {
				type: String,
				default: ''
			},
			distance: {
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
};
</script>
