<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions('store', ['bindEvents', 'handleAuthStateChange'])
  },

  mounted () {
    this.handleAuthStateChange()
    this.bindEvents()
  }
}
</script>
