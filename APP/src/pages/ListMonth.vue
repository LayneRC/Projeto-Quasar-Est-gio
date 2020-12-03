<template>
  <q-page >

   <div class="q-pa-sm q-gutter-sm">

      <div v-for="event in eventsOrder" :key="event.eventID">
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
      eventsOrder: {}
      

    }
  },

  mounted() {
    // this.eventsMonth.sort(function (a, b) {
    //   if (a.eventDateStart > b.eventDateStart ) return 1;
    //   if (a.eventDateStart < b.eventDateStart ) return -1;
    //   return 0;
      
    // })

    this.eventsOrder = this.eventsMonth.sort((a, b) => a.eventDateStart.localeCompare(b.eventDateStart) 
                                    || a.eventTime.localeCompare(b.eventTime));

 
  },

  computed: {
    ...mapGetters('store', ['eventsMonth'])
  },
  
  
}
</script>

<style scoped>

</style>



