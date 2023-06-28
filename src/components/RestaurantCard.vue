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
        getImage() {

            let path = 'https://static.vecteezy.com/ti/vettori-gratis/p1/5359703-cibo-icone-pixel-perfetto-illustrazione-vettoriale.jpg';

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
    <div class="container py-2">
        <article class="postcard dark red">
            <img class="postcard__img" :src="getImage()" alt="Image Title" />
            <div class="postcard__text">
                <h1 class="postcard__title red"><router-link
                        :to="{ name: 'restaurantMenu', params: { slug: restaurant.slug } }">{{ restaurant.activity_name
                        }}</router-link>
                </h1>
                <div class="postcard__subtitle small">
                    Tel: {{ restaurant.phone_number }}
                </div>
                <div class="postcard__bar"></div>
                <div class="postcard__preview-txt">{{ restaurant.address }}</div>
                <div class="postcard__preview">Tipologia: <span v-for="restaurantType in restaurant.types">
                        {{ restaurantType.name + ', ' }}
                    </span></div>
            </div>
        </article>
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
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.865);
    border-radius: 10px;
    margin: 0 0 2rem 0;
    overflow: hidden;
    position: relative;
    color: #ffffff;
    border: 2px solid $main-red;

    border-bottom-right-radius: 150px;

    &.dark {
        background-color: #212529;
    }

    a {
        color: inherit;
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
            transform: rotate(4deg);
        }

        &:nth-child(2n+0) .postcard__text::before {
            right: -12px !important;
            transform: rotate(-4deg);
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
</style>