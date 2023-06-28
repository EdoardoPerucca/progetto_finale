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
    <div class="bg">
        <router-link class="btn btn-rest m-3" :to="{ name: 'restaurant' }">Torna ai Ristoranti</router-link>

        <div class="delivery-form">
            <h3 class="text-center">
                {{ this.store.restaurantNameFromLocalStorage }}
            </h3>
            <!-- <h3 class="text-center">Inserisci i dati per la consegna</h3> -->

            <form class="mt-3" @submit.prevent="pushIntoOrder">
                <div class="orm-group mt-2">
                    <label for="first_name" class="form-label">*Nome</label>
                    <input v-model="store.first_name" type="text" class="form-control" id="first_name"
                        aria-describedby="emailHelp" required>
                </div>
                <div class="orm-group mt-2">
                    <label for="last_name" class="form-label">*Cognome:</label>
                    <input v-model="store.last_name" type="text" class="form-control" id="last_name" required>
                </div>
                <div class="orm-group mt-2">
                    <label for="address" class="form-label">*Indirizzo:</label>
                    <input v-model="store.address" type="text" class="form-control" id="address" required>
                </div>
                <div class="orm-group mt-2">
                    <label for="email" class="form-label">*Email</label>
                    <input v-model="store.email" type="email" class="form-control" id="email" aria-describedby="emailHelp"
                        required>
                    <div id="emailHelp" class="form-text"> <em> Non condivideremo mai la tua mail con altre persone.</em>
                    </div>
                </div>
                <table class="delivery-table">
                    <thead class="text-center">
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Prezzo</th>
                            <th scope="col">Quantità</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(dish, index) in this.store.cartFromLocalStorage" :key="index">
                            <td>{{ dish.name }}</td>
                            <td>€ {{ dish.price.toFixed(2) }}</td>
                            <td>{{ dish.quantity }}</td>
                        </tr>
                        <tr>
                            <th>Totale</th>
                            <td
                                v-if="this.store.cartFromLocalStorage.length == 0 || this.store.restaurantIdFromLocalStorage == this.store.cartFromLocalStorage[0].restaurant_id || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">
                                € {{ this.store.totalFromLocalStorage.toFixed(2) }}</td>
                            <td v-else>€ 0.00</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div class="text-center">
                    <button type="submit" class="btn btn-restaurant">Procedi all'ordine</button>
                    <router-link class="ms-2 btn btn-restaurant2" :to="{ name: 'restaurant' }" @click="clearCart()">Elimina
                        Carrello</router-link>
                </div>
            </form>

        </div>

    </div>
</template>


<style lang="scss" scoped>
.bg {
    background-image: url('https://i.ibb.co/fM5MH76/pngegg.png');
    background-size: cover;
    background-color: #ffcc6a;
    padding-bottom: 15px;

}

.btn-restaurant {
    border: none;
    border-radius: 50px;
    background-color: #ffcc6a;
    color: white;
    font-weight: bold;
    border-bottom: 3px solid rgb(136, 194, 48);
    transition: all .6s;
    box-shadow: 0px 4px 8px 0px rgb(0, 0, 0);

    &:hover {
        cursor: pointer;
        background-color: rgb(136, 194, 48);
        border-bottom: 3px solid #ffcc6a;
    }
}

.btn-restaurant2 {
    border: none;
    border-radius: 50px;
    background-color: #ffcc6a;
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

.delivery-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
}


.delivery-table th,
.delivery-table td {
    border-bottom: solid 1px #dd3f3f;
    padding: 4px;
    text-align: center;
}

.delivery-table thead {
    background-color: #ffcc6a;
    color: #fff;
}

em {
    color: white;
}

.delivery-table tbody tr:hover {
    background-color: #ffcb6a84;

}

.delivery-table th:first-child,
.delivery-table td:first-child {
    border-radius: 8px 0 0 8px;
}

.delivery-table th:last-child,
.delivery-table td:last-child {
    border-radius: 0 8px 8px 0;
}

/////
.delivery-form {
    color: white;
    max-width: 400px;
    margin: 15px auto;
    padding: 20px;
    background-color: #212529;
    border-radius: 15%;

    border-top: 15px solid #dd3f3f;
    border-bottom: 15px solid #dd3f3f;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.delivery-form h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ddd;
}

.form-group textarea {
    resize: vertical;
}

.form-group button {
    display: block;
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    background-color: #ff5f00;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.form-group button:hover {
    background-color: #e65000;
}


.flex {
    display: flex;
    gap: 30px;

    form {
        flex-grow: 1;
    }

}

.btn-rest {
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
}</style>