<template>
  <q-page transition-show="slide-left">
    
    <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsOrderMonthCategorie" :key="event.eventID">
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
      eventsOrderMonthCategorie: {}
      

    }
  },

  components: {
    'event-card': require("components/EventCard.vue").default
  },

  computed: {
    ...mapGetters('store', ['eventsMonthCategorie', 'eventFilter'])
  },

  methods: {
    functionOrderMonthCategorie(){
      this.eventsOrderMonthCategorie = this.eventsList.sort((a, b) => a.eventDateStart.localeCompare(b.eventDateStart) 
                                    || a.eventTime.localeCompare(b.eventTime));
    }

  },

  mounted() {
    console.log(this.eventFilter)
    this.eventsList = this.eventsMonthCategorie(this.eventFilter)

    this.functionOrderMonthCategorie()
  },

  watch: {
    eventFilter: function (val) {
      this.eventsList = this.eventsMonthCategorie(this.eventFilter)

      this.functionOrderMonthCategorie()

    }
  }

  

  
}
</script>

<style scoped>


 

</style>



