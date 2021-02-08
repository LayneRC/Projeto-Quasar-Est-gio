<template>
  <q-page class="bg-grey-1 q-pa-md">
    <div class="bg-grey-1">
      <div class="row flex flex-center">
        <div class="flex flex-center">
          <q-tabs
            indicator-color="deep-orange-9"
            active-color="deep-orange-9"
            inline-label
            class="q-py-sm"
            align="center">
            <q-route-tab to="" name="inicio" label="Próximos" icon="list" />
            <q-route-tab to="/myEvents/past" name="passados" label="Passados" icon="check_circle_outline" />
          </q-tabs>

        </div>
        
        <div class="absolute-right q-mt-lg q-mr-xl">
          <q-btn color="deep-orange-9" icon="add" label="Cadastrar evento" @click="$router.push('/newEvents')"  />
        </div>

      </div>
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
