<template>
  <q-card class="bg-white text-white">
        
          <q-bar class="bg-white fixed q-px-sm q-py-lg" style="z-index: 5; width: 100%">
            <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="lg" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
            </q-btn>
            <q-space/>

            <q-icon v-if="eventData.eventStatus == 1 && eventData.eventCancel == 0" flat round  @click.stop="addFavorite(eventData.eventID); handleFavIcon();" :class="heartBeat" :name= userFavorite color="deep-orange-9" size="md" />
            <q-btn @click="showLoading(), share()" v-if="eventData.eventStatus == 1 && eventData.eventCancel == 0" flat round color="deep-orange-9" size="md" icon="share"/>
                
          </q-bar>
        
          <q-card-section >
            <q-img v-if="eventData.eventImg != ''" class="img-dialog"
              style="margin-top: 48px"
              :src = "eventData.eventImg"
              basic
              :ratio="16/9"
              >
              <div v-if="eventData.eventCancel == 1" class="absolute canceledEvent flex flex-center">
                <div class="nameCanceledEvent text-bold text-red-10">
                  CANCELADO
                </div>
              </div>
            </q-img> 

            <q-img v-if="eventData.eventImg == ''" class="img-dialog"
              style="margin-top: 48px"
              src="https://i.ibb.co/smfDnVS/Vermelho-rvore-de-Natal-Arte-de-Natal-Cart-o-5.png"
              basic
              :ratio="16/9"
              >
              <div v-if="eventData.eventCancel == 1" class="absolute canceledEvent flex flex-center">
                <div class="nameCanceledEvent text-bold text-red-10">
                  CANCELADO
                </div>
              </div>
            </q-img> 

            <div class="bg-white ">
              <div class="text-grey-9 titulo text-justify app-font-bold q-pt-sm q-px-md">
                {{ eventData.eventName }}
              </div>

              <div class="row q-pl-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-px-xs">
                  {{ eventData.eventCategorie }}
                </div>
              </div>

              <div class="row q-pl-md q-pt-md">
                <q-icon name="las la-calendar-day" size="30px" color="grey-8" class="q-mt-xs"/>
                <div class="q-ml-sm">
                  <div v-if="eventData.eventDateEnd == eventData.eventDateStart" class="text-grey-8">
                    {{date.weekDayStart +', '+date.dayStart+' '+date.monthStart+' '+date.yearStart}}
                  </div>
                  <div v-if="eventData.eventDateEnd != eventData.eventDateStart" class="text-grey-8">
                    {{date.weekDayStart +', '+date.dayStart+' '+date.monthStart+' '+date.yearStart + ' - ' +
                    dateEnd.weekDayEnd +', '+dateEnd.dayEnd+' '+dateEnd.monthEnd+' '+dateEnd.yearEnd}}
                  </div>
                  <div class="text-grey-8">
                    {{ eventData.eventTime }}
                  </div>
                </div>
              </div>

              <div v-if="!eventOnline" class="row q-px-md q-pt-sm">
                <q-icon name="las la-map-marker" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventAdressLocalName }}
                </div>
              </div>
              <div v-if="eventOnline" class="row q-px-md q-pt-sm">
                <q-icon name="las la-at" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventAdressOnline }}
                </div>
              </div>

              <div class="row q-px-md q-pt-sm q-pb-sm">
                <q-icon name="las la-dollar-sign" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">
                  {{ eventData.eventEntrace }}
                </div>
              </div>
            </div>
      
          </q-card-section>

          <q-separator v-if="eventData.eventDescription" inset class="q-my-md"/>

          <q-card-section v-if="eventData.eventDescription">
            <div class="bg-white">
              <div class="text-grey-9 app-font-bold q-pt-sm q-px-md">
                Descrição
              </div>

              <div class="row q-px-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-mr-md text-justify">
                  {{ eventData.eventDescription }}
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator inset class="q-my-md"/>

          <q-card-section >
            <div class="bg-white">
              <div class="text-grey-9 app-font-bold q-pt-sm q-px-md">
                Organizador
              </div>

              <div class="row q-px-md q-pt-sm q-mb-md">
                <div class="text-grey-8 flex flex-center q-mr-md q-mb-md text-justify">
                  {{ eventData.eventNameResponsible }}
                </div>
              </div>
            </div>
          </q-card-section> 

          <q-separator inset class="q-my-md"/>

          <q-card-section>
            <div class="bg-white">
              <div class="text-grey-9 app-font-bold q-pt-sm q-pl-md">
                Localização
              </div>
              <div v-if="eventData.eventAdressOption != 'Online'"  class="text-grey-9 text-caption q-px-md">{{adressShow}}</div>
              <div v-if="eventData.eventAdressOption != 'Online'" class="q-pa-sm">
                <div id="map"></div>
              </div>
              <div v-if="eventData.eventAdressOption == 'Online'" class="q-pa-sm flex flex-center" id="online">
                <div class="text-center">
                  <q-icon name="las la-at" size="150px" color="grey-8"/>
                  <div class="text-grey-9 text-h6">O evento é online!</div>
                  <div class="text-grey-9 text-subtitle1">{{ eventData.eventAdressOnline }}</div>
                </div>
              </div>
            </div>
            <div v-if="eventData.eventAdressOption != 'Online'"  class="row q-pa-sm">
              <a class="q-pa-sm bg-deep-orange-9 rounded-borders text-white text-center col-12" style="text-decoration: none" href="#" @click="createDynamicURL" id="mapsLink">Abrir no Maps</a>
            </div>
            
          </q-card-section> 
      </q-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { QSpinner } from 'quasar'


export default {
  name: 'PageExample',


  data () {
    return {
      userFavorite: 'lar la-heart',
      heartBeat: 'animated heartBeat my-delay',
      eventOnline: false,
       date:{
        dayStart: null,
        monthStart: null,
        yearStart: null,
        weekDayStart: null
      },
      dateEnd:{
        dayEnd: null,
        monthEnd: null,
        yearEnd: null,
        weekDayEnd: null
      },
      adress: '',
      adressShow: '',
      coordinates: ''
    }
  },

   methods: {
    ...mapActions('store', ['eventsHistory', 'addFavorite']),

     showLoading () {
      this.$q.loading.show({
        spinner: QSpinner,
        spinnerColor: 'white',
        spinnerSize: 100,
        message: 'Compartilhar evento...',
        messageColor: 'white'
      })

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 3000)
    },

    share(){
      var texto = "*" + this.eventData.eventName + "*" + "\n" + "\n" + this.eventData.eventDateStart + "\n" + this.eventData.eventTime + 
                  "\n" + "\n" + this.eventData.eventDescription

      if(this.eventData.eventImg != ''){
        var  options  = { 
          message : texto, //  não compatível com alguns aplicativos (Facebook, Instagram)  
          chooserTitle : ' Compartilhar evento ' , //  Android apenas, você pode substituir o título da planilha de compartilhamento padrão 
          files: [this.eventData.eventImg],
        } 
      }else{
        var  options  = { 
          message : texto, //  não compatível com alguns aplicativos (Facebook, Instagram)  
          chooserTitle : ' Compartilhar evento ' , //  Android apenas, você pode substituir o título da planilha de compartilhamento padrão 
          files: ["https://i.ibb.co/smfDnVS/Vermelho-rvore-de-Natal-Arte-de-Natal-Cart-o-5.png"],
        } 
      }
      
       window.plugins.socialsharing.shareWithOptions (options)
    },


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

    createDynamicURL (coordinates) {
      console.log(this.coordinates)
      this.adressURL =  "geo:0, 0?q=" + this.coordinates + "Evento"
      document.getElementById('mapsLink').href = this.adressURL;
      console.log(this.adressURL)
    },

    initMap () {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        disableDefaultUI: true,
        center: new google.maps.LatLng("-14.2071", "-42.782"),
        styles:[
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#fdeac1"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
      })
     var geocoder = new google.maps.Geocoder();
     this.convertAdress(geocoder, map)
    },

    convertAdress(geocoder, map) {
      let coordinates
      var self = this
      geocoder.geocode({'address': this.adress}, function(results, status) {
        if (status === 'OK') {
          self.coordinates ="" + results[0].geometry.location.lat() + "," + results[0].geometry.location.lng()
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });

    },

    
  },

   beforeDestroy () {
    if (this.timer !== void 0) {
      clearTimeout(this.timer)
      this.$q.loading.hide()
    }
  },

  async mounted() {
    if(this.eventData.eventStatus == 1){
      this.eventsHistory(this.eventData.eventID)
    }
  

    this.checkFavorites()

    this.date.dayStart = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("D")
    this.date.monthStart = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("MMM")
    this.date.yearStart = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("YYYY")
    this.date.weekDayStart = (moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("ddd"))
    this.date.weekDayStart = this.date.weekDayStart.charAt(0).toUpperCase() + this.date.weekDayStart.slice(1)
    this.date.monthStart = this.date.monthStart.charAt(0).toUpperCase() + this.date.monthStart.slice(1)
    console.log(this.date)

    this.dateEnd.dayEnd = moment(this.eventData.eventDateEnd, "DD/MM/YYYY").format("D")
    this.dateEnd.monthEnd = moment(this.eventData.eventDateEnd, "DD/MM/YYYY").format("MMM")
    this.dateEnd.yearEnd = moment(this.eventData.eventDateEnd, "DD/MM/YYYY").format("YYYY")
    this.dateEnd.weekDayEnd = (moment(this.eventData.eventDateEnd, "DD/MM/YYYY").format("ddd"))
    this.dateEnd.weekDayEnd = this.dateEnd.weekDayEnd.charAt(0).toUpperCase() + this.dateEnd.weekDayEnd.slice(1)
    this.dateEnd.monthEnd = this.dateEnd.monthEnd.charAt(0).toUpperCase() + this.dateEnd.monthEnd.slice(1)
    console.log(this.dateEnd)

    this.adress = this.eventData.eventAdressLocalName + ', ' + this.eventData.eventAdressStreet + ', ' + this.eventData.eventAdressNumber + ', ' + this.eventData.eventAdressBairro + ', Guanambi - BA'
    this.adressShow = this.eventData.eventAdressLocalName + ', ' + this.eventData.eventAdressStreet + ', ' + this.eventData.eventAdressNumber + ', ' + this.eventData.eventAdressBairro
    if(this.eventData.eventAdressOnline){
      this.eventOnline = true
    }
    else{
      setTimeout(() => {
        console.log('teste')
        this.initMap();
      }, 500);
    }
  },

  computed: {
    ...mapGetters('store', ['userData'])
  },

  props: [
    "eventData"
  ],
  
}
</script>

<style scoped>

.img-dialog {
  width: 35;
}

#map {
  height: 300px;
  border-radius: 10px;
}

#online{
  min-height: 300px;
  height: 100%;
}

.canceledEvent {
  height: 100%;
  width: 100%;
  background-color: rgba(211, 31, 31, 0.2);
  z-index: 1;
}

.nameCanceledEvent {
  font-size: 26px;
  text-shadow: rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,
             rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px;  
  -webkit-font-smoothing: antialiased;
  
}

</style>



