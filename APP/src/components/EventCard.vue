<template>
  <div >

   <q-card class="my-card q-pa-sm" flat bordered @click="dialogCard = true" >
        <q-card-section horizontal>
          <q-img
            class="col-5"
            :src="event.eventImg"
            :ratio="1"
            style="border-radius: 3px"
            
          />

          <q-card-section class="full-width ">
            <div class="text-deep-orange-9 app-font-bold q-ml-sm">
              {{date.weekDay +', '+date.day+' '+date.month+' '+date.year}}
              <br>
              {{event.eventTime}}
            </div>
            <div class="app-font-bold text-grey-9 q-ml-sm" style="font-size: 3vh">
              {{ event.eventName }}
            </div>
            <div v-if="!eventOnline" class="app-font-light q-ml-sm">
              {{ event.eventAdressLocalName }}
            </div>
            <div v-if="eventOnline" class="app-font-light q-ml-sm">
              Online
            </div>
            <div class="row absolute-bottom reverse">
              <q-icon class="q-ml-md" name="o_share" size="27px" color="primary"/>
              <q-icon @click.stop="addFavorite(event.eventID); handleFavIcon();" :class="heartBeat" :name= userFavorite size="27px" color="red"/>
            </div>
          </q-card-section>
        </q-card-section>

        <q-dialog
          v-model="dialogCard"
          persistent
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
      }

    }
  },

  computed: {
    ...mapGetters('store', ['userData'])
  },

  methods: {
    ...mapActions('store', ['addFavorite']),

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

</style>
