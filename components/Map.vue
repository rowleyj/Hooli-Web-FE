<template>
    <div id="map-wrap" :style="mapStyle">
        <l-map :zoom="zoom" :center="[centerLat, centerLong]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[centerLat,centerLong]"></l-marker>
        </l-map>
    </div>    
</template>

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    computed: {
        mapStyle(){
            return `height: ${this.height}px; width: ${this.width}px; z-index: 1`
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
    },
    props: {
        height: {
            type: Number, 
            default: 350
        },
        width: {
            type: Number,
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
        }
    }
}
</script>

<style>

</style>