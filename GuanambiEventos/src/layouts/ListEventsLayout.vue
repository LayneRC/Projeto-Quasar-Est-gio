<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-bar class="bg-white q-pa-sm text-white" style="height: 6vh">
        <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="15px" to="/index">
        </q-btn> 
        <q-space/> 
        <div class="app-font-bold text-deep-orange-9" style="margin-left: -30px">Eventos</div>  
        <q-space/>         
      </q-bar>
      <q-tabs
          no-caps
          dense
          align="justify"
          v-model="selectedTab"
          switch-indicator
          indicator-color="deep-orange-9"
          active-color="deep-orange-9"
          :breakpoint="0"
          class="bg-white app-font-bold text-grey-7 shadow-1"
          >
          <q-route-tab clickable exact name="todos" label="Todos" to="/list/all"/>
          <q-route-tab name="dia"  label="Dia" to="/list/day"/>
          <q-route-tab name="mês" label="Mês" to="/list/month"/>
          
        </q-tabs>
      
    </q-header>

    
      

    <q-page-container class="bg-grey-1 app-font-light">
      <router-view />
    </q-page-container>

    <q-footer>
        
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'ListEventsLayout',

  
  data () {
    return {
      tab: 'todos'
      
    }
  }
}
</script>

<style>

.q-tab__indicator{
  height: 1px !important;
  border-radius: 0px;
}

.q-tab__content {
  z-index: 0;
  position: relative;
  margin-top: 0px;
}

.q-tabs {
  background: white !important;
  border-radius: 0px;
  font-weight: bold !important;
}

.tab-panels {
  border-radius: 0px !important;
}

.q-tab-panel {
  margin-top: 0x !important;
}

</style>
