<script>
import axios from 'axios';
import { store } from "../store.js";

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

            // console.log(response.data.results);

            this.restaurant = response.data.results;

            this.store.restaurantName = response.data.results.activity_name;

            this.store.actualRestaurantId = response.data.results.id;

            localStorage.setItem('actualId', JSON.parse(response.data.results.id));

            localStorage.setItem('slug', JSON.stringify(this.restaurant.slug));

            document.title = 'Restaurant: ' + this.restaurant.activity_name;

            // console.log(this.store.actualRestaurantId);

        })

    },
    computed:{
        sum() {
            let total = 0;
            this.store.cartFromLocalStorage.forEach((item) => {
                total += item.quantity;
            });
            return total;
        },
    },

    components: {
        DishCard,
    },

    methods: {

        getImage() {
            let path = 'https://static.vecteezy.com/ti/vettori-gratis/p1/5359703-cibo-icone-pixel-perfetto-illustrazione-vettoriale.jpg'
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

        addToCart(dish) {

            const existingItem = this.store.cartFromLocalStorage.find(item => item.id === dish.id);


            if (existingItem) {

                existingItem.quantity++;

                this.store.totalFromLocalStorage += parseFloat(dish.price);
                this.store.totalFromLocalStorage = parseFloat(this.store.totalFromLocalStorage.toFixed(2));

                localStorage.setItem('cart', JSON.stringify(this.store.cartFromLocalStorage));
                localStorage.setItem('total', JSON.stringify(this.store.totalFromLocalStorage));

            }

        },

        removeDishFromCart(dish) {

            const existingItem = this.store.cartFromLocalStorage.find(item => item.id === dish.id);

            const existingItemIndex = this.store.cartFromLocalStorage.findIndex(item => item.id === dish.id);


            if (existingItem) {

                /* console.log(existingItemIndex)

                console.log(this.store.cartFromLocalStorage[existingItemIndex]) */

                this.store.cartFromLocalStorage.splice(this.store.cartFromLocalStorage.indexOf(existingItem), 1);

                this.store.totalFromLocalStorage -= existingItem.price * existingItem.quantity;

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

        getRestaurantName() {

            localStorage.setItem('restaurantName', JSON.stringify(this.store.restaurantName));

        },

    }

}
</script>



<template>
    <div class="background">
        <div class="inner-container-1">
            <router-link class="btn btn-restaurant3 m-3" :to="{ name: 'restaurant' }">Torna indietro</router-link>

            <div class="container-fluid d-flex justify-content-center py-2">
                <article class="postcard dark red">
                    <img class="postcard__img" :src="getImage()" alt="Image Title" />
                    <div class="postcard__text">
                        <h1 class="postcard__title red">{{ restaurant.activity_name
                        }}
                        </h1>
                        <div class="postcard__subtitle small">
                            Tel: {{ restaurant.phone_number }}
                        </div>
                        <div class="postcard__bar"></div>
                        <div class="postcard__preview-txt">{{ restaurant.address }}</div>
                        <div class="postcard__preview d-flex">

                        </div>
                    </div>
                </article>
            </div>
            <!-- cart  -->
            <span v-if="this.store.cartFromLocalStorage.length == 0"></span>
            <span v-else-if="this.store.actualRestaurantId != this.store.cartFromLocalStorage[0].restaurant_id"
                class="px-2 pb-4 text-center d-flex justify-content-center fs-2 text-white alert text-bg-danger rounded-pill">
                Hai già un carrello in un altro Ristorante: {{ this.store.cartFromLocalStorage[0].restaurant_name }} !
            </span>
            <div class="dropdown inner-container-2 z-3">
                <button  v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id" type="button" class="btn btn-restaurant2 dropdown-toggle p-3" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                    <i class="fa-solid fa-cart-shopping"></i>
                    {{ sum }}
                </button>
                <div class=" dropdown-menu  p-3">
                    
        
                    <table class="table container text-center overflow-hidden rounded rounded-4  "
                        v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Prezzo</th>
                                <th scope="col"></th>
                                <th scope="col">Quantità</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(dish, index) in this.store.cartFromLocalStorage" :key="index">
                                <td v-if="this.restaurant.id == dish.restaurant_id">{{ dish.name }}</td>
                                <td v-if="this.restaurant.id == dish.restaurant_id">€ {{ dish.price.toFixed(2) }}</td>
                                <td v-if="this.restaurant.id == dish.restaurant_id">
                                    <button class="btn btn-restaurantminus me-2 fw-bold rounded-5" @click="removeFromCart(dish)">
                                        -
                                    </button>
                                </td>
                                <td v-if="this.restaurant.id == dish.restaurant_id">{{ dish.quantity }}</td>
                                <td v-if="this.restaurant.id == dish.restaurant_id">
                                    <button class="btn btn-restaurantplus me-2 fw-bold rounded-5" @click="addToCart(dish)">
                                        +
                                    </button>
                                </td>
                                <td v-if="this.restaurant.id == dish.restaurant_id">
                                    <button class="btn  btn-danger" @click="removeDishFromCart(dish)">
                                        Rimuovi
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <th>Totale</th>
                                <td
                                    v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">
                                    € {{ this.store.totalFromLocalStorage.toFixed(2) }}</td>
                                <td v-else>€ 0.00</td>
                                <td></td>
                                <td>{{ sum }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="cart-buttons p-2 text-center">
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-restaurant2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Vedi Carrello
                        </button>
        
                        <button
                            v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id"
                            type="button" class="ms-2 btn btn-restaurant3" @click="clearCart()">
                            Elimina Carrello
                        </button>
                        <button v-else type="button" class="ms-2 btn btn-restaurant3 disabled">
                            Elimina Carrello
                        </button>
                    </div>
                </div>
            </div>


            <div class="container py-5">
                <DishCard :dish="dish" v-for="dish in restaurant.dishes"></DishCard>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Carrello</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body ">

                        <table
                            v-if="this.store.cartFromLocalStorage.length != 0 && this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id"
                            class="table mb-4 container">
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
                                    <td v-if="this.restaurant.id == dish.restaurant_id">€ {{ dish.price }}</td>
                                    <td v-if="this.restaurant.id == dish.restaurant_id" class="text-center">{{ dish.quantity
                                    }}</td>
                                </tr>
                                <tr>
                                    <th>Totale</th>
                                    <td
                                        v-if="this.store.cartFromLocalStorage.length == 0 || this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id">
                                        € {{ this.store.totalFromLocalStorage.toFixed(2) }}</td>
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
                        <button type="button" class="btn btn-restaurant3" data-bs-dismiss="modal">Chiudi</button>
                        <button
                            v-if="this.store.cartFromLocalStorage.length != 0 && this.store.actualRestaurantId == this.store.cartFromLocalStorage[0].restaurant_id"
                            type="button" class="btn btn-restaurant2" data-bs-dismiss="modal">
                            <router-link @click="getRestaurantName()"
                                :to="{ name: 'cart', params: { slug: this.restaurant.activity_name } }"
                                class="text-white text-decoration-none">Checkout</router-link>
                        </button>

                        <button v-else type="button" class="btn btn-restaurant2" data-bs-dismiss="modal" disabled>
                            <router-link :to="{ name: 'cart' }"
                                class="text-white text-decoration-none">Checkout</router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>



<style lang="scss" scoped>
// @media screen and (min-width: 2300px) {
//     .inner-container-2{
//         position:fixed;
//     }
//     .background{
//      align-items: start;
//        padding-left: 40px;
//     }
// }
.background {
    display: flex;
    flex-direction: column;
    padding-left: 0px;
    justify-content: start;
    padding-left: 40px;
    padding-bottom: 40px;
    background-color: #ffcc6a;
    background-image: url(https://i.ibb.co/fM5MH76/pngegg.png);
    background-size: contain;
}

.inner-container-2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5em;
    gap: 20px;
    position: fixed;
    right: 1%;
    top: 3%;
    
}

.table {
    font-size: x-small;
    --bs-table-color-type: initial;
    --bs-table-bg-type: initial;
    --bs-table-color-state: initial;
    --bs-table-bg-state: initial;
    --bs-table-color: var(--bs-body-color);
    /* --bs-table-bg: var(--bs-body-bg); */
    --bs-table-border-color: var(--bs-border-color);
    --bs-table-accent-bg: transparent;
    --bs-table-striped-color: var(--bs-body-color);
    --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
    --bs-table-active-color: var(--bs-body-color);
    --bs-table-active-bg: rgba(0, 0, 0, 0.1);
    --bs-table-hover-color: var(--bs-body-color);
    --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
    width: 100%;
    margin-bottom: 1rem;
    vertical-align: top;
    border-color: var(--bs-table-border-color);


}

.container {
    max-width: 800px;
    margin: 0 auto;

}

.btn-restaurantminus {
    border: none;
    border-radius: 50px;
    width: 30px;
    background-color: #fcc969;
    color: 212529;
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

.btn-restaurantplus {
    border: none;
    border-radius: 50px;
    background-color: #fcc969;
    width: 30px;
    color: #212529;
    font-weight: bold;
    border-bottom: 3px solid rgb(136, 194, 48);
    transition: all .6s;
    box-shadow: 0px 4px 8px 0px rgb(0, 0, 0);

    &:hover {
        cursor: pointer;
        background-color: rgb(136, 194, 48);
        border-bottom: 3px solid #212529;
    }
}

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
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.865);
    margin: 0 0 2rem 0;
    overflow: hidden;
    position: relative;
    color: #ffffff;
    border: 2px solid $main-red;
    border-radius: 30px;

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
        max-height: 180px;
        width: 100%;
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
        align-items: center;
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


    }
}

@media screen and (min-width: 1024px) {
    .postcard__text {
        padding: 2rem 3.5rem;
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

.table {
    margin: 0 auto;
    max-width: 800px;
    width: 100%;
    background-color: #f8f9fa;
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.651);
    background-color: #343a40;
    border: 1px solid #ccc;
}

.table th,
.table td {
    vertical-align: middle;
    color: #343a40;
}

.table th {
    font-weight: bold;
    background-color: #dc3545;
    color: #fff;
}

.table td {
    background-color: #f8f9fa;
    color: #343a40;
}

.btn {
    display: inline-block;
    padding: 5px 10px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: 3px;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
}

.btn-danger {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}

.btn-danger:focus,
.btn-danger.focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
    outline: 0;
}

.btn-restaurant2 {
    border: none;
    border-radius: 50px;
    background-color: #212529;
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

.btn-restaurant3 {
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