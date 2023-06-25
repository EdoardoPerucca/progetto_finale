<script>

import { store } from '../store';

export default {
    data() {
        return {
            store,
        }
    },
}
</script>


<template>

    <div class="container d-flex justify-content-center flex-column text-center">
        
        <div class="logo">
            <img src="/images/logo-deliveboo.png" alt="">
        </div>

        <div class="coming">
            <h2>Il tuo ordine è in arrivo</h2>
        </div>

        <div class="status my-3">
            <span>Ottime notizie! {{ store.restaurantNameFromLocalStorage }} ha confermato il tuo ordine</span>
        </div>

        <div class="number d-flex flex-column gap-2 align-items-center">
            <h6 class="fw-bold">Il numero del tuo ordine è</h6>
            <span class="fw-bold fs-3">{{ store.emailContent.number }}</span>
        </div>

        <div class="order-summary my-5">
            <h3>Riepilogo ordine</h3>
            <span class="fw-bold">{{ store.restaurantNameFromLocalStorage }}</span>

            <div class="address border-top border-bottom text-start p-3 mt-4">
                <span class="d-block fw-bold">Indirizzo di consegna:</span>
                <span>{{ store.emailContent.address }}</span>
            </div>

            <div class="dishes p-3">
                <div class="dish fw-bold d-flex justify-content-between" v-for="dish in store.emailContent.dishes">
                    <div class="somethin">
                        <span class="me-4">{{ dish.quantity }}</span>
                        <span>{{ dish.name }}</span>
                    </div>

                    <span>{{ dish.price.toFixed(2) }}€</span>
                </div>
            </div>

            <div class="total d-flex justify-content-between fw-bold text-white fs-1">

                <span class="">Totale:</span>

                <span>{{ store.emailContent.total.toFixed(2) }}€</span>

            </div>
        </div>

        <div class="deliveboo d-flex flex-column gap-3">
            <span>Deliveboo.it</span>

            <span>Deliveboo non ti invierà mai email chiedendoti i dati della tua carta di credito o conto bancario.
                Ti consigliamo di modificare regolarmente la tua password.
            </span>

            <span class="mb-5">Deliveboo Italy | Via di un qualcosa | Italy</span>
        </div>

    </div>

</template>


<style lang="scss" scoped>
    
.container {

    max-width: 600px;

    .logo {

        img {

            width: 100px;
            object-fit: cover;
            margin: 30px;

        }

    }

    .coming {
        color: #dd3f3f;
    }

    .number {

        span {

            border-style: dotted;
            border-color: #dd3f3f;
            padding: 20px;
            width: fit-content;
            color: #dd3f3f;
            text-transform: uppercase;


        }

    }

    .total {
        background-color: #ffcc6a;
        padding: 30px;
    }

    .deliveboo {

        font-size: 12px;

        span:first-child {

            color: #dd3f3f;

        }

        span {

            color: #3a2122;

        }

    }

}
    
</style>