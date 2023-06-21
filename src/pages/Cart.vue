<script>

import { store } from '../store';

export default {
    name: 'Cart',

    data() {
        return {
            store,
        }
    },

    mounted() {

        console.log(this.store.restaurantSlugFromLocalStorage)

    },

    methods: {

        clearCart() {

            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('id');
            localStorage.removeItem('slug');

            return location.replace('http://localhost:5174/restaurant');

        },

    }
}
</script>


<template>

    <router-link class="btn btn-primary m-3" :to="{name: 'restaurant'}">Torna ai Ristoranti</router-link>

    <div class="container flex justify-content-center">

            <form class="mt-5">
                <div class="mb-3">
                    <label for="first_name" class="form-label">Nome</label>
                    <input type="text" class="form-control" id="first_name" aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">Cognome:</label>
                    <input type="text" class="form-control" id="last_name" required>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">Indirizzo:</label>
                    <input type="text" class="form-control" id="address" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
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
                        <td>€ {{dish.price}}</td>
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