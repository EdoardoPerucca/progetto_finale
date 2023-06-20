<script>
import axios from 'axios';
import {store} from "../store.js";

import DishCard from '../components/DishCard.vue';

export default {
    data() {
        return {

            store,
            
            restaurant: {},

            url: 'http://127.0.0.1:8000/',

            apiURL: 'http://127.0.0.1:8000/api/restaurants/',

        }
    },

    mounted() {

        const url = this.apiURL + this.$route.params.slug;

        axios.get(url).then((response) => {

            console.log(response.data.results);

            this.restaurant = response.data.results;

            document.title = 'Restaurant: ' + this.restaurant.activity_name;

        })

    },

    components: {
        DishCard,
    },

    methods: {

        getImage(){
           let  path = 'https://static.vecteezy.com/ti/vettori-gratis/p1/5359703-cibo-icone-pixel-perfetto-illustrazione-vettoriale.jpg'
            if (this.restaurant.cover_image == path) {
                return path
            } else {

                return 'http://127.0.0.1:8000/storage/' + this.restaurant.cover_image;
                
            }
        },

        removeFromCart(dish) {

            if(this.store.cart[0].quantity == 1) {

                this.store.cart.splice(this.store.cart.indexOf(dish), 1);
                this.store.total -= parseFloat(dish.price);

            } else {

                this.store.cart[0].quantity--;
                
                this.store.total -= parseFloat(dish.price);
                
            }


        }

    }


}
</script>



<template>
    <div class="container-fluid">

        <router-link class="btn btn-primary my-3" :to="{name: 'restaurant'}">Vai indietro</router-link>

        
        <div class="card border-0 py-3 text-center">

            <img :src="getImage()" class="card-img-top" alt="...">

            <div class="card-body">

                <h5 class="card-title">{{ restaurant.activity_name }}</h5>
                <ul class="list-group-flush">

                    <li class="list-group-item"><b>Via: </b>{{ restaurant.address }}</li>
                    <li class="list-group-item"><b>Tel: </b>{{ restaurant.phone_number }}</li>
                    <li class="list-group-item"><b>Tipologia: </b>
                        <span  v-for="restaurantType in restaurant.types">
                            {{ restaurantType.name + ', ' }}
                        </span>
                    </li>
                    
                </ul>

            </div>

        </div>

        
        <h2 class="text-center py-3">Piatti:</h2>


        <div class="container py-5">

            <DishCard :dish="dish" v-for="dish in restaurant.dishes"></DishCard>
            

        </div>


        <table class="table mb-4 container">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Prezzo</th>
                    <th scope="col">Quantità</th>
                    <th scope="col">Rimuovi</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dish, index) in store.cart" :key="index">
                    <td>{{ dish.name }}</td>
                    <td>€ {{dish.price}}</td>
                    <td>{{ dish.quantity }}</td>
                    <td>
                        <button class="btn btn-sm btn-danger" @click="removeFromCart(dish)">
                            Rimuovi
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Totale</th>
                    <td>€ {{ this.store.total.toFixed(2) }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>

        

    </div>
</template>



<style lang="scss" scoped>
    
    .card {

        img {
            width: 100%;
            height: 300px;
            object-fit: contain;
        }

    }

    .container {

        max-width: 800px;
        margin: 0 auto;

    }

</style>