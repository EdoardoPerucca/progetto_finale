<script>
import axios from 'axios';

import RestaurantCard from '../components/RestaurantCard.vue';


export default {
    data() {
        return {
            restaurantApi: 'http://127.0.0.1:8000/api/restaurants?page=2',

            restaurants: [],

            pagination: [],

            types: [],
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
                
                // console.log(response.data.types);
                this.restaurants = response.data.results.data;

                this.pagination = response.data.results;

                this.types = response.data.types;

            })
        }

    },
}
</script>

<template>
    <div class="container">

        <form action="" method="post">
            <select class="form-select my-3" >
                <option value="">Seleziona</option>
                <option v-for="(type, index) in types" :key="index" value="">{{ type.name }}</option>
            </select>
        </form>
        
    </div>

    <div id="container" class="container d-flex flex-row flex-wrap justify-content-around mt-3 ">
        <RestaurantCard class="my-3" :restaurant="restaurant" v-for="restaurant in restaurants"></RestaurantCard>
    </div>

    <div class="container d-flex justify-content-center mt-5 gap-1 ">

        <button @click="getRestaurant(link.url)" :class="link.active ? 'active' : '' "  v-for="link in pagination.links" class="btn btn-secondary" v-html="link.label"></button>

    </div>

</template>

<style lang="scss" scoped>
    
</style>