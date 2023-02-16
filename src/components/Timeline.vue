<template>
    <div>
        <span>{{ timeline.id }}</span>
        <div class="d-flex justify-content-evenly timeline-container">
            <div class="timeline-item flex-fill" 
            v-for="entity in timeline.data">
                {{ entity.symbol }}
            </div>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Timeline',
    props: ['timeline'],
    data(){
        return {
            msg: "hello"
        }
    }
}

</script>

<style scoped>

.timeline-container{
    border: solid 2px #7a7a7a;
}
.timeline-item{
    border-left: solid 2px #7a7a7a;
    text-align: center;
}

.timeline-item:first-child{
    border: none;
}
</style>