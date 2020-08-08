<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('store', ['handleAuthStateChange'])
  },

  mounted() {
    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>
