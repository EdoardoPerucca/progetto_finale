import {reactive} from "vue";

export const store = reactive({
    
    cartFromLocalStorage: JSON.parse(localStorage.getItem('cart') || '[]'),

    totalFromLocalStorage: JSON.parse(localStorage.getItem('total') || '0'),

    restaurantIdFromLocalStorage: JSON.parse(localStorage.getItem('id') || 'null'),

    actualRestaurantIdFromLocalStorage: JSON.parse(localStorage.getItem('actualId') || 'null'),

    actualRestaurantId: null,


    dishIds: [],

    order: [],
    orderFromLocalStorage: JSON.parse(localStorage.getItem('order') || '[]'),


    restaurantName: '',


    restaurantNameFromLocalStorage: JSON.parse(localStorage.getItem('restaurantName')),


    first_name: '',
    last_name: '',
    address: '',
    email: '',


});