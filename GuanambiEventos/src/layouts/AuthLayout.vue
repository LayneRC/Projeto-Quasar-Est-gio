<template>
  <q-layout view="lHh Lpr lFf">
    

    <q-page-container class=" app-font-light">
      <router-view />
    </q-page-container>

    
  </q-layout>
</template>

<script>

export default {
  name: 'AuthLayout',

  
  data () {
    return {
      drawer: false,
      tab: 'home'
      
    }
  }
}
</script>

<style scoped>



</style>
