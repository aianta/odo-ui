<script setup>
import { RouterLink, RouterView } from "vue-router";
import Timeline from "./components/Timeline.vue";
import AnnotationPane from "./components/AnnotationPane.vue"
import JsonEditorVue from 'json-editor-vue';
</script>

<template>
  <div class="container-fluid h-100">
    <div class="row overflow-scroll h-50">
      <div class="col">
        <h1>Timelines</h1>
        <Sortable
        :list="timelines"
        item-key="id"
        tag="div"
        >
        <template #item="{element, index}">
          <!-- <p class="draggable" :key="element.id">{{ element.id }}</p> -->
          <Timeline 
          :key="element.id"
          :timeline="element"
          :selected="selected"
          :selectedElement="selectedElementIndex"
          :index="index"
          @click="selectTimeline(element.id)"
          @onElement="selectElement"
          class="mt-2 draggable"
          ref="timelines"
          ></Timeline>
        </template>

        </Sortable>

      </div>

    </div>
    <div class="row">
      <div class="col d-flex  flex-column">
        <h1>Details</h1>
        <JsonEditorVue class="flex-fill overflow-scroll" style="min-height: 35rem; max-height: 35rem;" v-model="selectedJSON"></JsonEditorVue>
      </div>
      <div class="col d-flex  flex-column">
        <h1>Timeline Annotation</h1>
        <AnnotationPane class="flex-fill" :timelineId="selected" @onUpdate="updateTimelines"></AnnotationPane>
      </div>

    </div>
  </div>

</template>

<script>
import axios from 'axios'
import {Sortable} from 'sortablejs-vue3'

export default {
  name: 'App',
  data(){
    return{
      testItems: [{id:1},{id:2}],
      timelines: [],
      selected: undefined,
      selectedElementIndex: undefined,
      selectedJSON: ''
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
    updateTimelines(){
      this.$refs.timelines.forEach(
          timeline=>timeline.getName()
      )
    }, 
    selectTimeline(id) {
      this.selected = id
      let t = this.timelines.find(timeline=>timeline.id === this.selected).data
      console.log('timeline:')
      console.log(t)
      if(this.selectedElementIndex !== undefined && this.selectedElementIndex !== -1){
        this.selectedJSON = t[this.selectedElementIndex]
      }else{
        this.selectedJSON = t
      }

    },
    selectElement(index){
      this.selectedElementIndex = index 
    }
  }

  
}
</script>

<style scoped>

</style>
