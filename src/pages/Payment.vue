<script>

import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,

            errorMessage: '',
            name: "",
            email: "",
            messaggio: "",
        }
    },

    mounted() {

        // BRAINTREE
        let button = document.querySelector('#submit-button');
        let vue = this;

        braintree.dropin.create({
            authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
            selector: '#dropin-container'
        }, function (err, instance) {
        button.addEventListener('click', function () {

            instance.requestPaymentMethod(function (err, payload) {
            // Submit payload.nonce to your server

            if (err === null) {
                vue.placeOrder();
            } else {
                console.log('Pagamento fallito:', err);
            }
            
            
                });
            })
        });

    },

    methods: {
        
        placeOrder() {

            // console.log(order)

            axios.post('http://127.0.0.1:8000/api/orders', this.store.orderFromLocalStorage[0])
            .then(response => {
                console.log('Ordine effettuato:', response.data);
                // store.orderFromLocalStorage = [];
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il salvataggio dell\'ordine:', error);
            });

            setTimeout(() => {
                
                localStorage.removeItem('cart');
                localStorage.removeItem('total');
                localStorage.removeItem('id');
                localStorage.removeItem('slug');
                localStorage.removeItem('order');
                localStorage.removeItem('restaurantName');
    
                return location.replace('/restaurant');
                
            }, 2000);


        },

        sendForm() {
            const data = {
                name: this.name,
                email: this.email,
                messaggio: this.messaggio,
            };
            axios.post("http://127.0.0.1:8000/api/leads" , data).then((resp) => {
                this.success = resp.data.success;
                console.log(resp.data)
                if (this.success) {
                this.name = "";
                this.email = "";
                this.messaggio = "";
                } else {
                console.log(resp.data);
                this.errors = resp.data.errors;
                }
            });
        },

    },
}
</script>


<template>

    <router-link :to="{name: 'cart', params: {slug: this.store.restaurantNameFromLocalStorage}}" class="btn btn-primary m-3">Torna Al Carrello</router-link>


    <div class="container" id="dropin-container"></div>
    <div class="d-flex justify-content-center">
        <button id="submit-button" class=" button button--small button--green">Purchase</button>
    </div>

    <form @submit.prevent="sendForm">
        <div class="mb-3">
        <label for="name">Nome</label>
        <input
            type="text"
            id="name"
            class="form-control"
            v-model="name"
        />
        </div>
        <div class="mb-3">
        <label for="email">Email</label>
        <input
            type="email"
            id="email"
            class="form-control"
            v-model="email"
        />
        </div>
        <div class="mb-3">
        <label for="message">Messaggio</label>
        <textarea
            id="message"
            rows="10"
            class="form-control"
            v-model="messaggio"
        ></textarea>
        </div>
        <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">INVIA</button>
        </div>
    </form>

</template>


<style lang="scss" scoped>
    
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
//   -webkit-appearance: none;
//   -moz-appearance: none;
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