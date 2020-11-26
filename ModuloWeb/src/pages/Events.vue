<template>
  <q-page class="bg-grey-1 q-pa-md">
    <div class="bg-grey-1">
      <q-tabs
      indicator-color="deep-orange-9"
      active-color="deep-orange-9"
      inline-label
      class="q-py-sm"
      align="center">
        <q-route-tab to="/events/pendent" name="inicio" label="Pendentes" icon="list" />
        <q-route-tab to="/events/approved" name="pendentes" label="Aprovados" icon="check_circle_outline" />
        <q-route-tab to="/events/reproved" name="reprovados" label="Reprovados" icon="highlight_off" />
    </q-tabs>

    <q-separator inset class="q-mb-md"/>

    <router-view/>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
