<template>
  <div >

   <q-card class="my-card q-pa-sm" flat bordered @click="dialogCard = true" >
      <div v-if="event.eventCancel == 1" class="absolute canceledEvent flex flex-center">
        <div class="nameCanceledEvent text-bold text-red-10">
          CANCELADO
        </div>
      </div>
        <q-card-section horizontal>
          <q-img v-if="event.eventImg != ''"
            class="col-5"
            :src="event.eventImg"
            :ratio="1"
            style="border-radius: 3px"
            
          />

          <q-img v-if="event.eventImg == ''"
            class="col-5"
            src="https://i.ibb.co/smfDnVS/Vermelho-rvore-de-Natal-Arte-de-Natal-Cart-o-5.png"
            :ratio="1"
            style="border-radius: 3px"
            
          />

          <q-card-section class="full-width ">
            <div class="text-deep-orange-9 app-font-bold q-ml-sm">
              {{date.weekDay +', '+date.day+' '+date.month+' '+date.year}}
              <br>
              {{event.eventTime}}
            </div>
            <div class="divName app-font-bold text-grey-9 text-justify q-ml-sm" style="font-size: 16px">
              {{ event.eventName }}
            </div>
            <div v-if="!eventOnline" class="app-font-light q-ml-sm">
              {{ event.eventAdressLocalName }}
            </div>
            <div v-if="eventOnline" class="app-font-light q-ml-sm">
              Online
            </div>
            <div class="row absolute-bottom reverse">
              <q-icon  @click.stop="showLoading(), share()" class="q-ml-md" name="o_share" size="27px" color="blue-9"/>
              <q-icon @click.stop="addFavorite(event.eventID); handleFavIcon();" :class="heartBeat" :name= userFavorite size="27px" color="red"/>
            </div>
          </q-card-section>
        </q-card-section>

        <q-dialog
          v-model="dialogCard"
          :maximized="maximizedToggleCard"
          transition-show="scale"
          transition-hide="scale"
          >
          <event-dialog :eventData = this.event />
        </q-dialog>

      </q-card>
    
  </div>
</template>

<script>
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { QSpinner } from 'quasar'


export default {
  name: 'PageExample',

   data () {
    return {
      dialogCard: false,
      maximizedToggleCard: true,
      eventOnline: false,
      userFavorite: 'lar la-heart',
      heartBeat: 'animated heartBeat my-delay',
      date:{
        day: null,
        month: null,
        year: null,
        weekDay: null
      },
      favoriteEvents: {}


    }
  },

  computed: {
    ...mapGetters('store', ['userData']),

    favoritesComputed:function() {
       var self = this
       return this.userData.favorites
    },
  },

  methods: {
    ...mapActions('store', ['addFavorite']),

    showLoading () {
      this.$q.loading.show({
        spinner: QSpinner,
        spinnerColor: 'white',
        spinnerSize: 100,
        message: 'Compartilhar evento...',
        messageColor: 'white',
      })

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 3000)
    },

    share(){
      var texto = "*" + this.event.eventName + "*" + "\n" + "\n" + this.event.eventDateStart + "\n" + this.event.eventTime + 
                  "\n" + "\n" + this.event.eventDescription

      if(this.event.eventImg != ''){
        var  options  = { 
          message : texto, //  não compatível com alguns aplicativos (Facebook, Instagram)  
          chooserTitle : ' Compartilhar evento ' , //  Android apenas, você pode substituir o título da planilha de compartilhamento padrão 
          files: [this.event.eventImg],
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
      if (this.userData.favorites.includes(this.event.eventID)){
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
    this.checkFavorites()
    this.date.day = moment(this.event.eventDateStart, "DD/MM/YYYY").format("D")
    this.date.month = moment(this.event.eventDateStart, "DD/MM/YYYY").format("MMM")
    this.date.year = moment(this.event.eventDateStart, "DD/MM/YYYY").format("YYYY")
    this.date.weekDay = (moment(this.event.eventDateStart, "DD/MM/YYYY").format("ddd"))
    this.date.weekDay = this.date.weekDay.charAt(0).toUpperCase() + this.date.weekDay.slice(1)
    this.date.month = this.date.month.charAt(0).toUpperCase() + this.date.month.slice(1)
    console.log(this.date)
    if(this.event.eventAdressOnline){
      this.eventOnline = true
    }

    // var i;
    // var divs = document.getElementById('divName');
    // for(i=0;i<divs.length;i++) {
    // if(divs[i].className == 'myclass') {
    // divs[i].innerHTML = divs[i].innerHTML.substring(0,300);
  

  },

  watch: {
    favoritesComputed: function (val) {
      this.checkFavorites()
      // this.favoriteEvents = this.userData.favorites
      console.log(val)
    }
  },

  components: {
    'event-dialog': require("components/EventDialog.vue").default
  },

  props: [
      "event"
  ]
  
}
</script>

<style scoped>

.canceledEvent {
  height: 100%;
  width: 100%;
  background-color: rgba(211, 31, 31, 0.2);
  z-index: 1;
  margin-top: -8px;
  margin-left: -8px;
}

.nameCanceledEvent {
  font-size: 26px;
 
  text-shadow: rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,
             rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px;  
  -webkit-font-smoothing: antialiased;
  
}

.divName{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
