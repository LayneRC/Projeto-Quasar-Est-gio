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
    this.eventsOrderAll = this.events.sort(function(a,b){

      var dateA = a.created
      var dateB = b.created
      var dateConvertA = dateA.toDate()
      var dateConvertB = dateB.toDate()

      console.log(dateConvertA)
      return dateConvertB - dateConvertA
      });
    

  }

  
}
</script>

<style scoped>


 

</style>



