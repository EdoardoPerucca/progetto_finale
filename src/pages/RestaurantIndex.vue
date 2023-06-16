<script>
import axios from 'axios';

import RestaurantCard from '../components/RestaurantCard.vue';


export default {
    data() {
        return {
            restaurantApi: 'http://127.0.0.1:8000/api/restaurants?page=2',

            restaurants: [],

            pagination: [],
        }
    },

    components: {
        RestaurantCard,
    },

    created() {
        this.getRestaurant(this.restaurantApi)
    },

    methods: {
        getRestaurant(restaurantApi) {
            axios.get(restaurantApi).then((response) => {

                this.restaurants = response.data.results.data;

                this.pagination = response.data.results;

                console.log(response.data.results.data);
            })
        }

    },
}
</script>

<template>

    <div id="container" class="container d-flex flex-row flex-wrap justify-content-around mt-3 ">
        <RestaurantCard class="my-3" :restaurant="restaurant" v-for="restaurant in restaurants"></RestaurantCard>
    </div>

    <div class="container d-flex justify-content-center mt-5 gap-1 ">

        <button @click="getRestaurant(link.url)" :class="link.active ? 'active' : '' "  v-for="link in pagination.links" class="btn btn-secondary" v-html="link.label"></button>

    </div>

</template>

<style lang="scss" scoped>
    
</style>