<template>
  <q-page >

     <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsUserNext" :key="event.eventID">
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
    ...mapGetters('store', ['eventsUserNext'])
  },

  

  mounted () {
    console.log(LocalStorage.getItem('loggedInUser'))
    console.log(this.eventsUserNext)

   


  }

  
  
}
</script>

<style scoped>

</style>



