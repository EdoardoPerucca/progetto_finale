<script>

export default {
    name: 'AppHeader',

    data() {
        return {

        }
    },
}

</script>

<template>
    <nav class="navbar navbar-expand-lg bg-dark  fixed-top">
        <div class="container-fluid ">
            <div class="navbar-brand" id="logo">
                <img src="/images/logo-deliveboo.png" alt="logo">
            </div>
            <button id="nav-tog" class="navbar-toggler "  type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'restaurant' }">Ristoranti</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'AboutUs' }">About Us</router-link>
                    </li>
                </ul>
              <a class="nav-link pe-2" href="http://127.0.0.1:8000/">Registrati</a>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
#nav-tog{
    padding: var(--bs-navbar-toggler-padding-y) var(--bs-navbar-toggler-padding-x);
    font-size: var(--bs-navbar-toggler-font-size);
    line-height: 1;
    color: var(--bs-form-invalid-border-color);
    background-color: #ffcb6a;
    border: var(--bs-border-width) solid var(--bs-form-invalid-border-color);
    border-radius: var(--bs-navbar-toggler-border-radius);
    transition: var(--bs-navbar-toggler-transition);
}
#logo {
    padding-right: 50px;
    img {
        width: 100px;
        object-fit: contain;
    }
}

.nav-link {
    font-weight: bold;
    color: white;

    &:hover {
        color: #ffcc6a;
    }
}

#form-search {
        outline: none;
        padding: 5px 10px;
        border: none;
        border-bottom: 2px solid #dd3f3f;
        background-color: white;
        color: black;
        box-shadow: 0px 4px 8px 0px rgb(0, 0, 0);
}

.btn-restaurant {
    border: none;
    border-radius: 10px;
    background-color: #ffcc6a;
    color: white;
    font-weight: bold;
    border-bottom: 3px solid #dd3f3f;
    transition: all .6s;
    box-shadow: 0px 4px 8px 0px rgb(0, 0, 0);

    &:hover {
        cursor: pointer;
        background-color: #dd3f3f;
        border-bottom: 3px solid #ffcc6a;
    }
}
</style>