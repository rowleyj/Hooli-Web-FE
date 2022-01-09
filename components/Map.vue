<template>
	<v-container
		:style="mapStyle"
		id="map-wrap"
		fluid>
		<l-map
			ref="map"
			:zoom="zoom"
			:center="[centerLat, centerLong]">
			<l-draw-toolbar
				position="topright"/>

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
import L from 'leaflet';
import "leaflet/dist/images/marker-shadow.png";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import LDrawToolbar from 'vue2-leaflet-draw-toolbar';
import 'leaflet/dist/leaflet.css';

export default {
	computed: {
		mapStyle(){
			let height = typeof this.height === 'string' ? this.height : `${this.height}px`;
			let width = typeof this.width === 'string' ? this.width : `${this.width}px`;
			return `height: ${height}; width: ${width}; z-index: 1`
		}
	},
	components: {
		LMap,
		LTileLayer,
		LMarker,
		LDrawToolbar
	},
	mounted() {
		this.$nextTick(() => {
			this.$emit('register-map', this.$refs.map);
		});
	},
	props: {
		height: {
			type: [Number,String],
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
		}
	}
}
</script>

<style>

</style>