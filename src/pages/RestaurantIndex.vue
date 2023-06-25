<script>

import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
    data() {
        return {

            // API Url for Axios Call
            restaurantApi: 'http://127.0.0.1:8000/api/restaurants?page=1',

            // ALL RESTAURANTS IN DB
            restaurants: [],

            // MANAGES THE PAGINATION LINKS
            pagination: [],

            // ALL DIFFERENT RESTAURANTS TYPES (PIZZERIA,OSTERIA,FAST FOOD...)
            types: [],

            // TYPES FILTER
            selectedType: [],

            // IF there are NO restaurants [] with that TYPE in the Filter it return NOT FOUND
            restaurantFound: true,

            // LOADER UNTIL Axios Call is not FINISH
            isLoading: true,

            // errorMessage: '',
        }
    },

    components: {
        RestaurantCard,
    },

    created() {
        this.getRestaurant(this.restaurantApi);
    },

    methods: {

        // return ALL restaurants in DB
        getRestaurant(url) {

            // IF filter
            let typeUrl = '';

            for (let i = 0; i < this.selectedType.length; i++) {
                
                // it return the complete API URL for the Axios call, with filter too
                typeUrl = typeUrl + '&type_id[]=' + this.selectedType[i];

            };
            
            // AXIOS call for get all RESTAURANTS
            axios.get(url + typeUrl ).then((response) => {

                // LOADER
                this.isLoading = false;
                
                // IF Axios response is 200...
                if(response.data.success == true){
                    
                    // if there are restaurants with that Type in the filter
                    this.restaurantFound = true;
                    
                    // ALL Restaurants
                    this.restaurants = response.data.results.data;
    
                    // MANAGES THE PAGINATION LINKS
                    this.pagination = response.data.results;
                    
                    // GET ALL TYPES IN DB
                    this.types = response.data.types;
                                       
                }else{

                    // if there are NO restaurants with that Type in the filter
                    this.restaurantFound = false;

                    // this.errorMessage = response.data.error

                };
            });
        },

    },
}
</script>


<template>

    <!-- TYPES FILTER -->
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
    <!-- /TYPES FILTER -->


    <!-- IF Axios call is complete + RESTAURANT CARD -->
    <div v-if="!isLoading" id="container" class="container d-flex flex-row flex-wrap justify-content-around mt-3 ">
        <RestaurantCard v-if="restaurantFound" class="my-3" :restaurant="restaurant" v-for="restaurant in restaurants"></RestaurantCard>
        <span class="alert alert-danger " v-else>{{ errorMessage }}</span>
    </div>
    <!-- /IF Axios call is complete + RESTAURANT CARD -->


    <!-- OMELETTE LOADER -->
    <div v-else class="pan-loader">
        <div class="loader"></div>
        <div class="pan-container">
            <div class="pan"></div>
            <div class="handle"></div>
        </div>
        <div class="shadow"></div>
    </div>
    <!-- /OMELETTE LOADER -->


    <!-- PAGINATION -->
    <div class="container d-flex justify-content-center mt-5 gap-1 ">
        <button @click="getRestaurant(link.url)" :class="link.active ? 'active' : '' "  v-for="link in pagination.links" class="btn btn-secondary" v-html="link.label"></button>
    </div>
    <!-- /PAGINATION -->

</template>


<style lang="scss" scoped>
    
</style>