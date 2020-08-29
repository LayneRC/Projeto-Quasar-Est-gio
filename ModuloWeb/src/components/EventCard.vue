<template>
  <div class="col-3">
    <q-card @click="detailsDialog = true" class="my-card col-md-12 cursor-pointer grow" style="min-width: 400px; width: 100%;">
      <q-img :src="eventData.eventImg" basic :ratio="16/9"/>
      <q-card-section class="bg-deep-orange-9 text-white">
        <div class="text-h6">{{eventData.eventName}}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn @click.stop="changeEventStatus(2)" v-if="eventData.eventStatus != 2" flat class="text-red" icon="close">Reprovar</q-btn>
        <q-btn @click.stop="changeEventStatus(1)" v-if="eventData.eventStatus != 1" flat class="text-green" icon="done">Aprovar</q-btn>
      </q-card-actions>
    </q-card>

    <q-dialog v-model="detailsDialog">
      <q-card style="width: 600px; max-width: 80vw;">
        <q-img :src="eventData.eventImg" basic :ratio="16/9"/>
        <q-card-section>
          <div class="text-h6">{{eventData.eventName}}</div>
          <div class="text-subtitle-2">{{eventData.eventCategorie}}</div>
        </q-card-section>

        <q-card-section>
          <div class="text-bold">Entrada:</div>
          <div class="text-subtitle-2 q-ml-md">{{eventData.eventEntrace}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-bold">Data:</div>
          <div class="q-ml-md">{{eventData.eventDateStart}} - {{eventData.eventDateEnd}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-bold">Horário:</div>
          <div class="q-ml-md">{{eventData.eventTime}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-if="!eventData.eventAdressOnline" class="text-bold">Endereço:</div>
          <div v-if="eventData.eventAdressOnline" class="text-bold">Endereço Online:</div>
          <div class="q-ml-md">{{eventData.eventAdressLocalName}}</div>
          <div v-if="eventData.eventAdressOnline" class="q-ml-md">{{eventData.eventAdressOnline}}</div>
          <div v-if="!eventData.eventAdressOnline" class="q-ml-md">{{eventData.eventAdressStreet}}, {{eventData.eventAdressNumber}}, {{eventData.eventAdressBairro}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-bold">Descrição:</div>
          <div class="q-ml-md">{{eventData.eventDescription}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-bold">Responsavel: </div>
          <div class="q-ml-md">{{eventData.eventNameResponsible}}</div>
          <div class="q-ml-md">{{eventData.eventWhatsappResponsible}}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn @click.stop="changeEventStatus(2)" v-if="eventData.eventStatus != 2" flat class="text-red" icon="close">Reprovar</q-btn>
          <q-btn @click.stop="changeEventStatus(1)" v-if="eventData.eventStatus != 1" flat class="text-green" icon="done">Aprovar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped>
  .grow { transition: all .2s ease-in-out; }
  .grow:hover { transform: scale(1.03); }
</style>

<script>
import { db } from 'boot/firebase'

export default {

  props: [
    'eventData'
  ],
  data () {
    return {
      detailsDialog: false
    }
  },

  methods: {
    changeEventStatus (status) {
      db.collection('events').where('eventID', '==', this.eventData.eventID).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          db.collection('events').doc(doc.id).update({
            eventStatus: status
          })
        })
      })
    }
  }
}
</script>
