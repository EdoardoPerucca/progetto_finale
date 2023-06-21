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

            this.store.actualRestaurantId = response.data.results.id;

            localStorage.setItem('slug', JSON.stringify(this.restaurant.slug));

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

            // const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

            const existingItem = this.store.cartFromLocalStorage.find(item => item.id === dish.id);


            if (existingItem) {
                
                if (existingItem.quantity === 1) {
                    this.store.cartFromLocalStorage.splice(this.store.cartFromLocalStorage.indexOf(existingItem), 1);
                } else {
                    existingItem.quantity--;
                }

                this.store.totalFromLocalStorage -= parseFloat(dish.price);
                this.store.totalFromLocalStorage = parseFloat(this.store.totalFromLocalStorage.toFixed(2));

                localStorage.setItem('cart', JSON.stringify(this.store.cartFromLocalStorage));
                localStorage.setItem('total', JSON.stringify(this.store.totalFromLocalStorage));

            }

        },

        clearCart() {

            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('id');

            return location.reload();

        },

        // placeOrder() {
        //     const order = {
        //         dishes: this.store.cart
        //     };
        //     console.log(order)
        //     axios.post('http://127.0.0.1:8000/api/orders', order)
        //     .then(response => {
        //         console.log('Ordine effettuato:', response.data);
        //         this.cart = [];
        //     })
        //     .catch(error => {
        //         console.error('Si è verificato un errore durante il salvataggio dell\'ordine:', error);
        //     });
        // }
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


        <span v-if="this.store.cartFromLocalStorage.length == 0"></span>
        <span v-else-if="this.store.actualRestaurantId != this.store.cartFromLocalStorage[0].restaurant_id" class="ps-1 pb-4 text-center d-flex justify-content-center fs-2 text-danger">Hai già un ordine in un altro Ristorante!</span>

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
                <tr  v-for="(dish, index) in this.store.cartFromLocalStorage" :key="index">
                    <td v-if="this.restaurant.id == dish.restaurant_id">{{ dish.name }}</td>
                    <td v-if="this.restaurant.id == dish.restaurant_id">€ {{dish.price}}</td>
                    <td v-if="this.restaurant.id == dish.restaurant_id">{{ dish.quantity }}</td>
                    <td v-if="this.restaurant.id == dish.restaurant_id">
                        <button class="btn btn-sm btn-danger" @click="removeFromCart(dish)">
                            Rimuovi
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>Totale</th>
                    <td v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">€ {{ this.store.totalFromLocalStorage.toFixed(2) }}</td>
                    <td v-else>€ 0.00</td>
                    <td></td>
                    <td>
                        <!-- <button class="btn btn-sm btn-danger" @click="placeOrder()">
                            Paga
                        </button> -->

                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Vedi Carrello
                        </button>
                        
                        <button v-if="this.store.cartFromLocalStorage.length != 0" type="button" class="ms-2 btn btn-danger" @click="clearCart()">
                            Elimina Carrello
                        </button>
                        <button v-else type="button" class="ms-2 btn btn-danger disabled">
                            Elimina Carrello
                        </button>

                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Carrello</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                
                <table v-if="this.store.cartFromLocalStorage.length != 0" class="table mb-4 container">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Prezzo</th>
                            <th scope="col" class="text-center">Quantità</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(dish, index) in this.store.cartFromLocalStorage" :key="index">
                            <td v-if="this.restaurant.id == dish.restaurant_id">{{ dish.name }}</td>
                            <td v-if="this.restaurant.id == dish.restaurant_id">€ {{dish.price}}</td>
                            <td v-if="this.restaurant.id == dish.restaurant_id" class="text-center">{{ dish.quantity }}</td>
                        </tr>
                        <tr>
                            <th>Totale</th>
                            <td v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">€ {{ this.store.totalFromLocalStorage.toFixed(2) }}</td>
                            <td v-else>€ 0.00</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    Il carrello è vuoto!
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                <button v-if="this.store.cartFromLocalStorage.length != 0 && this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                    <router-link :to="{name: 'cart'}" class="text-white text-decoration-none">Checkout</router-link>
                </button>

                <button v-else type="button" class="btn btn-primary" data-bs-dismiss="modal" disabled>
                    <router-link :to="{name: 'cart'}" class="text-white text-decoration-none">Checkout</router-link>
                </button>
            </div>
            </div>
        </div>
        </div>

        
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