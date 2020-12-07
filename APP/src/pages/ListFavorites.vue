<template>
  <q-page transition-show="slide-left">

    <div v-if="!userData.favorites.length" class=" text-center flex flex-center grey-6 app-font-light" style="height: 15vh">
      Não há favoritos
    </div>
    
    <div v-if="userData.favorites.length" class="q-pa-sm q-gutter-sm">
      <transition-group
        appear
        enter-active-class="animated bounceIn"
        leave-active-class="animated zoomOutRight">
        <div v-for="event in userData.favorites.slice().reverse()" :key="event">
          <event-card :event = event />
        </div>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageExample',

  components: {
    'event-card': require("components/EventCardFavorite.vue").default
  },

  computed: {
    ...mapGetters('store', ['userData'])
  },

  data () {
    return {
      
      

    }
  },

  
}
</script>

<style scoped>


 

</style>



