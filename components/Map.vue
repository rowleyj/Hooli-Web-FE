<template>
    <div id="map-wrap" style="height: 350px; width: 350px">
        <l-map :zoom="10" :center="[43.2464418,-79.8277591]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></l-tile-layer>
            <l-marker :lat-lng="[43.2464418,-79.8277591]"></l-marker>
        </l-map>
    </div>    
</template>

<script>
export default {

}
</script>

<style>

</style>