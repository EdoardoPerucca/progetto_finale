<script>
import { store } from '../store.js'

export default {
    name: 'AppShowcase',
    data() {
        return {

            store,

        };
    },

}

</script>

<template>
    <div class="background">
        <h1 class="text-center py-4">Ordina nei Fast Food più famosi!</h1>
        <div class="showcase container">
            <div class="most-popular">
                <div class="animated-gradient"></div>
                <img src="/images/mcdonalds.jpg" alt="">
                <div class="most-popular-title">
                    <h1>McDonald's</h1>
                </div>
            </div>
            <div class="most-popular">
                <img src="/images/kfc.jpg" alt="">
                <div class="animated-gradient"></div>
                <div class="most-popular-title">
                    <h1>KFC</h1>
                </div>
            </div>
            <div class="most-popular">
                <img src="/images/burger-king.webp" alt="">
                <div class="animated-gradient"></div>
                <div class="most-popular-title">
                    <h1>Burger King</h1>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.background {
    background-color: #ffcc6a;
}

h1 {
    color: #dd3f3f;
}

.showcase {
    padding: 2em;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    justify-content: center;
    align-items: center;

    .animated-gradient {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        &:hover {
            cursor: pointer;
            animation: animateBg 1s linear forwards 1;
            background-image: linear-gradient(300deg,
                    #00000000,
                    #00000000,
                    #00000000,
                    #00000000,
                    #ffffff28,
                    #ffffff71,
                    #ffffff33,
                    #00000000,
                    #00000000,
                    #ffffff00,
                    #00000000);
            background-size: 400% 100%;

            @keyframes animateBg {
                0% {
                    background-position: 100% 0%;
                }

                100% {
                    background-position: 0% 0%;
                }
            }
        }
    }

    .most-popular {
        position: relative;
        
        box-shadow: 0px 10px 12px 0px rgba(0, 0, 0, 0.8);

        img {
            display: block;
            width: 100%;
            width: 400px;
            height: 200px;
            object-fit: cover;
            filter: brightness(0.8);
        }

        .most-popular-title {
            width: 90%;
            display: flex;
            flex-flow: column;
            align-items: flex-start;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);

            h1 {
                font-size: 2em;
                color: white;
            }
        }
    }
}

@media (max-width: 768px) {
    .showcase {
        padding: 1em;
        flex-direction: column;
        align-items: center;
        gap: 10px;

        .most-popular {
            margin-bottom: 20px;
            max-width: 300px;

            img {
                max-height: 150px;
            }

            .most-popular-title {
                width: 100%;
                right: unset;
                left: 0;
                transform: translateY(0%);
                align-items: center;
                text-align: center;

                h1 {
                    font-size: 1.5em;
                }
            }
        }
    }
}
</style>
