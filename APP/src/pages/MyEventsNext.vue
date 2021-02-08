<template>
  <q-page >
     <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsOrderAll" :key="event.eventID">
        <event-card :event = event />
      </div>
    </div>
    <div v-if="space" style="min-height: 80px"/>
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
      space: false,
      eventsOrderAll: {}
    }
  },

  computed: {
    ...mapGetters('store', ['eventsUserNext'])
  },

  

  mounted () {
    console.log(LocalStorage.getItem('loggedInUser'))
    console.log(this.eventsUserNext)

    if(this.eventsUserNext.length > 1){
      this.space = true
    }

    this.eventsOrderAll = this.eventsUserNext.sort(function(a,b) {
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



