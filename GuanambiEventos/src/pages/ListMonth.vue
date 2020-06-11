<template>
  <q-page >

   <div class="q-pa-sm q-gutter-sm">
      <q-card v-for="n in 4" :key="n" class="my-card q-pa-sm" flat bordered @click="dialogCard = true">
        <q-card-section horizontal>
          <q-img
            class="col-5"
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            :ratio="1"
            style="border-radius: 3px"
            
          />

          <q-card-section class=" q-ml-md">
            <div class="text-deep-orange-9  app-font-bold">
              seg, 08 jun 2020 - 19:00
            </div>
            <div class="app-font-bold text-grey-9" style="font-size: 3vh">
              Nome do evento
            </div>
            <div class="app-font-light">
              Localização
            </div>
            <div class="row absolute-bottom reverse">
              <q-icon class="q-ml-md" name="o_share" size="27px" color="blue-7"/>
              <q-icon name="lar la-heart" size="27px" color="red"/>
            </div>
          </q-card-section>
        </q-card-section>
      </q-card>

    </div>

    <q-dialog
      v-model="dialogCard"
      persistent
      :maximized="maximizedToggleCard"
      transition-show="scale"
      transition-hide="scale"
      >
      <event-dialog/>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageExample',

  components: {
    'event-dialog': require("components/EventDialog.vue").default
  },

  data () {
    return {
      dialogCard: false,
      maximizedToggleCard: true,

    }
  },
  
}
</script>

<style scoped>

</style>



