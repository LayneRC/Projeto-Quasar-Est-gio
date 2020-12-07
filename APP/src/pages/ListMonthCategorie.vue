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
    ...mapGetters('store', ['eventsMonthCategorie', 'eventFilter'])
  },

  mounted() {
    console.log(this.eventFilter)
    this.eventsList = this.eventsMonthCategorie(this.eventFilter)
  },

  watch: {
    eventFilter: function (val) {
      this.eventsList = this.eventsMonthCategorie(this.eventFilter)
    }
  }

  

  
}
</script>

<style scoped>


 

</style>



