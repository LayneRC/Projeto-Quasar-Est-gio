<template>
  <q-page >

    <div class="q-pa-sm q-gutter-sm">

      <div v-for="event in eventsDayOrder" :key="event.eventID">
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

  data () {
    return {
      eventsDayOrder: {}
      
    }
  },

  computed: {
    ...mapGetters('store', ['eventsToday']),

    // filteredEvents:function() {
    //    var self = this
    //    return this.eventsToday.filter(function(event){return event.eventTime.toLowerCase().indexOf(self.search.toLowerCase())>=0;}).sort(self.orderDay);
    //    //return this.customers;
    // },
  },

  methods: {

    
    // orderDay(a, b) {
    //   // Use toUpperCase() to ignore character casing
    //   const itemA = a.eventTime;
    //   const itemB = b.eventTime;

    //   let comparison = 0;
    //   if (itemA > itemB) {
    //     comparison = 1;
    //   } else if (itemA < itemB) {
    //     comparison = -1;
    //   }
    //   return comparison;
    // },

    
 
  },

  mounted() {
    this.eventsDayOrder = this.eventsToday.sort((a, b) => a.eventTime.localeCompare(b.eventTime))
                                   
  }

  
}
</script>

<style scoped>

</style>



