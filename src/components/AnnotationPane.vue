<script setup>
    import JsonEditorVue from 'json-editor-vue'
</script>

<template>
    <div class="h-100">
        <JsonEditorVue v-model="value" class="h-100" ></JsonEditorVue>
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
    }
}
</script>