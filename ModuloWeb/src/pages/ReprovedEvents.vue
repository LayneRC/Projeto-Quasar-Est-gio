<template>
  <q-page class="q-pa-lg">
    <div class="row col-12 justify-center q-mb-md">
      <div class="col-4">
        <q-input outlined v-model="search" placeholder="Pesquisar">
          <template v-slot:append>
              <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row justify-evenly q-gutter-lg">
      <div v-for="event in filteredEvents" :key="event.eventID">
        <event-card :eventData = event></event-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageIndex',

  data () {
    return {
      search: ''
    }
  },

  components: {
    'event-card': require('components/EventCard.vue').default
  },

  computed: {
    ...mapGetters('store', ['reprovedEvents']),
    filteredEvents: function () {
      var self = this
      return this.reprovedEvents.filter(function (event) { return event.eventName.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 })
    }
  }
}
</script>
