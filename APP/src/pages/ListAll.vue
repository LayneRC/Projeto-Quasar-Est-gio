<template>
  <q-page transition-show="slide-left">
    
    <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in events" :key="event.eventID">
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
      
      

    }
  },

  
}
</script>

<style scoped>


 

</style>



