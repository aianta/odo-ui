<script setup>
import { RouterLink, RouterView } from "vue-router";
import Timeline from "./components/Timeline.vue";
import AnnotationPane from "./components/AnnotationPane.vue"
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Timelines</h1>
        <Timeline v-for="timeline in timelines"
          :key="timeline.id"
          :timeline="timeline"
          @click="selectTimeline(timeline.id)"
        ></Timeline>
      </div>
      <div class="col">
        <h1>Annotation</h1>
        <AnnotationPane :timelineId="selected"></AnnotationPane>
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
      timelines: [],
      selected: undefined,
    }
  },
  mounted(){
    let self = this;

    axios.get('/api/timelines/').then(function(response){
      console.log(response.data[0])
      self.timelines = response.data
    })
  },
  methods:{
    selectTimeline(id) {
      this.selected = id
    }
  }

  
}
</script>

<style scoped>

</style>
