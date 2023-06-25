<script>
export default {
    data() {
        return {

        }
    },

    props: {
        restaurant: Object,
    },

    methods: {
        getImage(){

            let  path = 'https://static.vecteezy.com/ti/vettori-gratis/p1/5359703-cibo-icone-pixel-perfetto-illustrazione-vettoriale.jpg';

            if (this.restaurant.cover_image == path) {

                return path;

            } else {

                // console.log(this.restaurant.cover_image)
                return 'http://127.0.0.1:8000/storage/' + this.restaurant.cover_image;
                
            };
        },
    },
}


</script>

<template>

    <div class="card py-3" style="width:calc(80% / 3 )">
        <img :src="getImage()" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ restaurant.activity_name }}</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Via: </b>{{ restaurant.address }}</li>
                <li class="list-group-item"><b>Tel: </b>{{ restaurant.phone_number }}</li>
                <li class="list-group-item"><b>Tipologia: </b>
                    <span  v-for="restaurantType in restaurant.types">
                        {{ restaurantType.name + ', ' }}
                    </span>
                </li>     
            </ul>
            <router-link class="btn btn-primary" :to="{name: 'restaurantMenu', params: {slug: restaurant.slug}}">Visualizza menu</router-link>
        </div>
    </div>
    
</template>

<style lang="scss" scoped></style>