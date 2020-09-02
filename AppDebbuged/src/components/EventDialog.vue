<template>
  <q-card class="bg-white text-white">
        
          <q-bar class="bg-white fixed q-px-sm q-py-lg" style="z-index: 5; width: 100%">
            <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="lg" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
            <q-space/>

            <q-icon flat round  @click.stop="addFavorite(eventData.eventID); handleFavIcon();" :class="heartBeat" :name= userFavorite color="deep-orange-9" size="md" />
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
                  <div class="text-grey-8">
                    {{date.weekDay +', '+date.day+' '+date.month+' '+date.year}}
                  </div>
                  <div class="text-grey-8">
                    {{ eventData.eventTime }}
                  </div>
                </div>
              </div>

              <div v-if="!eventOnline" class="row q-pl-md q-pt-sm">
                <q-icon name="las la-map-marker" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventAdressLocalName }}
                </div>
              </div>
              <div v-if="eventOnline" class="row q-pl-md q-pt-sm">
                <q-icon name="las la-at" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventAdressOnline }}
                </div>
              </div>

              <div class="row q-pl-md q-pt-sm q-pb-sm">
                <q-icon name="las la-dollar-sign" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">Gratuito</div>
              </div>
            </div>
      
          </q-card-section>

          <q-separator inset class="q-my-md"/>

          <q-card-section >
            <div class="bg-white">
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

          <q-separator inset class="q-my-md"/>

          <q-card-section >
            <div class="bg-white">
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

          <q-separator inset class="q-my-md"/>

          <q-card-section >
            <div class="bg-white">
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
import {mapActions, mapGetters} from 'vuex'
import * as moment from 'moment';
import 'moment/locale/pt-br';

export default {
  name: 'PageExample',

  data () {
    return {
      userFavorite: 'lar la-heart',
      heartBeat: 'animated heartBeat my-delay',
      eventOnline: false,
       date:{
        day: null,
        month: null,
        year: null,
        weekDay: null
      }
    }
  },

   methods: {
    ...mapActions('store', ['eventsHistory', 'addFavorite']),


    handleFavIcon(){
      if(this.userFavorite != 'las la-heart'){
        this.userFavorite = 'las la-heart'
        this.heartBeat = 'animated heartBeat my-delay'
      }
      else{
        this.userFavorite = 'lar la-heart'
        this.heartBeat = 'none'
      }
    },

    checkFavorites(){
      console.log('Teste')
      if (this.userData.favorites.includes(this.eventData.eventID)){
        this.userFavorite = 'las la-heart'
        this.heartBeat = 'animated heartBeat my-delay'
      }
      else{
        this.userFavorite = 'lar la-heart'
        this.heartBeat = 'none'
      }
    },
  },

  mounted() {
    this.eventsHistory(this.eventData.eventID),

    this.checkFavorites()
    this.date.day = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("D")
    this.date.month = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("MMM")
    this.date.year = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("YYYY")
    this.date.weekDay = (moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("ddd"))
    this.date.weekDay = this.date.weekDay.charAt(0).toUpperCase() + this.date.weekDay.slice(1)
    this.date.month = this.date.month.charAt(0).toUpperCase() + this.date.month.slice(1)
    console.log(this.date)
    if(this.eventData.eventAdressOnline){
      this.eventOnline = true
    }
  },

  computed: {
    ...mapGetters('store', ['userData'])
  },

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



