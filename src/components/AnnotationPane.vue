<script setup>
    import JsonEditorVue from 'json-editor-vue'
</script>

<template>
    <div class="h-100">
        <JsonEditorVue v-model="value" class="h-100" mode="text"></JsonEditorVue>
        <button @click="updateAnnoataion" type="button" class="btn btn-success w-100">Save</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AnnotationPane',
    props: ['timelineId'],
    data(){
        return{
            value: '',
        }
    },
    watch:{
        timelineId: function(id){
            let self = this
            axios.get('/api/annotations/' + id + '/').then(function(response){
                self.value = response.data
            })
        }
    },
    methods:{
        updateAnnoataion(){
            let self = this
            axios.put('/api/annotations/' + self.timelineId + '/', self.value).then(function(response){
                console.log('annotation updated!')
            })
        }
    }
}
</script>