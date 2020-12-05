<template>
  <q-page transition-show="slide-left">
    
    <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsOrderAllCategorie" :key="event.eventID">
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
      eventsOrderAllCategorie: {}
      

    }
  },

  components: {
    'event-card': require("components/EventCard.vue").default
  },

  computed: {
    ...mapGetters('store', ['eventsAllCategorie', 'eventFilter'])
  },

  methods: {
    functionOrderAllCategorie(){
      this.eventsOrderAllCategorie = this.eventsList.sort(function(a,b){

        var dateA = a.created
        var dateB = b.created
        var dateConvertA = dateA.toDate()
        var dateConvertB = dateB.toDate()

        console.log(dateConvertA)
        return dateConvertB - dateConvertA
      });
    }

  },

  mounted() {
    console.log(this.eventFilter)
    this.eventsList = this.eventsAllCategorie(this.eventFilter)

    this.functionOrderAllCategorie()

    
  },

  watch: {
    eventFilter: function (val) {
      this.eventsList = this.eventsAllCategorie(this.eventFilter)

      this.functionOrderAllCategorie()
    }
  }

  

  
}
</script>

<style scoped>


 

</style>



