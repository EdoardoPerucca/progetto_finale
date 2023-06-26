<script>

import { store } from '../store';
import axios from 'axios';

export default {
    name: 'Cart',

    data() {
        return {
            store,


            first_name: '',
            last_name: '',
            address: '',
            email: '',

        }
    },

    mounted() {

        this.getRestaurantId();
        this.getRestaurantName();

    },

    methods: {

        getRestaurantId() {

            // this.store.actualRestaurantId;
            this.store.actualRestaurantIdFromLocalStorage = localStorage.getItem('actualId');
            // console.log(this.store.actualRestaurantIdFromLocalStorage);

        },

        getRestaurantName() {

            this.store.restaurantNameFromLocalStorage = localStorage.getItem('restaurantName');
            // console.log(this.store.restaurantNameFromLocalStorage);

        },

        pushIntoOrder() {

            const order = {

                first_name: store.first_name,
                last_name: store.last_name,
                address: store.address,
                email: store.email,
                total: this.store.totalFromLocalStorage,
                number: this.makeNumber(20),
                status: 1,
                dishes: this.store.cartFromLocalStorage,

            };

            if (this.store.order.length === 0) {

                this.store.order.push(order);

            } else {

                Object.assign(this.store.order[0], order);

            };

            localStorage.setItem('order', JSON.stringify(this.store.order));

            return location.replace('/restaurants/' + store.restaurantNameFromLocalStorage + '/cart/' + store.cartFromLocalStorage[0].id);

        },

        clearCart() {

            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('id');
            localStorage.removeItem('slug');
            localStorage.removeItem('order');
            localStorage.removeItem('restaurantName');

            return location.replace('/restaurant');

        },

        makeNumber(length) {

            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;

            let counter = 0;

            while (counter < length) {

                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                counter += 1;

            };
            
            return result;
        },

    }
}
</script>


<template>

    <router-link class="btn btn-primary m-3" :to="{name: 'restaurant'}">Torna ai Ristoranti</router-link>

    
    <h2 class="text-center">
        {{ this.store.restaurantNameFromLocalStorage }}
    </h2>


    <div  class="container flex justify-content-center">

        <form class="mt-5" @submit.prevent="pushIntoOrder">
            <div class="mb-3">
                <label for="first_name" class="form-label">*Nome</label>
                <input v-model="store.first_name" type="text" class="form-control" id="first_name" aria-describedby="emailHelp" required>
            </div>
            <div class="mb-3">
                <label for="last_name" class="form-label">*Cognome:</label>
                <input v-model="store.last_name" type="text" class="form-control" id="last_name" required>
            </div>
            <div class="mb-3">
                <label for="address" class="form-label">*Indirizzo:</label>
                <input v-model="store.address" type="text" class="form-control" id="address" required>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">*Email</label>
                <input v-model="store.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
                <div id="emailHelp" class="form-text">Non condivideremo mai la tua mail con altre persone.</div>
            </div>
            <table class="table">
                <thead class="text-center">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Prezzo</th>
                        <th scope="col">Quantità</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr  v-for="(dish, index) in this.store.cartFromLocalStorage" :key="index">
                        <td>{{ dish.name }}</td>
                        <td>€ {{dish.price.toFixed(2)}}</td>
                        <td >{{ dish.quantity }}</td>
                    </tr>
                    <tr>
                        <th>Totale</th>
                        <td v-if="this.store.cartFromLocalStorage.length == 0 || this.store.restaurantIdFromLocalStorage == this.store.cartFromLocalStorage[0].restaurant_id || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">€ {{ this.store.totalFromLocalStorage.toFixed(2) }}</td>
                        <td v-else>€ 0.00</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center">
                <button type="submit" class="btn btn-primary">Procedi all'ordine</button>
                <router-link class="ms-2 btn btn-danger" :to="{name: 'restaurant'}" @click="clearCart()">Elimina Carrello</router-link>
            </div>
        </form>

    </div>

</template>


<style lang="scss" scoped>
    
    .flex {
        display: flex;
        gap: 30px;
        
        form {
            flex-grow: 1;
        }

    }
    
</style>