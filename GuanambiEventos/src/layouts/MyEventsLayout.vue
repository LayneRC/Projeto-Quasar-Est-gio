<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      
      <q-toolbar class="bg-white shadow-2">
        <q-btn class="text-deep-orange-9"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-space />
        <q-space/> 
        <div class="app-font-bold text-deep-orange-9" style="margin-left: -30px; font-size: 2.5vh">Meus Eventos</div>  
        <q-space/>  
        <q-space />

      </q-toolbar> 

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
          <q-route-tab clickable exact name="todos" label="Próximos" to="/myEvents/next"/>
          <q-route-tab name="dia"  label="Passados" to="/myEvents/Past"/>
          
        </q-tabs>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :width="250"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="grey-9" name="las la-user-alt" />
              </q-item-section>

              <q-item-section class="text-grey-9" @click="$router.push('/myProfile')">
                Meu Perfil
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="grey-9" name="las la-cog" />
              </q-item-section>

              <q-item-section class="text-grey-9" @click="$router.push('/settings')">
                Configurações
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon color="grey-9" name="las la-door-open" />
              </q-item-section>

              <q-item-section class="text-grey-9">
                Sair
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <div class="absolute-top" style="height: 150px">
          <div class="absolute-bottom text-center bg-transparent">
            <div>
              <q-avatar size="80px" class="q-mb-sm">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
              <div class="text-weight-bold text-grey-9">Razvan Stoenescu</div>
              <div class=" q-mb-sm text-grey-8">@rstoenescu</div>
            </div>
            
            <q-separator inset color="deep-orange-9"/>
          </div>
          
        </div>

        <div class="absolute-bottom text-right q-mr-sm q-mb-sm text-grey-7">v 1.0</div>
      </q-drawer>
      

    <q-page-container class="bg-grey-1 app-font-light">
      <router-view />
      <q-page-sticky position="bottom-right" :offset="[18, 18]"  clickable @click="$router.push('/newEvent')">
        <q-btn elevated fab icon="add" color="deep-orange-9" class="shadow-4"/>
      </q-page-sticky>
    </q-page-container>

    <q-footer>
        <q-tabs
          no-caps
          dense
          align="justify"
          v-model="selectedTab"
          switch-indicator
          indicator-color="deep-orange-9"
          active-color="deep-orange-9"
          :breakpoint="0"
          class="bg-white app-font-bold text-grey-7 shadow-2"
          >
          <q-route-tab clickable exact name="home" icon="las la-home" label="Home" to="/"/>
          <q-route-tab name="meusEventos" icon="las la-calendar-alt" label="Meus Eventos" to=""/>
          <q-route-tab clickable exact name="favoritos" icon="lar la-heart" label="Favoritos" to="/favorites"/>
          
        </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  
  data () {
    return {
      drawer: false,
      tab: 'home'
      
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
