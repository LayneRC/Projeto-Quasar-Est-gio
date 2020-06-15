<template>
  <q-card class="bg-grey-1 text-white">
        
          <q-bar class="bg-white fixed q-px-sm q-py-lg" style="z-index: 5; width: 100%">
            <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="lg" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
            <q-space/>

            <q-btn flat round color="deep-orange-9" size="md" icon="lar la-heart" />
            <q-btn flat round color="deep-orange-9" size="md" icon="share"/>
                
          </q-bar>
        
          <q-card-section >
            <q-img class="img-dialog"
              style="margin-top: 48px"
              contain
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              basic
              >
            </q-img> 

            <div class="bg-white ">
              <div class="text-grey-9 titulo app-font-bold q-pt-sm q-pl-md">
                Nome Evento
              </div>

              <div class="row q-pl-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-ml-sm">Categoria</div>
              </div>

              <div class="row q-pl-md q-pt-md">
                <q-icon name="las la-calendar-day" size="30px" color="grey-8" class="q-mt-xs"/>
                <div class="q-ml-sm">
                  <div class="text-grey-8">dom, 07 jun 2020</div>
                  <div class="text-grey-8">19:00</div>
                </div>
              </div>

              <div class="row q-pl-md q-pt-sm">
                <q-icon name="las la-map-marker" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">Localização</div>
              </div>

              <div class="row q-pl-md q-pt-sm q-pb-sm">
                <q-icon name="las la-dollar-sign" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">Gratuito</div>
              </div>
            </div>
      
          </q-card-section>

          <q-card-section >
            <div class="bg-white q-mt-md">
              <div class="text-grey-9 app-font-bold q-pt-sm q-pl-md">
                Descrição
              </div>

              <div class="row q-pl-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-mr-md text-justify">Lorem Ipsum is simply dummy text of the printing and 
                  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has 
                  survived not only five centuries, but also the leap into electronic typesetting, remaining essentially 
                  unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                  passages, and more recently with desktop publishing software like Aldus PageMaker including versions of 
                  Lorem Ipsum.
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-section >
            <div class="bg-white q-mt-md">
              <div class="text-grey-9 app-font-bold q-pt-sm q-pl-md">
                Organizador
              </div>

              <div class="row q-pl-md q-pt-sm q-mb-md">
                <div class="text-grey-8 flex flex-center q-mr-md q-mb-md text-justify">
                  Nome do organizador
                </div>
              </div>
            </div>
          </q-card-section> 

          <q-card-section >
            <div class="bg-white q-mt-md">
              <div class="text-grey-9 app-font-bold q-pt-sm q-pl-md">
                Localização
              </div>

              <div class="row q-pa-md">
                <q-img src="/statics/imgs/map.jpg" />
              </div>
            </div>
          </q-card-section> 
      </q-card>
</template>

<script>
export default {
  name: 'PageExample',
  
}
</script>

<style scoped>

</style>



