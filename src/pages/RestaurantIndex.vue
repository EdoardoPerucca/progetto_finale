<script>
import axios from 'axios';

import RestaurantCard from '../components/RestaurantCard.vue';


export default {
    name: 'RestaurantCard',
    data() {
        return {
            restaurantApi: 'http://127.0.0.1:8000/api/resturant',

            restaurants: [],
        }
    },

    component: {
        RestaurantCard,
    },

    created() {
        this.getRestaurant(this.restaurantApi)
    },

    methods: {
        getRestaurant(restaurantApi) {
            axios.get(restaurantApi).then(response => {
                this.restaurants = response.data.results.data;
            })
        }

    },
}
</script>

<template>
    <div v-for="restaurant in this.restaurants">
        <RestaurantCard :restaurant="restaurant"></RestaurantCard>
    </div>
</template>

<style lang="scss" scoped></style>