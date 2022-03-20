<template>
	<v-container
		:style="mapStyle"
		id="map-wrap"
		fluid>
		<l-map
			ref="map"
			:zoom="zoom"
			:center="[centerLat, centerLong]">

			<l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
			<l-marker :lat-lng="[centerLat,centerLong]"></l-marker>
			<slot name="route">
			</slot>
			<slot name="closepassmarkers">
			</slot>
		</l-map>
	</v-container>
</template>

<script>
import L, { Icon } from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-draw';

export default {
	computed: {
		mapStyle() {
			const height = typeof this.height === 'string' ? this.height : `${this.height}px`;
			const width = typeof this.width === 'string' ? this.width : `${this.width}px`;
			return `height: ${height}; width: ${width}; z-index: 1`;
		}
	},
	components: {
		LMap,
		LTileLayer,
		LMarker,
	},
	data() {
		return {
			routingLayer: null,
			routingItineraryLayer: null,
			drawingLayer: null,
			drawnItems: null,
			map: null,
			route: []
		};
	},
	mounted() {
		delete Icon.Default.prototype._getIconUrl;
		Icon.Default.mergeOptions({
			iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
			iconUrl: require('leaflet/dist/images/marker-icon.png'),
			shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
		});

		this.$nextTick(() => {
			this.map = this.$refs.map.mapObject;
			this.$emit('register-map', this.$refs.map);
		});
	},
	methods: {
		/**
		 * Adds draw toolbar and control to map
		 */
		enableDraw() {
			this.drawnItems = new L.FeatureGroup();
			this.drawingLayer = new L.Control.Draw({
				draw: {
					polygon: false,
					polyline: false,
					rectangle: false,
					circle: false,
					circlemarker: false,
				}
			});
			this.map.addControl(this.drawingLayer);
			this.registerDrawEventHandlers();
		},
		/**
		 * Handle new markers being added (treat as waypoints)
		 */
		registerDrawEventHandlers() {
			this.map.on('draw:created', (e) => {
				const { layer } = e;
				const { _latlng } = layer;
				const { lat, lng } = _latlng;
				this.route.push([lat, lng]);
			});
		},
		/**
		 * Removes layer from map
		 */
		disableDraw() {
			this.map.removeLayer(this.drawingLayer);
			this.map.removeControl(this.drawingLayer);
		},
		/**
		 * Enable routing between drawn points, and register handler to emit new route when updated
		 */
		enableRouting() {
			this.routingLayer = L.Routing.control({
				show: false,
				waypoints: []
			}).addTo(this.map);

			this.routingLayer.on('routesfound', (e) => {
				const { routes } = e;
				this.$emit('update-route', routes);
			});
		},
		/**
		 * Disables routing, removing routing layers and itinerary
		 */
		disableRouting() {
			this.map.removeLayer(this.routingLayer);
			this.map.removeControl(this.routingLayer);
			this.route = this.route.splice(0, this.route.length);
			this.routingLayer = null;
		},
		/**
		 * Updates local state route and pushes route params up to be saved by parent component to db
		 */
		updateRoute(newRoute) {
			this.routingLayer.setWaypoints(newRoute);
		}
	},
	props: {
		height: {
			type: [Number, String],
			default: 350
		},
		width: {
			type: [Number, String],
			default: 350
		},
		zoom: {
			type: Number,
			default: 10
		},
		centerLat: {
			type: Number,
			default: 43.2464418
		},
		centerLong: {
			type: Number,
			default: -79.8277591
		},
		drawing: {
			type: Boolean,
			default: false
		},
	},
	watch: {
		drawing(isDrawing) {
			if (isDrawing) {
				this.enableDraw();
				this.enableRouting();
			} else if (this.routingLayer) {
				this.disableRouting();
				this.disableDraw();
			}
		},
		route(newRoute) {
			if (this.routingLayer) {
				this.updateRoute(newRoute);
			}
		}
	}
};
</script>

<style>
.leaflet-draw-draw-marker{
	background: url('leaflet/dist/images/marker-icon.png') no-repeat;
	background-size: 15px;
}
.leaflet-draw-draw-marker .sr-only{
	display: none;
}
</style>
