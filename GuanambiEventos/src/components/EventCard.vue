<template>
  <div >

   <q-card class="my-card q-pa-sm" flat bordered @click="dialogCard = true" >
        <q-card-section horizontal>
          <q-img
            class="col-5"
            :src="event.eventImg"
            :ratio="1"
            style="border-radius: 3px"
            
          />

          <q-card-section class="full-width ">
            <div class="text-deep-orange-9 app-font-bold q-ml-sm">
              {{ event.eventDateStart + " - " + event.eventTime}}
            </div>
            <div class="app-font-bold text-grey-9 q-ml-sm" style="font-size: 3vh">
              {{ event.eventName }}
            </div>
            <div class="app-font-light q-ml-sm">
              {{ event.eventAdressLocalName }}
            </div>
            <div class="row absolute-bottom reverse">
              <q-icon class="q-ml-md" name="o_share" size="27px" color="primary"/>
              <q-icon name="lar la-heart" size="27px" color="red"/>
            </div>
          </q-card-section>
        </q-card-section>

        <q-dialog
          v-model="dialogCard"
          persistent
          :maximized="maximizedToggleCard"
          transition-show="scale"
          transition-hide="scale"
          >
          <event-dialog :eventData = this.event />
        </q-dialog>

      </q-card>
    
  </div>
</template>

<script>
export default {
  name: 'PageExample',

   data () {
    return {
      dialogCard: false,
      maximizedToggleCard: true,

    }
  },

  components: {
    'event-dialog': require("components/EventDialog.vue").default
  },

  props: [
      "event"
  ]
  
}
</script>

<style scoped>

</style>
