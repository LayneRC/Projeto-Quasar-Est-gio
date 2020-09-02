<template>
  <q-page >

     <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsUserPast" :key="event.eventID">
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

  components: {
    'event-card': require("components/MyEventCard.vue").default
  },

  data () {
    return {
      
    }
  },

  computed: {
    ...mapGetters('store', ['eventsUserPast'])
  },

  

  mounted () {

  }

  
  
}
</script>

<style scoped>

</style>



