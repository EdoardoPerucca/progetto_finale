<script>
import axios from 'axios';

import RestaurantCard from '../components/RestaurantCard.vue';


export default {
    data() {
        return {
            restaurantApi: 'http://127.0.0.1:8000/api/restaurants?page=1',

            restaurants: [],

            pagination: [],

            types: [],

            selectedType: [],

            restaurantFound: true,

            errorMessage: ''
        }
    },

    components: {
        RestaurantCard,
    },

    created() {
        this.getRestaurant(this.restaurantApi);
    },

    methods: {

        getRestaurant(url) {

            let typeUrl = ''

            for (let i = 0; i < this.selectedType.length; i++) {
                
                typeUrl = typeUrl + '&type_id[]=' + this.selectedType[i]
            }
                  
            axios.get(url + typeUrl ).then((response) => {
                
                if(response.data.success == true){
                    
                    this.restaurantFound = true
                    
                    this.restaurants = response.data.results.data;
    
                    this.pagination = response.data.results;
                    
                    this.types = response.data.types;
                                       
                }else{
                    this.restaurantFound = false
                    this.errorMessage = response.data.error
                }
            })
        }

    },
}
</script>

<template>

    <div class="container">
        <div class="dropdown text-center my-3">
            <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Filtra per tipologia
            </button>
            <ul class="dropdown-menu text-center ">
                <form @submit.prevent="">
                    <div v-for="(type, index) in types" :key="index">
                        <label  for="type_id">{{type.name}}</label>
                        <input :value="type.id" type="checkbox" name="types_id[]" id="type_id" v-model="selectedType">
                    </div>
                    <button class="btn btn-outline-success" @click="getRestaurant(restaurantApi)" type="submit">Filtra</button>
                </form>
            </ul>
        </div>
    </div>

    <div id="container" class="container d-flex flex-row flex-wrap justify-content-around mt-3 ">
        <RestaurantCard v-if="restaurantFound" class="my-3" :restaurant="restaurant" v-for="restaurant in restaurants"></RestaurantCard>
        <span class="alert alert-danger " v-else>{{ errorMessage }}</span>
    </div>

    <div class="container d-flex justify-content-center mt-5 gap-1 ">

        <button @click="getRestaurant(link.url)" :class="link.active ? 'active' : '' "  v-for="link in pagination.links" class="btn btn-secondary" v-html="link.label"></button>

    </div>

</template>

<style lang="scss" scoped>
    
</style>