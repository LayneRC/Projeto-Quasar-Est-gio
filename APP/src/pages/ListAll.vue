<template>
  <q-page transition-show="slide-left">
    
    <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsOrderAll" :key="event.eventID">
        <event-card :event = event />
      </div>


      

    </div>

    

    
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'PageExample',

  components: {
    'event-card': require("components/EventCard.vue").default
  },

  computed: {
    ...mapGetters('store', ['events']),
    
  },

  data () {
    return {
      eventsOrderAll: {}
      
      

    }
  },

  mounted() {
    this.eventsOrderAll = this.events.sort(function(a,b) {
      var dateA = a.createdAt
      var dateB = b.createdAt
      console.log(dateA)
      var dateConvertedA = dateA.toDate()
      var dateConvertedB = dateB.toDate()

      return dateConvertedB - dateConvertedA
    })
  }

  
}
</script>

<style scoped>


 

</style>



