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
    <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <div class="navbar-brand" id="logo">
                <img src="/images/logo-deliveboo.png" alt="logo">
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
                <form class="d-flex" role="search">
                    <input id="form-search" class="form-control me-2" type="search" placeholder="Search"
                        aria-label="Search">
                    <button class="btn btn-restaurant" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
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