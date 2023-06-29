<script>

import { effect } from "vue";
import { store } from "../store.js";


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

        getImage() {

            let path = "https://static.vecteezy.com/ti/vettori-gratis/p1/5359703-cibo-icone-pixel-perfetto-illustrazione-vettoriale.jpg";

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

            };
        },

    },
}


</script>


<template>
    <div class="container py-2">
        <article class="postcard dark red">

            <div class="image-container d-flex align-items-center">

                <img class="postcard__img" :src="getImage()" alt="Image Title" />
            </div>
            <div class="postcard__text">
                <h1 class="postcard__title red">{{ dish.name }}
                </h1>
                <div class="postcard__bar"></div>
                <div class="postcard__preview-txt"> Descrizione: {{ dish.description }}</div>
                <div class="postcard__preview d-flex">
                   Intolleranza: {{ dish.intolerance ? dish.intolerance : 'Nessuna'}}
                </div>
                <div class="postcard__preview d-flex">
                    Prezzo: {{ dish.price }} €
                </div>
                <div class="postcard__preview d-flex">
                    Disponibilità: {{ dish.availability ? 'Disponibile' : 'Non Disponibile' }}
                </div>
            </div>
        </article>
        <div class="pb-5 text-center">
            <a v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id"
                class="btn ps-5 pe-5" :class="dish.availability ? 'btn-restaurant' : 'disabled btn-restaurant'"
                @submit.prevent="" @click="addToCart(dish, index)">Aggiungi al carrello</a>
            <a v-else class="btn btn-restaurant mt-3 disabled" @submit.prevent="" @click="addToCart(dish, index)">Aggiungi
                al carrello</a>
        </div>
    </div>
</template>


<style lang="scss" scoped>
$main-red: #dd3f3f !default;
$main-red-rgb-015: #212529 !default;

a,
a:hover {
    text-decoration: none;
    transition: color 0.3s ease-in-out;
}

/* Card */
.postcard {
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.865);
    margin: 0 0 2rem 0;
    overflow: hidden;
    position: relative;
    color: #ffffff;
    border: 2px solid $main-red;
    border-radius: 20px;

    &.dark {
        background-color: #212529;
    }

    a {
        color: inherit;
    }

    .rest-icon {
        position: absolute;
        left: -10px;
        top: -25px;
        background-color: #fcc969;
        color: black;

    }

    .postcard__img {
        height: 200px;
        width: 200px;
        object-fit: cover;
        position: relative;
    }

    .postcard__bar {
        width: 50px;
        height: 10px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #424242;
        transition: width 0.2s ease;
    }

    .postcard__text {
        padding: 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .postcard__preview-txt {
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: justify;
        height: 100%;
    }

    &:hover .postcard__bar {
        width: 100px;
    }
}

@media screen and (min-width: 769px) {
    .postcard {
        flex-wrap: inherit;
        height: 100%;

        .postcard__title {
            font-size: 1.5em;
        }

        .postcard__img {
            max-width: 200px;
            max-height: 100%;
            transition: transform 0.3s ease;
            object-fit: cover;
        }

        .postcard__text {
            padding: 3rem;
            width: 100%;
        }

        &:hover .postcard__img {
            transform: scale(1.1);
        }

        &:nth-child(2n+1) {
            flex-direction: row;
        }

        &:nth-child(2n+0) {
            flex-direction: row-reverse;
        }

        &:nth-child(2n+1) .postcard__text::before {
            left: -12px !important;

        }

        &:nth-child(2n+0) .postcard__text::before {
            right: -12px !important;

        }
    }
}

@media screen and (min-width: 1024px) {
    .postcard__text {
        padding: 2rem 3.5rem;
    }

    .postcard__text:before {
        content: "";
        position: absolute;
        display: block;

        top: -20%;
        height: 130%;
        width: 55px;
    }

    .postcard.dark {
        .postcard__text:before {
            background: #212529;
        }
    }

}

/* COLORS */

.postcard .postcard__tagbox .red.play:hover {
    background: $main-red;
}

.red .postcard__title:hover {
    color: $main-red;
}

.red .postcard__bar {
    background-color: $main-red;
}

.red::before {
    background-image: linear-gradient(-30deg, $main-red-rgb-015, transparent 50%);
}

.red:nth-child(2n)::before {
    background-image: linear-gradient(30deg, $main-red-rgb-015, transparent 50%);
}


@media screen and (min-width: 769px) {

    .red::before {
        background-image: linear-gradient(-80deg,
                $main-red-rgb-015,
                transparent 50%);
    }

    .red:nth-child(2n)::before {
        background-image: linear-gradient(80deg, $main-red-rgb-015, transparent 50%);
    }

}

.btn-restaurant {
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
}
</style>