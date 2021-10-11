<template>
<v-container>
  <v-row justify="center" align="center" >
    <v-card flat>
      <v-img src="/hooli.jpg" max-height="300" max-width="300" style="border-radius: 50%"></v-img>
      <v-container>
        <v-row justify="center">
          <v-card-title>
            Cycling made safe
          </v-card-title>
        </v-row>
      </v-container>
      
    </v-card>
    
  </v-row>
  <v-row justify="center" align="center">
    <v-col md="8">
      <v-card shaped>
        <v-card-text>
          {{fakeText}}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>  
  <v-row justify="center" align="center">
    <v-col md="8">
        <h2 style="text-align: center">Routes that avoid accidents</h2>
        <v-row justify="center" class="ma-2">
          <Map> </Map>
        </v-row>
    </v-col>
  </v-row>
  <v-row justify="center" align="center">
    <v-col md="8">
      <v-card shaped>
        <v-card-text>
          {{fakeText}}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
  
</template>

<script>
import Map from '~/components/Map.vue'
export default {
  components: { Map },
  mounted(){
    console.log(this.$L)
  },
  data(){
    return {
      fakeText: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
    }
  }
}
</script>
