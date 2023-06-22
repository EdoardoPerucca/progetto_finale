<script>

import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,
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

            const order = {
                dishes: this.store.cartFromLocalStorage,
                total:this.store.totalFromLocalStorage,
                status:1,
                number:100,
                first_name:this.store.first_name,
                last_name:this.store.last_name,
                address:this.store.address,
                email:this.store.email,
            };

            // console.log(order)

            axios.post('http://127.0.0.1:8000/api/orders', order)
            .then(response => {
                console.log('Ordine effettuato:', response.data);
                // store.orderFromLocalStorage = [];
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il salvataggio dell\'ordine:', error);
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