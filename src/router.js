import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import RestaurantIndex from './pages/RestaurantIndex.vue';
import RestaurantShow from './pages/RestaurantShow.vue';
import Cart from './pages/Cart.vue';
import Payment from './pages/Payment.vue';
import Email from './pages/Email.vue';


const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
            meta: {title: 'Home'},
        },
        {
            path: '/restaurant',
            name: 'restaurant',
            component: RestaurantIndex,
            meta: {title: 'Restaurants'},
        },
        {
            path: '/restaurantMenu/:slug',
            name: 'restaurantMenu',
            component: RestaurantShow,
            meta: {title: 'Restaurant Menu'},
        },
        {
            path: '/restaurants/:slug/cart',
            name: 'cart',
            component: Cart,
            meta: {title: 'Cart'},
        },
        {
            path: '/restaurants/:slug/cart/:id',
            name: 'payment',
            component: Payment,
            meta: {title: 'Payment'},
        },
        {
            path: '/no-reply',
            name: 'Email',
            component: Email,
            meta: {title: 'No Reply Email'},
        },
    ]
});

router.beforeEach((to, from) => {

    document.title = to.meta?.title ?? 'Deliveboo'

});

export { router };