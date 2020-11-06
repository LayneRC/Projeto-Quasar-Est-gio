<template>
  <q-page class="flex flex-center">
    <div class="text-center">
    <q-spinner-tail size="50px" color="deep-orange-9" />
    <div class="q-mt-sm app-font-bold text-deep-orange-9" style="font-size: 2.5vh">Carregando Eventos :D</div>
    </div>
    
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {

  data() {
    return {
      visible: true
    }
  },
  methods: {
    ...mapActions('store', ['bindEvents', 'bindUserData']),

    async loadData(){
      await Promise.allSettled([this.bindEvents(), this.bindUserData()])
      var self = this
      setTimeout(function(){ self.$router.push('/') }, 3000);
    }
  },

  mounted() {
    this.loadData()
  }
}
</script>

<style scoped>

</style>



