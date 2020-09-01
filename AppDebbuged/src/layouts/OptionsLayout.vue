<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container class="bg-grey-1" >
      <transition
        enter-active-class="animated fast fadeIn"
        appear
        >
        <router-view />
      </transition>
    </q-page-container>

  </q-layout>
</template>

<script>

export default {
  name: 'OptionsLayout',
}
</script>

<style>


</style>

