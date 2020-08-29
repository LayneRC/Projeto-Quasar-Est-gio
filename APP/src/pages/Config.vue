<template>
  <q-page >

    <div class="row">
      <div class="q-pa-md app-font-bold text-grey-9" style="font-size: 3vh">Modo Escuro</div>
      <q-space/>
       <q-toggle
        v-model="fourth"
        checked-icon="check"
        color="deep-orange-9"
        unchecked-icon="clear"
        size="lg"
        
      />
    </div>

   
    
  </q-page>
</template>

<script>
export default {
  name: 'PageExample',

  data () {
    return {
      fourth: false
    }
  }
  
}
</script>

<style scoped>

</style>



