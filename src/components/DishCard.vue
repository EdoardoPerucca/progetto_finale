<script>

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

            const existingItem = this.store.cart.find(item => item.id === dish.id);

            let singlePrice = parseFloat(dish.price);

            if(existingItem) {

                this.store.cart[0].quantity++;

                this.store.total += parseFloat(singlePrice.toFixed(2));

            } else {

                this.store.cart.push({
                    id: dish.id,
                    name: dish.name,
                    price: singlePrice,
                    quantity: 1,
                });

                // this.store.cart.push(dish);
                this.store.dishIds.push(dish.id);
                this.store.total += singlePrice;

            }

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
                <li class="list-group-item"><b>Intolleranze: </b> 
                <span>{{dish.intolerance != null ? dish.intolerance : 'Nessuna'}}</span>
            </li>
                <li class="list-group-item"><b>Prezzo: </b> {{ dish.price }} €</li>
                <li class="list-group-item"><b>Disponibilità: </b> {{ dish.availability ? 'Disponibile' : 'Non Disponibile' }}</li>
                
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