<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      
      <q-toolbar class="bg-white shadow-2">
        <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="15px" to="/index">
        </q-btn> 

        <q-space />
        <q-space/> 
        <div class="app-font-bold text-deep-orange-9" style="margin-left: -30px; font-size: 2.5vh">Configurações</div>  
        <q-space/>  
        <q-space />

      </q-toolbar> 

       
    </q-header>

    
      

    <q-page-container class="bg-grey-1 app-font-light">
      <router-view />
    </q-page-container>

   
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  
  data () {
    return {
     
      
    }
  }
}
</script>

<style>


</style>
