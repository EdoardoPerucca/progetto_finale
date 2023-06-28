<script>

import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard.vue';

export default {
    data() {
        return {

            // API Url for Axios Call
            restaurantApi: 'http://127.0.0.1:8000/api/restaurants?page=',

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

            lastPage: '',

            currentPage: 1,
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
            axios.get(url + this.currentPage + typeUrl).then((response) => {

                // LOADER
                this.isLoading = false;

                // IF Axios response is 200...
                if (response.data.success == true) {

                    // if there are restaurants with that Type in the filter
                    this.restaurantFound = true;

                    // ALL Restaurants
                    this.restaurants = response.data.results.data;

                    // MANAGES THE PAGINATION LINKS
                    this.pagination = response.data.results;

                    // GET ALL TYPES IN DB
                    this.types = response.data.types;

                    // DOMENICO STAI ZITTO
                    this.lastPage = response.data.results.last_page;

                } else {

                    // if there are NO restaurants with that Type in the filter
                    this.restaurantFound = false;

                    this.errorMessage = response.data.error

                };
            });
        },

        updatePage(index) {
            this.currentPage = index + 1;
            this.getRestaurant(this.restaurantApi);
        },

    },
}
</script>

<template>
    <div class="background">
        <div class="container">
            <div class="cover">
                <div class="row">
                    <!-- TYPES FILTER -->
                    <div class="col-md-3 py-4">
                        <h3 class="text-white fw-bold text-center">Filtra</h3>
                        <form @submit.prevent="">
                            <ul class="list-group d-flex gap-3">
                                <li class="list-group-item rounded-4 border-top-0 border-start-0 border-end-0 bg-dark text-white"
                                    v-for="(type, index) in types" :key="index">
                                    <div class="form-check">
                                        <input :value="type.id" class="form-check-input checkbox-filter" type="checkbox"
                                            id="type_id" name="types_id[]" v-model="selectedType">
                                        <label for="type_id" class="form-check-label">{{ type.name }}</label>
                                    </div>
                                </li>
                            </ul>
                            <div class="text-center">
                                <button class="btn btn-restaurant mt-4" @click="getRestaurant(restaurantApi)"
                                    type="submit">Filtra</button>
                            </div>
                        </form>
                    </div>

                    <!-- RESTAURANT CARD -->
                    <div class="col-md-9">
                        <div v-if="!isLoading" id="container" class="d-flex flex-row flex-wrap justify-content-around mt-3">
                            <RestaurantCard v-if="restaurantFound" class="my-3" :restaurant="restaurant"
                                v-for="restaurant in restaurants"></RestaurantCard>
                                <div style="max-height: 600px; height: 600px;" class="pippo" v-else>
                                   <span class="alert alert-danger">{{ errorMessage }}</span> 
                                </div>
                            
                        </div>

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
                        <div class="button-section">

                            <div @click="updatePage(index)" v-for="(pages, index) in lastPage" class="bullet"
                                :class="(index + 1) == currentPage ? 'active' : ''"></div>

                        </div>
                        <!-- /PAGINATION -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.background {
    background-color: #ffcb6a;
    background-image: url(https://i.ibb.co/fM5MH76/pngegg.png);
    background-size: cover;
    position: relative;
}

.container {
    background-color: rgba(0, 0, 0, 0.01);
}

.button-section {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 1em;

    // flex
    button,
    a {
        font-size: 1em;
    }

    .bullet {
        margin-bottom: 2em;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 3px solid #dd3f3f;
        cursor: pointer;

        &.active {
            background-color: #212529;
        }
    }
}

.list-group-item {
    border-bottom: 3px solid #dd3f3f;
    box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.5);
}

.btn-restaurant {
    border: none;
    border-radius: 50px;
    background-color: #212529;
    color: white;
    font-weight: bold;
    border-bottom: 3px solid #dd3f3f;
    transition: all .6s;
    box-shadow: 0px 4px 8px 0px rgb(0, 0, 0);

    &:hover {
        cursor: pointer;
        background-color: #dd3f3f;
        border-bottom: 3px solid #212529;
    }
}

.pippo {
    display: flex;
    align-items: center;
}
</style>