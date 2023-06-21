import {reactive} from "vue";

export const store = reactive({
    
    cartFromLocalStorage: JSON.parse(localStorage.getItem('cart') || '[]'),

    totalFromLocalStorage: JSON.parse(localStorage.getItem('total') || '0'),

    restaurantIdFromLocalStorage: JSON.parse(localStorage.getItem('id') || 'null'),

    dishIds: [],

    actualRestaurantId: null,

});