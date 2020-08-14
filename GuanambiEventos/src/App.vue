<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('store', ['handleAuthStateChange', 'bindEvents'])
  },

  mounted() {
    this.handleAuthStateChange()
    this.bindEvents()
  }
}
</script>
