<script setup>
    import JsonEditorVue from 'json-editor-vue'
</script>

<template>
    <div class="d-flex flex-column h-75">
        <JsonEditorVue v-model="value" class="flex-grow-1" mode="text"></JsonEditorVue>
        <button @click="updateAnnoataion" type="button" class="mt-2 btn btn-success flex-grow-0">Save</button>
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
                self.$emit('onUpdate')
            })
        }
    }
}
</script>