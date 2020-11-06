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
        <q-toolbar-title class=" text-deep-orange-9 app-font-bold">
          SECEL
        </q-toolbar-title>
        <q-space />

      </q-toolbar> 
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

              <q-item-section class="text-grey-9" @click="$router.push('/myProfile')" >
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

              <q-item-section class="text-grey-9" @click="loggoutUser">
                Sair
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>

        <div class="absolute-top" style="height: 150px">
          <div class="absolute-bottom text-center bg-transparent">
            <div>
              <q-avatar size="80px" class="q-mb-sm">
                <img :src="userData.userUrlImage">
              </q-avatar>
              <div class="text-weight-bold text-grey-9">{{ userData.userName }}</div>
              <div class=" q-mb-sm text-grey-8">{{ userData.userEmail }}</div>
            </div>
            
          </div>
          
        </div>

        <div class="absolute-bottom text-right q-mr-sm q-mb-sm text-grey-7">v 1.0</div>
      </q-drawer>
      

    <q-page-container class="bg-grey-1 app-font-light">
      <router-view />
    </q-page-container>

    <q-footer>
        <q-tabs
          no-caps
          dense
          align="justify"
          switch-indicator
          indicator-color="deep-orange-9"
          active-color="deep-orange-9"
          :breakpoint="0"
          class="bg-white app-font-bold text-grey-7 shadow-2"
          >
          <q-route-tab clickable exact name="home" icon="las la-home" label="Home" to="/"/>
          <q-route-tab name="meusEventos" icon="las la-calendar-alt" label="Meus Eventos" to="/myEvents/next"/>
          <q-route-tab clickable exact name="favoritos" icon="lar la-heart" label="Favoritos" to="/favorites"/>
          
        </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'


export default {
  name: 'MainLayout',

  
  data () {
    return {
      drawer: false,
      tab: 'home'
      
    }
  },

  methods: {
    ...mapActions('store', ['loggoutUser'])
  },

   computed: {
    ...mapGetters('store', ['userData'])
  },

}
</script>

<style>

</style>
