import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import RestaurantIndex from './pages/RestaurantIndex.vue';
import RestaurantShow from './pages/RestaurantShow.vue';
import Cart from './pages/Cart.vue';


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
            meta: {title: 'Restaurant menu'},
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart,
            meta: {title: 'Cart'},
        },
    ]
});

router.beforeEach((to, from) => {

    document.title = to.meta?.title ?? 'Deliveboo'

});

export { router };