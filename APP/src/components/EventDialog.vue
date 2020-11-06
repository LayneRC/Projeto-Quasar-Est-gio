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
              <div class="text-grey-9 titulo app-font-bold q-pt-sm q-px-md">
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
                  <div class="text-grey-8">
                    {{date.weekDay +', '+date.day+' '+date.month+' '+date.year}}
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
                <div class="text-grey-8 flex flex-center q-ml-sm">Gratuito</div>
              </div>
            </div>
      
          </q-card-section>

          <q-separator inset class="q-my-md"/>

          <q-card-section >
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
              <div v-if="!eventOnline" class="text-grey-9 text-caption q-px-md">{{adressShow}}</div>
              <div v-if="!eventOnline" class="q-pa-sm">
                <div id="map"></div>
              </div>
              <div v-if="eventOnline" class="q-pa-sm flex flex-center" id="online">
                <div class="text-center">
                  <q-icon name="las la-at" size="150px" color="grey-8"/>
                  <div class="text-grey-9 text-h6">O evento é online!</div>
                  <div class="text-grey-9 text-subtitle1">{{ eventData.eventAdressOnline }}</div>
                </div>
              </div>
            </div>
            <div class="row q-pa-sm">
              <a class="q-pa-sm bg-deep-orange-9 rounded-borders text-white text-center col-12" style="text-decoration: none" href="#" @click="createDynamicURL" id="mapsLink">Abrir no Maps</a>
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
      },
      adress: '',
      adressShow: '',
      coordinates: ''
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

  async mounted() {
    this.eventsHistory(this.eventData.eventID),

    this.checkFavorites()
    this.date.day = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("D")
    this.date.month = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("MMM")
    this.date.year = moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("YYYY")
    this.date.weekDay = (moment(this.eventData.eventDateStart, "DD/MM/YYYY").format("ddd"))
    this.date.weekDay = this.date.weekDay.charAt(0).toUpperCase() + this.date.weekDay.slice(1)
    this.date.month = this.date.month.charAt(0).toUpperCase() + this.date.month.slice(1)
    console.log(this.date)
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

</style>



