<template>
  <div >

      <q-card  class="my-card" style="width: 250px"  @click="dialogCard = true" >
            <div v-if="eventData.eventStatus == 3" class="absolute canceledEvent flex flex-center">
              <div class="nameCanceledEvent text-bold text-red-10">
                CANCELADO
              </div>
            </div>
            <q-img
              :ratio="1.2"
              :src="eventData.eventImg"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                {{eventData.eventName}}
              </div>
            </q-img>   
            <q-card-section class=" items-center row">
              <div class="row q-mt-sm q-ml-sm col-auto">
                <q-icon name="las la-calendar" size="25px" color="grey-6" class="q-mt-xs"/>
                <div class="q-ml-xs app-font-light">
                  <div>
                    {{ eventData.eventDateStart }}
                  </div>
                  <div class="text-caption">
                    {{ eventData.eventTime }}
                  </div>
                </div>
              </div>
              <q-space/>
              <div class="col-auto">
                <q-icon @click.stop="addFavorite(eventData.eventID); handleFavIcon();" :class="heartBeat" :name= userFavorite color="red" size="25px" class="q-mr-sm" />
                <q-icon color="blue-9" size="25px" name="o_share" class="q-mr-sm"/>
              </div>
            </q-card-section> 

            <q-dialog
                v-model="dialogCard"
                :maximized="maximizedToggleCard"
                transition-show="scale"
                transition-hide="scale"
                >
                <event-dialog :eventData = this.eventData />
            </q-dialog>

          </q-card>

   
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'PageExample',

  data () {
    return {
      dialogCard: false,
      maximizedToggleCard: true,
      eventData: null,
      userFavorite: 'lar la-heart',
      heartBeat: 'none',
      favoriteEvents: {}
    }
  },

  computed: {
    ...mapGetters('store', ['eventFinder', 'userData']),

    favoritesComputed:function() {
       var self = this
       return this.userData.favorites
    },
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
      if (this.userData.favorites.includes(this.event)){
        this.userFavorite = 'las la-heart'
        this.heartBeat = 'animated heartBeat my-delay'
      }
      else{
        this.userFavorite = 'lar la-heart'
        this.heartBeat = 'none'
      }
    },
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
  ],

  mounted() {
    this.checkFavorites()
    this.eventData = this.eventFinder(this.event)
    console.log(this.eventData)
  }
  
}
</script>

<style scoped>

.canceledEvent {
  height: 100%;
  width: 100%;
  background-color: rgba(211, 31, 31, 0.2);
  z-index: 1;
}

.nameCanceledEvent {
  font-size: 26px;
  margin-top: -40px;
  text-shadow: rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,
             rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px,   rgb(255, 255, 255) 0px 0px 4px;  
  -webkit-font-smoothing: antialiased;
  
}

</style>
