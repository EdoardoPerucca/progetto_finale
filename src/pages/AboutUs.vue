<script>


export default {
    data() {
        return {

        };
    },

    
}
</script>
<template>
    <div>
        <section class="about-us">
  <div class="container">
    <h2>About Us</h2>
    <p>Benvenuti nel mondo di DeliveBoo, dove la passione per il cibo incontrerà la comodità di un servizio di consegna eccezionale. Siamo qui per soddisfare le tue voglie culinarie, portando a casa tua i piatti più deliziosi e le specialità più ricercate della tua città.</p>
    <p class="mission">Con una vasta selezione di ristoranti partner e un'ampia varietà di cucine internazionali, non importa se hai voglia di una pizza fragrante, un sushi fresco o un'autentica cucina etnica, siamo pronti ad accontentare ogni tuo desiderio gustativo.</p>
    <p>La nostra missione è quella di semplificare la tua vita e rendere ogni pasto un'esperienza indimenticabile. Con la nostra app user-friendly e il nostro intuitivo sito web, ordinare il cibo che ami non è mai stato così semplice e veloce. Basta pochi click e il tuo pranzo o cena ideale sarà presto tra le tue mani.</p>
    <p class="delivery-service">Unisciti a noi nella scoperta di un mondo di sapori, dove la qualità, la convenienza e la comodità si fondono armoniosamente. Scegli Delivero e vivi ogni pasto come un'esperienza culinaria senza confini.</p>
    <div class="app-download">
        <h2>Il Team</h2>
    <ul>
        <li class="m-1">
            Angelo Di re 
            <a href="https://github.com/Aranel9966"><i class="fa-brands fa-github"></i></a>
        </li>
     
        
    </ul>
    </div>
  </div>
</section>
    </div>
</template>
<style scoped lang="scss">
    .about-us {
  background-color: #f8f8f8;
  padding: 40px;
  
  h2 {
    font-size: 28px;
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 18px;
    line-height: 1.5;
    color: #777;
    margin-bottom: 30px;
  }
  
  .mission {
    font-weight: bold;
    color: #333;
  }
  
  .delivery-service {
    font-style: italic;
    color: #555;
  }
  
  .app-download {
    margin-top: 40px;
    
    a {
      display: inline-block;
      padding: 5px 10px;
      background-color: #333;
      color: #fff;
      text-decoration: none;
      border-radius: 50%;
      transition: background-color 0.3s;
      
      &:hover {
        background-color: #555;
      }
    }
  }
}
</style>