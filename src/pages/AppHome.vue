<script>
export default {
    name: 'AppHome',
}
</script>

<template>
    <div class="hero-container">
        <div class="hero-title container">
            <h1>Benvenuti su Deliveboo</h1>
            <div class="restaurant-button">
                <router-link class="btn btn-restaurant" :to="{ name: 'restaurant' }">Vai ai ristoranti</router-link>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.hero-container {
    
    height: calc(100vh - 103px);
    display: flex;
    justify-content: center;
    background-image: url(/images/hero.jpg);
    background-size: cover;

    .hero-title {
        width: 100%;
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: flex-end;
        gap: 1em;

        h1 {
            width: 70%;
            font-size: 4em;
            color: white;
        }

        .restaurant-button {

            .btn-restaurant {
                margin-top: 3em;
                padding: 15px 30px;
                border: none;
                border-radius: 10px;
                background-color: #ffcc6a;
                color: white;
                font-size: 1.2em;
                font-weight: bold;
                border-bottom: 3px solid #dd3f3f;
                transition: all .6s;
                box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.6);

                &:hover {
                    cursor: pointer;
                    background-color: #dd3f3f;
                    border-bottom: 3px solid #ffcc6a;
                }
            }
        }
    }
}
</style>