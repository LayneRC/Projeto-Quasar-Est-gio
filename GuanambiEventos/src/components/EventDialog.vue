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
              :src = "eventData.eventImg"
              basic
              :ratio="16/9"
              >
            </q-img> 

            <div class="bg-white ">
              <div class="text-grey-9 titulo app-font-bold q-pt-sm q-pl-md">
                {{ eventData.eventName }}
              </div>

              <div class="row q-pl-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventCategorie }}
                </div>
              </div>

              <div class="row q-pl-md q-pt-md">
                <q-icon name="las la-calendar-day" size="30px" color="grey-8" class="q-mt-xs"/>
                <div class="q-ml-sm">
                  <div class="text-grey-8">dom, 07 jun 2020</div>
                  <div class="text-grey-8">
                    {{ eventData.eventTime }}
                  </div>
                </div>
              </div>

              <div class="row q-pl-md q-pt-sm">
                <q-icon name="las la-map-marker" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventAdressLocalName }}
                </div>
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
                <div class="text-grey-8 flex flex-center q-mr-md text-justify">
                  {{ eventData.eventDescription }}
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
                  {{ eventData.eventNameResponsible }}
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
                <q-img src="https://www.descubraonline.com/public/lotericas/bahia/guanambi/ouro-branco-da-sorte-brindes-min.png" />
              </div>
            </div>
          </q-card-section> 
      </q-card>
</template>

<script>
export default {
  name: 'PageExample',

  props: [
    "eventData"
  ]
  
}
</script>

<style scoped>

.img-dialog {
  width: 35;
}

</style>



