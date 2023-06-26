<script>
import { store } from '../store.js'

export default {
    name: 'AppFooter',
    data() {
        return {
            store,
        };
    },

}
</script>

<template>
    <div class="background">
        
        <footer>
            <div class="top-footer container">
                <div class="footer-left">
                    <p><strong class="text-white">Per Info</strong></p>
                    <span><i class="fa-solid fa-phone"></i> (+39) 123-456-7890</span>
                    <span><i class="fa-solid fa-envelope"></i> prova@example.com</span>
                </div>
                <div class="footer-center">
                    <div v-for="footerLink in store.footerLinks" class="links">
                        <p><strong class="text-white">{{ footerLink.title }}</strong></p>
                        <ul>
                            <li v-for="link in footerLink.links"><a href="#">{{ link }}</a></li>
                        </ul>
                    </div>
                </div>
    
                <div class="footer-right">
                    <p><strong class="text-white">Our Newsletter</strong></p>
                    <span>Tieni traccia delle nuove aperture nella tua zona.</span>
                    <div class="newsletter-input">
                        <input type="text">
                        <i class="fa-regular fa-paper-plane"></i>
                    </div>
    
                    <div class="socials">
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                </div>
            </div>
            <hr>
            <div class="bottom-footer container-centered">
                <div class="copyright">
                    <p>Copyright &copy; Deliveboo 2023</p>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.background {
    background-color: #ffcc6a;
}
footer {
    width: 100%;
    background-color: #212529;
    background-size: cover;
    background-position: center;
    border-top-left-radius: 25%;
    border-top-right-radius: 25%;
    border-top: 10px solid #dd3f3f;

    .top-footer {
        padding: 7em 0;
        display: flex;
        justify-content: space-between;
        gap: 40px;

        .footer-left {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: calc(100% / 3);

            p strong {
                font-size: 1.2em;
            }

            span {
                color: rgba(255, 255, 255, 0.459);

                i {
                    color: #ffcc6a;
                }
            }
        }

        .footer-center {
            display: flex;
            justify-content: space-around;
            gap: 20px;
            width: calc(100% / 3);

            .links {
                display: flex;
                flex-direction: column;
                gap: 10px;

                p strong {
                    font-size: 1.2em;
                }

                ul {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;

                    li a {
                        color: rgba(255, 255, 255, 0.459);

                        &:hover {
                            text-decoration: underline;
                        }

                    }
                }
            }

        }

        .footer-right {
            width: calc(100% / 3);
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;


            p strong {
                font-size: 1.2em;
            }

            span {
                color: rgba(255, 255, 255, 0.459);
            }

            .newsletter-input {
                position: relative;

                input {
                    width: 250px;
                    padding: 10px 10px;
                    background-color: white;
                    color: black;
                    border: none;
                    border-radius: 5px;
                    outline: none;
                }

                i {
                    position: absolute;
                    top: 50%;
                    right: 10px;
                    transform: translateY(-50%);
                    color: black;

                    &:hover {
                        cursor: pointer;
                    }
                }
            }

            .socials {
                color: white;
                display: flex;
                gap: 20px;

                i {

                    &:hover {
                        cursor: pointer;
                        color: #ffcc6a;
                    }
                }
            }

        }
    }

    hr {
        border: none;
        height: 1px;
        background-color: #ffcc6a;
    }

    .bottom-footer {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .copyright {
            color: rgba(255, 255, 255, 0.459);
        }

    }
}
</style>