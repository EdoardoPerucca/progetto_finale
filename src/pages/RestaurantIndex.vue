<script>
import axios from 'axios';

import RestaurantCard from '../components/RestaurantCard.vue';


export default {
    data() {
        return {
            restaurantApi: 'http://127.0.0.1:8000/api/restaurants?page=1&type_id=',

            restaurants: [],

            pagination: [],

            types: [],

            selectedType: '',

            restaurantFound: true,

            errorMessage: ''
        }
    },

    components: {
        RestaurantCard,
    },

    created() {
        this.getRestaurant()
    },

    methods: {
        getRestaurant() {
            axios.get(this.restaurantApi + this.selectedType).then((response) => {
                
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

        <form @submit.prevent="" action="" >
            <select name="type_id" class="form-select my-3" v-model="selectedType" @change="getRestaurant()">
                <option value="">Tutti i ristoranti</option>
                <option v-for="(type, index) in types" :key="index" :value="type.id">{{ type.name }}</option>
            </select>
        </form>

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