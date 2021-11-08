<template>
	<v-container>
		<v-row>
			<v-col
				cols="12"
				lg="4">
				<v-card
					width="100%"
					class="mx-auto"
				>
					<v-toolbar
						color="primary"
						dense
						dark>Created Routes
						<v-spacer></v-spacer>
						<v-btn
							icon
							@click="drawRoute()">
							<v-icon>
								mdi-plus</v-icon>
						</v-btn>
					</v-toolbar>
					<v-list>
						<v-list-item-group
							v-model="selected"
						>
							<v-list-item
								v-for="route in routes"
								:key="route.id"
								@click="selectRoute(route)">
								<v-list-item-content>
									{{route.name}}

								</v-list-item-content>
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
					<v-row
						justify="center">
						<Map
							@register-map="registerMap"
							:drawing="drawingRoute"
							:height="600"
							width="100%"
							:zoom="12"/>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

export default {
	data() {
		return {
			selected: [],
			routes: [
				{
					name: 'route 1',
					id: 'abc'
				},
				{
					name: 'route 2',
					id: 'abc1'
				}
			],
			selectedRoute: null,
			mapRef: null,
			drawingRoute: false
		}
	},
	methods: {
		/**
		 * Select a route to show on the map
		 */
		selectRoute(route){
			this.selectedRoute = route;
			console.log(this.$refs);
			if(this.mapRef && this.mapRef.props){
				console.log(this.mapRef)
				this.mapRef.props.zoom = 1
			}
		},
		/**
		 * Registers a reference to the map so we can draw on it
		 */
		registerMap(mapRef){
			this.mapRef = mapRef
		},
		drawRoute(){
			console.log(this.mapRef);
			this.drawingRoute = true;
			this.mapRef.mapObject.on('draw:created', (e) => {
				console.log('draw created', e);
			})
			this.mapRef.mapObject.on('draw:edited', (e) => {
				console.log('draw edited', e);
			})
			this.mapRef.mapObject.on('draw:drawstop', (e) => {
				console.log('draw drawstop', e);
			})
			this.mapRef.mapObject.on('draw:drawvertex', ({target}) => {
				const {_layers: layers} = target;
				console.log(layers);
				Object.keys(layers).forEach(layerId => {
					// doesnt work...
					// console.log(layerId instanceof L.Polyline);
				})
			})
		}
	}
}
/**
 draw drawvertex
Object { layers: {…}, type: "draw:drawvertex", target: {…}, sourceTarget: {…} }

layers: Object { _initHooksCalled: true, _leaflet_id: 176, _zoomAnimated: true, … }

sourceTarget: Object { _sizeChanged: false, _leaflet_id: 2, _containerId: 3, … }

target: Object { _sizeChanged: false, _leaflet_id: 2, _containerId: 3, … }

type: "draw:drawvertex"

<prototype>: Object { … }
Routes.vue:117


 */
</script>

<style>

</style>

