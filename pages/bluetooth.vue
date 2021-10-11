<template>
    <v-container>
        <v-row justify="center">
            <v-btn @click="connect()">Connect</v-btn>
        </v-row>
    </v-container>
</template>

<script>
export default {
    methods:{
        async connect(){
            try {
                console.log(window.navigator)
                let device = await window.navigator.bluetooth.requestDevice({
                    acceptAllDevices: true
                });
                console.log(device);
                
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>