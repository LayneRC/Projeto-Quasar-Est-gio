<template>
  <q-page >
     <div class="q-pa-sm q-gutter-sm">
      <div v-for="event in eventsUserPast" :key="event.eventID">
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
      space: false
    }
  },

  computed: {
    ...mapGetters('store', ['eventsUserPast'])
  },

  mounted () {
    if(this.eventsUserPast.length > 1){
      this.space = true
    }

  }

  
  
}
</script>

<style scoped>

</style>



