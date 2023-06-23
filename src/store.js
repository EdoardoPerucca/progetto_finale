import {reactive} from "vue";

export const store = reactive({
    
    cart: [],
    cartFromLocalStorage: JSON.parse(localStorage.getItem('cart') || '[]'),

    total: 0,
    totalFromLocalStorage: JSON.parse(localStorage.getItem('total') || 0),

    dishIds: [],

    footerLinks: [
        {
            title: 'Informationi',
            links: [
                'Bookmark',
                'Features',
                'Sitemap',
                'Lists',
                'Contact US'
            ]
        },
        {
            title: 'Extra',
            links: [
                'Delivery',
                'Cart',
                'Terms conditions',
                'My account',
                'About us'
            ]
        },
    ],

});