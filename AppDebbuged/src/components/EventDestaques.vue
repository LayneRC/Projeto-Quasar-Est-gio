<template>
  <div >

      <q-card  class="my-card" style="width: 250px"  @click="dialogCard = true" >
            <q-img
              :ratio="1.2"
              :src="event.eventImg"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                {{ event.eventName}}
              </div>
            </q-img>   
            <q-card-section class=" items-center row">
              <div class="row q-mt-sm q-ml-sm col-auto">
                <q-icon name="las la-calendar" size="25px" color="grey-6" class="q-mt-xs"/>
                <div class="q-ml-xs app-font-light">
                  <div>
                    {{ event.eventDateStart }}
                  </div>
                  <div class="text-caption">
                    {{ event.eventTime }}
                  </div>
                </div>
              </div>
              <q-space/>
              <div class="col-auto">
                <q-icon @click.stop="addFavorite(event.eventID); handleFavIcon();" :class="heartBeat" :name= userFavorite color="red" size="25px" class="q-mr-sm" />
                <q-icon color="blue-9" size="25px" name="o_share" class="q-mr-sm"/>
              </div>
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
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'PageExample',

  data () {
    return {
      dialogCard: false,
      maximizedToggleCard: true,
      userFavorite: 'lar la-heart',
      heartBeat: 'none'

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
