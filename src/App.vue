<script setup>
import { RouterLink, RouterView } from "vue-router";
import Timeline from "./components/Timeline.vue";
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <Timeline v-for="timeline in timelines"
          :key="timeline.id"
          :timeline="timeline"
        ></Timeline>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data(){
    return{
      timelines: []
    }
  },
  mounted(){
    let self = this;

    axios.get('/api/timelines/').then(function(response){
      console.log(response.data[0])
      self.timelines = response.data
    })
  }
}
</script>

<style scoped>

</style>
