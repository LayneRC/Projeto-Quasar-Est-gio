<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
      <q-header class="bg-deep-orange-9">
        <q-toolbar>
          <q-avatar square>
            <img src="https://image.flaticon.com/icons/svg/1142/1142731.svg">
          </q-avatar>

          <q-toolbar-title class="text-h5 text-bold">GBI Eventos</q-toolbar-title>

          <q-icon name="account_circle" class="text-white q-mr-sm" style="font-size: 2em;" />
          <div class="text-h6 q-mr-md">Administrador</div>
          <q-btn @click="loggoutUser" flat round dense icon="exit_to_app" />
        </q-toolbar>

        <q-separator class="q-my-sm" inset/>

      
        <div class="row">
          <q-tabs
          indicator-color="white"
          active-color="white"
          inline-label
          class="col-8"
          align="left">
            <q-route-tab to="/" name="inicio" label="Inicio" icon="home" />
            <q-route-tab to="/events/" name="events" label="Gerenciar eventos" icon="assignment_turned_in" />
            <q-route-tab to="/myEvents/" name="myEvents" label="Meus eventos" icon="event" />
            <q-route-tab to="/users" name="usuarios" label="Gerenciar usuários" icon="supervisor_account" />
          </q-tabs>
        </div>
      </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainLayout',
  data () {
    return {

    }
  },

  methods: {
    ...mapActions('store', ['loggoutUser'])
  }
}
</script>
