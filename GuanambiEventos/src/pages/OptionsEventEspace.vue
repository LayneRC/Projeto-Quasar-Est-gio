<template>
  <q-page class= "page-options bg-grey-2">

    <div class="background-options">
      <div class="app-font-bold q-pt-xl q-ml-lg text-white text-header">Bem vindo(a), Layne!</div>
    </div>

    <div class="q-ml-lg q-mr-lg div-options">
      

      <div class="absolute-center">

              <div class="app-font-bold text-center txt-procurando text-grey-8">Procurando por...</div>


        <div class="q-mt-xl">
          <q-btn no-caps size="4vh" outline rounded color="deep-orange-9" class="q-py-lg btn-options" to="/">
            <q-icon name="las la-calendar" size="40px" color="deep-orange-9"/>
            <div>Eventos</div>
          </q-btn>
        </div>

        <div class="q-mt-lg">
          <q-btn no-caps size="4vh" outline rounded color="deep-orange-9" class="q-py-lg btn-options">
            <q-icon name="las la-map-marker" size="40px" color="deep-orange-9"/>
            <div>Espaços</div>
          </q-btn>
        </div>

      </div>
      
    </div>
    
  </q-page>
</template>

<script>
export default {
  name: 'PageOptionsEventEspace',
  
}
</script>

<style scoped>



.background-options{
  height: 200px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background: rgb(242,79,29);
  background: linear-gradient(180deg, rgba(242,79,29,1) 39%, rgba(255,136,99,1) 95%);
  z-index: 1;
}

.text-header {
  font-size: 3vh;

}


.div-options {
  background: white;
  height: 80vh;
  transform: translateY(-100px);
  border-radius: 4px;
  z-index: 2;
  bottom: 0;

}

.page-options {
  height: 100vh;
  overflow: hidden;
}

.txt-procurando {
  font-size: 3vh;
}

@media only screen and (max-height: 480px) {
  .div-options {
    height: 74vh;
  }

  .btn-options {
    padding: 2vh !important;
  }
  
}



</style>



