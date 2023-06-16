import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import RestaurantIndex from './pages/RestaurantIndex.vue';

const router = createRouter({
    history: createWebHistory(),

    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome,
        },
        {
            path: '/restaurant',
            name: 'restaurant',
            component: RestaurantIndex,
        },
    ]
});

export { router };