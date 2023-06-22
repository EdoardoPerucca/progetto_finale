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


        // BRAINTREE
        var button = document.querySelector('#submit-button');

        braintree.dropin.create({
        authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
        selector: '#dropin-container'
        }, function (err, instance) {
        button.addEventListener('click', function () {

            instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server

                console.log(err.name);

            });
        })
        });

    },

    methods: {

        placeOrder() {

            const order = {
                dishes: this.store.cartFromLocalStorage,
                total:this.store.totalFromLocalStorage,
                status:1,
                number:100,
                first_name:this.first_name,
                last_name:this.last_name,
                address:this.address,
                email:this.email,
            };
            console.log(order)
            axios.post('http://127.0.0.1:8000/api/orders', order)
            .then(response => {
                console.log('Ordine effettuato:', response.data);
                // store.orderFromLocalStorage = [];
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il salvataggio dell\'ordine:', error);
            });
        },

        getRestaurantId() {

            // this.store.actualRestaurantId;
            this.store.actualRestaurantIdFromLocalStorage = localStorage.getItem('actualId');
            console.log(this.store.actualRestaurantIdFromLocalStorage);

        },

        getRestaurantName() {

            this.store.restaurantNameFromLocalStorage = localStorage.getItem('restaurantName');
            console.log(this.store.restaurantNameFromLocalStorage);

        },

        pushIntoOrder() {

            const order = {
                first_name: this.first_name,
                last_name: this.last_name,
                address: this.address,
                email: this.email,
                total: this.store.totalFromLocalStorage.toFixed(2),
                number: '1323432432432',
                status: 'Confermato',
                dishes: this.store.cartFromLocalStorage,
            };

            if (this.store.order.length === 0) {
                this.store.order.push(order);
            } else {
                Object.assign(this.store.order[0], order);
            }

            localStorage.setItem('order', JSON.stringify(this.store.order));

            console.log(this.store.order);

        },

        clearCart() {

            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('id');
            localStorage.removeItem('slug');
            localStorage.removeItem('order');
            localStorage.removeItem('restaurantName');

            return location.replace('http://localhost:5173/restaurant');

        },

        

    }
}
</script>


<template>

    <router-link class="btn btn-primary m-3" :to="{name: 'restaurant'}">Torna ai Ristoranti</router-link>

    <h2 class="text-center">

        {{ this.store.restaurantNameFromLocalStorage }}

    </h2>

    <!-- v-if="this.store.cartFromLocalStorage.length === 0 || this.store.actualRestaurantIdFromLocalStorage == this.store.restaurantIdFromLocalStorage"
     -->
    <div  class="container flex justify-content-center">

            <form class="mt-5" @submit.prevent="pushIntoOrder">
                <div class="mb-3">
                    <label for="first_name" class="form-label">*Nome</label>
                    <input v-model="first_name" type="text" class="form-control" id="first_name" aria-describedby="emailHelp" required>
                </div>
                <div class="mb-3">
                    <label for="last_name" class="form-label">*Cognome:</label>
                    <input v-model="last_name" type="text" class="form-control" id="last_name" required>
                </div>
                <div class="mb-3">
                    <label for="address" class="form-label">*Indirizzo:</label>
                    <input v-model="address" type="text" class="form-control" id="address" required>
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">*Email</label>
                    <input v-model="email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
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
                    <button @click="placeOrder()" type="submit" class="btn btn-primary">Procedi all'ordine</button>
                    <router-link class="ms-2 btn btn-danger" :to="{name: 'restaurant'}" @click="clearCart()">Elimina Carrello</router-link>
                </div>
            </form>

    </div>


    <div class="container" id="dropin-container"></div>
    <div class="d-flex justify-content-center">
        <button id="submit-button" class=" button button--small button--green">Purchase</button>
    </div>

    <!-- <div v-else>CARRELLO NON TROVATO. CI HAI PROVATO PERO' BIRBANTELLO</div> -->
</template>


<style lang="scss" scoped>
    
    .flex {
        display: flex;
        gap: 30px;
        
        form {
            flex-grow: 1;
        }



    }

    .button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}
    
</style>