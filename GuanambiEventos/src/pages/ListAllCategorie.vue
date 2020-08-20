<template>
  <q-page transition-show="slide-left">
    
    <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsList" :key="event.eventID">
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
      eventsList: {}
      

    }
  },

  components: {
    'event-card': require("components/EventCard.vue").default
  },

  computed: {
    ...mapGetters('store', ['eventsCategorie'])
  },

  mounted() {
    console.log(LocalStorage.getItem('filter'))
    this.eventsList = this.eventsCategorie(LocalStorage.getItem('filter'))
  },

  watch: {

  }

  

  
}
</script>

<style scoped>


 

</style>



