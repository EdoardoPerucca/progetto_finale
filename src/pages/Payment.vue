<script>

import { store } from '../store';
import axios from 'axios';

export default {
    data() {
        return {
            store,

            errorMessage: '',
            name: "",
            email: "",
            messaggio: "",

            isDone: false,

        }
    },

    mounted() {

      // BRAINTREE - PAYMENTS
      let button = document.querySelector('#submit-button');
      let vue = this;

      braintree.dropin.create({
          authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
          selector: '#dropin-container'
      }, function (err, instance) {
        button.addEventListener('click', function () {
          instance.requestPaymentMethod(function (err, payload) {
            if (err === null) {
              vue.placeOrder();
              vue.sendForm();
              vue.isDone = true;
            } else {
              console.log('Pagamento fallito:', err);
            }
          });
        })
      });

    },

    methods: {
        
        placeOrder() {

            // console.log(order)

            axios.post('http://127.0.0.1:8000/api/orders', this.store.orderFromLocalStorage[0])
            .then(response => {
                console.log('Ordine effettuato:', response.data);
            })
            .catch(error => {
                console.error('Si è verificato un errore durante il salvataggio dell\'ordine:', error);
            });

            let checkEl = document.getElementById('check');

            checkEl.classList.toggle('d-none');

            localStorage.setItem('email', JSON.stringify(this.store.orderFromLocalStorage[0]))

            setTimeout(() => {
                
                localStorage.removeItem('cart');
                localStorage.removeItem('total');
                localStorage.removeItem('id');
                localStorage.removeItem('slug');
                localStorage.removeItem('order');

    
                return location.replace('/no-reply');
                
            }, 2000);

        },

        sendForm() {

            const data = {
                name:  store.orderFromLocalStorage[0].first_name ,
                email: store.orderFromLocalStorage[0].email ,
                messaggio: store.orderFromLocalStorage[0].number ,
            };

            axios.post("http://127.0.0.1:8000/api/leads" , data).then((resp) => {

                this.success = resp.data.success;
                console.log(data);

                if (this.success) {

                    this.name = "";
                    this.email = "";
                    this.messaggio = "";

                } else {

                    console.log(resp.data);
                    this.errors = resp.data.errors;

                };
            });
        },

    },
}
</script>


<template>

    <router-link :to="{name: 'cart', params: {slug: this.store.restaurantNameFromLocalStorage}}" class="btn btn-primary m-3">Torna Al Carrello</router-link>


    <div class="container" id="dropin-container"></div>
    <div class="d-flex justify-content-center">
        <button v-if="!isDone" id="submit-button" class=" button button--small button--green">Purchase</button>

    </div>

    <div class="container d-flex justify-content-center my-5">
        <div class="typewriter d-none" id="check">
            <div class="slide"><i></i></div>
            <div class="paper"></div>
            <div class="keyboard"></div>
        </div>
    </div>


    <div class="dropdown container">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
            Contattaci...
        </button>
        <form class="dropdown-menu p-4" @submit.prevent="sendForm">
            <div class="mb-3">
                <label for="name" class="form-label">Nome</label>
                <input type="text" id="name" class="form-control" v-model="name"/>    
            </div>
            <div class="mb-3">
                <label for="Email" class="form-label">Email</label>
                <input type="email" id="email" class="form-control" v-model="email"/>    
            </div>
            
            <div class="mb-3">
                <label for="message" class="form-label">Messaggio</label>
                <textarea id="message" rows="10" class="form-control" v-model="messaggio"></textarea>    
            </div>
            <div class="mb-3"></div>
            <button type="submit" class="btn btn-primary">Sign in</button>
        </form>
    </div>

</template>


<style lang="scss" scoped>
    
    .button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}





// COSA STRANA
.typewriter {
  --blue: #5C86FF;
  --blue-dark: #275EFE;
  --key: #fff;
  --paper: #EEF0FD;
  --text: #D3D4EC;
  --tool: #FBC56C;
  --duration: 3s;
  position: relative;
  -webkit-animation: bounce05 var(--duration) linear infinite;
  animation: bounce05 var(--duration) linear infinite;
}

.typewriter .slide {
  width: 92px;
  height: 20px;
  border-radius: 3px;
  margin-left: 14px;
  transform: translateX(14px);
  background: linear-gradient(var(--blue), var(--blue-dark));
  -webkit-animation: slide05 var(--duration) ease infinite;
  animation: slide05 var(--duration) ease infinite;
}

.typewriter .slide:before, .typewriter .slide:after,
.typewriter .slide i:before {
  content: "";
  position: absolute;
  background: var(--tool);
}

.typewriter .slide:before {
  width: 2px;
  height: 8px;
  top: 6px;
  left: 100%;
}

.typewriter .slide:after {
  left: 94px;
  top: 3px;
  height: 14px;
  width: 6px;
  border-radius: 3px;
}

.typewriter .slide i {
  display: block;
  position: absolute;
  right: 100%;
  width: 6px;
  height: 4px;
  top: 4px;
  background: var(--tool);
}

.typewriter .slide i:before {
  right: 100%;
  top: -2px;
  width: 4px;
  border-radius: 2px;
  height: 14px;
}

.typewriter .paper {
  position: absolute;
  left: 24px;
  top: -26px;
  width: 40px;
  height: 46px;
  border-radius: 5px;
  background: var(--paper);
  transform: translateY(46px);
  -webkit-animation: paper05 var(--duration) linear infinite;
  animation: paper05 var(--duration) linear infinite;
}

.typewriter .paper:before {
  content: "";
  position: absolute;
  left: 6px;
  right: 6px;
  top: 7px;
  border-radius: 2px;
  height: 4px;
  transform: scaleY(0.8);
  background: var(--text);
  box-shadow: 0 12px 0 var(--text), 0 24px 0 var(--text), 0 36px 0 var(--text);
}

.typewriter .keyboard {
  width: 120px;
  height: 56px;
  margin-top: -10px;
  z-index: 1;
  position: relative;
}

.typewriter .keyboard:before, .typewriter .keyboard:after {
  content: "";
  position: absolute;
}

.typewriter .keyboard:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--blue), var(--blue-dark));
  transform: perspective(10px) rotateX(2deg);
  transform-origin: 50% 100%;
}

.typewriter .keyboard:after {
  left: 2px;
  top: 25px;
  width: 11px;
  height: 4px;
  border-radius: 2px;
  box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  -webkit-animation: keyboard05 var(--duration) linear infinite;
  animation: keyboard05 var(--duration) linear infinite;
}

@keyframes bounce05 {
  85%, 92%, 100% {
    transform: translateY(0);
  }

  89% {
    transform: translateY(-4px);
  }

  95% {
    transform: translateY(2px);
  }
}

@keyframes slide05 {
  5% {
    transform: translateX(14px);
  }

  15%, 30% {
    transform: translateX(6px);
  }

  40%, 55% {
    transform: translateX(0);
  }

  65%, 70% {
    transform: translateX(-4px);
  }

  80%, 89% {
    transform: translateX(-12px);
  }

  100% {
    transform: translateX(14px);
  }
}

@keyframes paper05 {
  5% {
    transform: translateY(46px);
  }

  20%, 30% {
    transform: translateY(34px);
  }

  40%, 55% {
    transform: translateY(22px);
  }

  65%, 70% {
    transform: translateY(10px);
  }

  80%, 85% {
    transform: translateY(0);
  }

  92%, 100% {
    transform: translateY(46px);
  }
}

@keyframes keyboard05 {
  5%, 12%, 21%, 30%, 39%, 48%, 57%, 66%, 75%, 84% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  9% {
    box-shadow: 15px 2px 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  18% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 2px 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  27% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 12px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  36% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 12px 0 var(--key), 60px 12px 0 var(--key), 68px 12px 0 var(--key), 83px 10px 0 var(--key);
  }

  45% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 2px 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  54% {
    box-shadow: 15px 0 0 var(--key), 30px 2px 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  63% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 12px 0 var(--key);
  }

  72% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 2px 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 10px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }

  81% {
    box-shadow: 15px 0 0 var(--key), 30px 0 0 var(--key), 45px 0 0 var(--key), 60px 0 0 var(--key), 75px 0 0 var(--key), 90px 0 0 var(--key), 22px 10px 0 var(--key), 37px 12px 0 var(--key), 52px 10px 0 var(--key), 60px 10px 0 var(--key), 68px 10px 0 var(--key), 83px 10px 0 var(--key);
  }
}

</style>