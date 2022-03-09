<template>
	<v-container style="height: 80vh">
		<v-row>
			<v-col
				cols="12"
				lg="4">
				<v-card
					width="100%"
					class="mx-auto"
					height="100%"
				>
					<route-menu-tool-bar
						@toggle-filter="showFilter = !showFilter"
						@draw="drawRoute()"
						@stop-draw="cancelDraw()"
						:drawingRoute="drawingRoute"
					/>
					<v-toolbar
						dense
						color="accent"
						v-if="showFilter">
						<v-text-field
							placeholder="Search routes"
							hide-details
							append-icon="mdi-magnify"
							v-model="textFilter"></v-text-field>
					</v-toolbar>
					<v-list
						style="max-height: 600px"
						class="overflow-y-auto"
					>
						<v-list-item v-if="drawingRoute">
							<v-text-field
								label="Route Name"
								v-model="newRouteName"></v-text-field>
							<v-spacer></v-spacer>

							<v-btn
								icon
								@click="saveDrawnRoute()">
								<v-icon>mdi-content-save-check</v-icon>
							</v-btn>
						</v-list-item>
						<v-list-item-group
							v-model="selected"
							height="75vh"
						>
							<v-list-item
								v-for="route in filteredRoutes"
								:key="route._id"
								@click="selectRoute(route)">
								<v-row class="px-4">
									{{route.name}}
									<v-spacer></v-spacer>
									<route-menu :routeId="route._id"/>
								</v-row>
							</v-list-item>
						</v-list-item-group>

					</v-list>

				</v-card>

			</v-col>
			<v-col
				cols="12"
				lg="8">
				<v-card
					flat
					height="100%"
					width="100%"
					class="mx-auto pa-2">
					<map-toolbar
						@toggle-heatmap="toggleHeatmap"
					/>
					<v-row
						justify="center">
						<Map
							@register-map="registerMap"
							:drawing="drawingRoute"
							:height="600"
							width="100%"
							:zoom="12"
							:centerLat="center.lat"
							:centerLong="center.long">
							<template v-slot:route>
								<l-polyline
									:lat-lngs="routeToShow.latlngs"
									:color="routeToShow.color"> </l-polyline>
							</template>
							<template v-slot:closepassmarkers>
								<!-- <div
									v-for="(closePass, index) in closePasses"
									:key="`closePass${index}`">
									<l-marker
										:lat-lng="[closePass.lat, closePass.long]"></l-marker>
								</div> -->

							</template>
						</Map>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import L from 'leaflet';
import { LPolyline, LMarker } from 'vue2-leaflet';
import MapToolbar from './MapToolbar.vue';
import RouteMenu from './RouteMenu.vue';
import RouteMenuToolBar from './RouteToolMenuToolbar.vue';
import 'leaflet.heat';

export default {
	computed: {
		userId() {
			return this.$store.getters['user/getUserId'];
		},
		routes() {
			return this.$store.getters['routes/getRoutes'];
		},
		filteredRoutes() {
			if (this.textFilter && this.routes) {
				return this.routes.filter(route => this.$_.get(route, 'name', '').includes(this.textFilter));
			}
			return this.routes;
		}
	},
	components: {
		LPolyline,
		LMarker,
		RouteMenu,
		RouteMenuToolBar,
		MapToolbar
	},
	data() {
		return {
			showFilter: false,
			textFilter: '',
			selected: [],
			selectedRoute: null,
			mapRef: null,
			drawingRoute: false,
			newRouteName: '',
			newRoute: {},
			routeToShow: {
				color: 'black',
				latlngs: []
			},
			center: {
				lat: 50,
				long: 85
			},
			heatmap: null,
		};
	},
	methods: {
		/**
		 * Select a route to show on the map
		 */
		selectRoute(route) {
			this.selectedRoute = route;
			this.routeToShow.latlngs = route.geo.coordinates;
			this.centerOnRouteStart(route.geo.coordinates);
		},
		/**
		 * Centers map on start of a route
		 * @param {number[][]} coordinates = list of [lat, long]
		 */
		centerOnRouteStart(coordinates) {
			if (coordinates && coordinates.length) {
				const [lat, long] = coordinates[0];
				Object.assign(this.center, { lat, long });
			} else {
				console.warn('No coordinates to center on');
			}
		},
		/**
		 * Sends request to save route
		 */
		async saveDrawnRoute() {
			try {
				const axiosConfig = this.$store.getters.getAxiosConfig;
				const coords = Object.values(this.newRoute).map(coord => [coord.lat, coord.lng]);
				const payload = {
					coords,
					name: this.newRouteName,
					user: this.userId,
					custom: true
				};
				const { data, status } = await this.$axios.post('/route', payload, axiosConfig);
				if (data && status === 201) {
					this.$store.commit('routes/ADD_ROUTE', data);
					this.cancelDraw();
				} else {
					this.$alerts.setErrorSnackbar('save_drawn_route_failed');
				}
			} catch (error) {
				this.$alerts.setDefaultErrorSnackbar();
				console.error(error);
			}
		},
		/**
		 * Registers a reference to the map so we can draw on it
		 */
		registerMap(mapRef) {
			this.mapRef = mapRef;
		},
		/**
		 * Empty the new route object and cancel draw
		 */
		cancelDraw() {
			this.newRoute = {};
			this.newRouteName = '';
			this.drawingRoute = false;
		},
		/**
		 * Enable a user to draw a route on the map, and save the lat/long in an id-keyed map
		 */
		drawRoute() {
			this.drawingRoute = true;
			this.mapRef.mapObject.on('draw:drawvertex', (e) => {
				const { layers } = e;
				const polyLayers = Object.values(layers._layers).filter(layer => layer._latlng && layer._latlng.lat);
				polyLayers.forEach(layer => {
					this.newRoute[layer._leaflet_id] = { ...layer._latlng };
				});
			});
		},
		/**
		 * Toggles heatmap view
		 */
		toggleHeatmap(on) {
			if (on) {
				this.generateHeatmap();
			} else {
				this.mapRef.mapObject.removeLayer(this.heatmap);
			}
		},
		generateHeatmap() {
			const routeGeos = this.routes.map(route => route.geo.coordinates);
			const heatpoints = routeGeos.flat(1);
			if (heatpoints && heatpoints.length) {
				this.heatmap = L.heatLayer(heatpoints, { radius: 3, blur: 1 }).addTo(this.mapRef.mapObject);
				this.centerOnRouteStart(heatpoints);
			} else {
				console.warn('No heatmap points found.');
			}
		}
	}
};
</script>

<style>

</style>
