<script>

import { effect } from "vue";
import {store} from "../store.js";


export default {
    data() {
        return {

            store,

        }
    },

    props: {
        dish: Object,
    },

    mounted() {

    },

    methods: {
        getImage(){

           let  path = "https://static.vecteezy.com/ti/vettori-gratis/p1/5359703-cibo-icone-pixel-perfetto-illustrazione-vettoriale.jpg";

            if (this.dish.cover_image == path) {

                return path;

            } else {

                return 'http://127.0.0.1:8000/storage/' + this.dish.cover_image;
                
            }
        },

        addToCart(dish) {

            // const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || '[]');

            const existingItem = this.store.cartFromLocalStorage.find(item => item.id === dish.id);


            let singlePrice = parseFloat(dish.price);

            if (existingItem) {
                existingItem.quantity++;
                this.store.totalFromLocalStorage += parseFloat(singlePrice.toFixed(2));
                this.store.totalFromLocalStorage = parseFloat(this.store.totalFromLocalStorage.toFixed(2));

                localStorage.setItem('cart', JSON.stringify(this.store.cartFromLocalStorage));
                localStorage.setItem('total', JSON.parse(this.store.totalFromLocalStorage));


                
            } else {

                // console.log(dish);

                this.store.cartFromLocalStorage.push({
                    restaurant_id: dish.restaurant_id,
                    restaurant_name: this.store.restaurantName,
                    id: dish.id,
                    name: dish.name,
                    price: singlePrice,
                    quantity: 1,
                });
                
                this.store.dishIds.push(dish.id);
                this.store.totalFromLocalStorage += singlePrice;
                this.store.totalFromLocalStorage = parseFloat(this.store.totalFromLocalStorage.toFixed(2));
                
                localStorage.setItem('cart', JSON.stringify(this.store.cartFromLocalStorage));
                localStorage.setItem('total', JSON.parse(this.store.totalFromLocalStorage));
                localStorage.setItem('id', JSON.parse(this.store.actualRestaurantId));
                localStorage.setItem('slug', JSON.stringify(this.store.restaurantSlug));

            }

            // console.log(this.store.cartFromLocalStorage);
        },

    },
}


</script>


<template>

    <div class="card py-3 flex-row-reverse my-4">

        <img :src="getImage()" class="card-img-top" alt="...">

        <div class="card-body">

            <h5 class="card-title">{{ dish.name }}</h5>
            <ul class="list-group-flush">

                <li class="list-group-item"><b>Descrizione: </b>{{ dish.description }}</li>
                <li class="list-group-item"><b>Intolleranze: </b>{{ dish.intolerance }}</li>
                <li class="list-group-item"><b>Prezzo: </b> {{ dish.price }} €</li>
                <li class="list-group-item"><b>Disponibilità: </b> {{ dish.availability ? 'Disponibile' : 'Non Disponibile' }}</li>

                <a v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id" class="btn mt-3" :class="dish.availability ? 'btn-primary' : 'disabled btn-danger'" @submit.prevent="" @click="addToCart(dish, index)">Aggiungi al carrello</a>
                <a v-else class="btn btn-danger mt-3 disabled" @submit.prevent="" @click="addToCart(dish, index)" >Aggiungi al carrello</a>
                
            </ul>

        </div>

    </div>

</template>


<style lang="scss" scoped>
    
    .card {

        img {

            height: 200px;
            width: 200px;
            object-fit: cover;

        }

    }

</style>