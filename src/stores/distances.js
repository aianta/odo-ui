import {defineStore} from 'pinia'
import axios from 'axios'

export const useDistanceStore = defineStore('distances', {
    state: () => ({data:undefined}),
    getters: {
        getDistancesById: (state) => {
             return (id) => state.data[id]   
        }
    },
    actions:{
        loadDistances(){
            let self = this
            axios.get('/api/actions/computeDistances').then(function(response){
                self.data = response.data
            })
        }
    }
})