<template>
  <q-page >

   <div class="q-pa-sm q-gutter-sm">

      <div v-for="event in eventsMonth" :key="event.eventID">
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

  data () {
    return {
      

    }
  },

  computed: {
    ...mapGetters('store', ['eventsMonth'])
  },
  
  
}
</script>

<style scoped>

</style>



