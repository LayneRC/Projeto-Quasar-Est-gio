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
import { LocalStorage } from 'quasar'


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
    if( LocalStorage.getItem('att') == true){
      LocalStorage.set('att', false)
    }

    // if (LocalStorage.getItem('att')) {
    //     // The page was just reloaded. Clear the value from local storage
    //     // so that it will reload the next time this page is visited.
    //   LocalStorage.clear('att');
    // } else {
    //     // Set a flag so that we know not to reload the page twice.
    //     LocalStorage.setItem('att', '1');
    //     location.reload()
    // }

    this.loadData()

  }
}
</script>

<style scoped>

</style>



