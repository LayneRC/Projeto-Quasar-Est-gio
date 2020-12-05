<template>
  <q-page transition-show="slide-left">
    
    <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsOrderTodayCategorie" :key="event.eventID">
        <event-card :event = event />
      </div>


      

    </div>

    

    
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import { LocalStorage } from 'quasar'

export default {
  name: 'PageExample',


  data () {
    return {
      eventsList: {},
      eventsOrderTodayCategorie: {}
      
 
    }
  },

  components: {
    'event-card': require("components/EventCard.vue").default
  },

  computed: {
    ...mapGetters('store', ['eventsTodayCategorie', 'eventFilter'])
  },

  methods: {
    functionOrderTodayCategorie(){
      this.eventsOrderTodayCategorie = this.eventsList.sort((a, b) => a.eventTime.localeCompare(b.eventTime))
    }

  },

  mounted() {
    console.log(this.eventFilter)
    this.eventsList = this.eventsTodayCategorie(this.eventFilter)

    this.functionOrderTodayCategorie()
  },

  watch: {
    eventFilter: function (val) {
      this.eventsList = this.eventsTodayCategorie(this.eventFilter)

      this.functionOrderTodayCategorie()

    }
  }

  

  
}
</script>

<style scoped>


 

</style>



