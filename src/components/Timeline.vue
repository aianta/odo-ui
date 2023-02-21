<template>
    <div :class="'p-2 ' +  getClass()">
        <h4>{{ name !== undefined?name:timeline.id }}</h4>
        <div>
        <div class="d-flex justify-content-start timeline-container">

                <div :class="'timeline-item text-center ' + getElementClass(entity.index)" 
                    v-for="entity in timeline.data"
                    @click="selectElement(entity.index)"
                    >
                        {{ entity.symbol }} <small>{{ entity.size > 1 ?'('+entity.size+')':'' }}</small>
                </div>
           
        </div>
    </div>
    </div>

</template>

<script>
import axios from 'axios'
export default {
    name: 'Timeline',
    props: ['timeline', 'index', 'selected', 'selectedElement'],
    data(){
        return {
            name: undefined
        }
    },
    mounted(){
        this.getName()
    },
    methods:{
        getName(){
            let self = this
            axios.get('/api/annotations/' + self.timeline.id + '/').then(function(response){
                console.log('annotation')
                console.log(response.data)
                if(response.data.hasOwnProperty('name')){
                    self.name = response.data.name
                }
            })
        },
        getClass(){
            if (this.selected === this.timeline.id){
                return 'selected'
            }

            if(this.index % 2 === 0){
                return 'accent'
            }
        },
        getElementClass(myIndex){
            if(this.selectedElement === myIndex && this.selected === this.timeline.id){
                return 'selected-element'
            }
        },
        selectElement(elementIndex){
            this.$emit('onElement', elementIndex)
            this.selectedElementIndex = elementIndex
        }
    }
}

</script>

<style scoped lang="scss">
@import '@/assets/main.scss';
@import '../../node_modules/bootstrap/scss/_variables.scss';

$element-size: 75px;

.selected-element{
    background-color: $green-400;
}

.selected{
    background-color: $green-200;
}

.accent{
    background-color: $blue-100;
}

.timeline-container{
    border: solid 2px $dark;
    width: fit-content;
}
.timeline-item{
    border-left: solid 2px $dark;
    max-width: $element-size;
    min-width: $element-size;
    min-height: $element-size;
    max-height: $element-size;
    align-items: center;
    justify-content: center;
    display: flex;
}

.timeline-item:first-child{
    border: none;
}
</style>