<template>
  <q-page>
    <div class="row justify-around q-mt-md">
      <div clickable @click="$router.push('/list/all')">
        <div
          class="flex inline shadow-box flex-center bg-deep-orange-9"
          :class="`shadow-5`">
          <q-icon name="las la-bars" size="30px" color="white"/>
        </div>

        <div class="text-center app-font-light q-mt-sm" style="font-size: 12px">Todos</div>

      </div>
      
      <div clickable @click="$router.push('/list/day')">
        <div
          class="flex inline shadow-box flex-center bg-deep-orange-9"
          :class="`shadow-5`">
          <q-icon name="las la-calendar-check" size="35px" color="white"/>
        </div>

        <div class="text-center app-font-light q-mt-sm" style="font-size: 12px">Dia</div>

      </div>
      
      <div clickable @click="$router.push('/list/month')">
        <div
          class="flex inline shadow-box flex-center bg-deep-orange-9"
          :class="`shadow-5`">
          <q-icon name="lar la-calendar-alt" size="35px" color="white"/>
        </div>

        <div class="text-center app-font-light q-mt-sm" style="font-size: 12px">Mês</div>

      </div>
      
    </div>
    <div class="row q-pl-md q-pr-md q-mt-lg q-mb-md">
      <div class="col-8 categorias app-font-bold text-grey-9">
        Categorias
      </div>
      <!-- <div clickable @click="$router.push('/categorias')" class="col-4  categoria-all text-right">
        Ver tudo
      </div> -->

    </div>
    <div>
      
      <q-scroll-area horizontal style="height: 120px" :thumb-style="{ opacity: 0 }">
        
        <div class="row q-gutter-md no-wrap q-px-md">

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Acadêmico'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-school" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm app-font-light" style="font-size: 12px">Acadêmico</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Artes Visuais'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center ">
                <q-icon name="las la-palette" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Artes Visuais</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Competições'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-trophy" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Competições</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Esportes'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-futbol" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Esportes</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Exposições'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-camera" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Exposições</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Festas e Shows'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-music" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Festas e Shows</div>

          </div>


          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Online'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-wifi" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Online</div>

          </div>

           <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Palestras'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-chalkboard-teacher" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Palestras</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Religiosos'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-praying-hands" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Religiosos</div>

          </div>

          <div clickable @click="$router.push({name: 'allName', params: {categorie: 'Teatro e Espetáculos'}})">

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-theater-masks" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Teatro e Espetáculos</div>

          </div>

        </div>
        
      </q-scroll-area>

    </div>

    <div class="row q-pl-md q-pr-md q-mt-lg q-mb-md">
      <div class="col-8 categorias app-font-bold text-grey-9">
        Destaques
      </div>

    </div>

    <div>

      <div v-if="!eventsDestaques" class=" text-center flex flex-center grey-6 app-font-light" style="height: 15vh">
        Nenhum Destaque
      </div>
      
      <q-scroll-area v-if="eventsDestaques" horizontal style="height: 263px" :thumb-style="{ opacity: 0 }">
        
        <div class="row q-gutter-sm no-wrap q-px-md">

          <div v-for="event in filteredEvents" :key="event.eventID">
            <event-destaques :event = event />
          </div>

        </div>
        
      </q-scroll-area>

    </div>

    <div class="row q-pl-md q-pr-md q-mt-lg">
      <div class="col-8 categorias app-font-bold text-grey-9">
        Vistos recentemente
      </div>

    </div>

    <div>

      <div v-if="!userData.eventsHistory.length" class=" text-center flex flex-center grey-6 app-font-light" style="height: 15vh">
        Nenhum evento visto recentemente
      </div>

      <q-scroll-area v-if="userData.eventsHistory.length" horizontal style="height: 263px" :thumb-style="{ opacity: 0 }">
        
        <div class="row q-gutter-sm no-wrap q-px-md">

          <div v-for="event in userData.eventsHistory" :key="event">
            <events-history :event = event />
          </div>

        </div>
        
      </q-scroll-area>
      
      <!-- <q-scroll-area horizontal style="height: 275px" :thumb-style="{ opacity: 0 }">
        
        <div class="row q-gutter-sm no-wrap q-px-md q-mb-md">

         <q-card  v-for="n in 4" :key="n" class="my-card" style="width: 250px" @click="dialogCard = true">
            <q-img
              :ratio="1.2"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              basic
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>   
            <q-card-section class=" items-center row">
              <div class="row q-mt-sm q-ml-sm col-auto">
                <q-icon name="las la-calendar" size="25px" color="grey-6" class="q-mt-xs"/>
                <div class="q-ml-xs app-font-light">
                  <div>seg, 10 jun 2020</div>
                  <div class="text-caption">12:00</div>
                </div>
              </div>
              <q-space/>
              <div class="col-auto">
                <q-icon color="red" name="lar la-heart" size="25px" class="q-mr-sm" />
                <q-icon color="primary" size="25px" name="o_share" class="q-mr-sm"/>
              </div>
            </q-card-section> 
          </q-card>

        </div>
        
      </q-scroll-area> -->

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
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { LocalStorage } from 'quasar'

export default {
  name: 'PageIndex',

  components: {
    'event-dialog': require("components/EventDialog.vue").default,
    'event-destaques': require("components/EventDestaques.vue").default,
    'events-history': require("components/EventsHistory.vue").default
  },

  data () {
    return {
      tab: 'todos',
      dialogCard: false,
      maximizedToggleCard: true,
      search: ''

    }
  },

   computed: {
    ...mapGetters('store', ['eventsDestaques', 'userData']),

    filteredEvents:function() {
       var self = this
       return this.eventsDestaques.filter(function(event){return event.eventName.toLowerCase().indexOf(self.search.toLowerCase())>=0;}).sort(self.compareLikes);
       //return this.customers;
    },

    
  },

  methods: {
    ...mapActions('store', ['handleAuthStateChange']),

    compareLikes(a, b) {
      // Use toUpperCase() to ignore character casing
      const itemA = a.likes;
      const itemB = b.likes;

      let comparison = 0;
      if (itemA < itemB) {
        comparison = 1;
      } else if (itemA > itemB) {
        comparison = -1;
      }
      return comparison;
    },

  },

  mounted() {
    console.log('isso', this.userData.eventsHistory)
  },

  // created() {

  //    console.log(LocalStorage.getItem('reload'))

  //   if(LocalStorage.getItem('reload') == false){
  //     LocalStorage.set('reload', true)
  //     window.location.reload(true);


  //   }

  // }
}
</script>

<style>
.shadow-box{
  width: 70px;
  height: 70px;
  border-radius: 50%;
  font-size: 12px;
}

.div-categorias{
  margin-top: 25px;
}

.categorias {
    color: rgb(46, 46, 46);

}

.categoria-all{
  color: rgb(197, 70, 23);
}

.nome-categorias{
  font-size: 11px;
}

.q-card__section{
  padding: 0 !important;
}


.titulo {
  font-size: 3vh;
}


.favorite-dialog {
  height: 6vh;
  width: 6vh;
  border-radius: 100%;
  background: red;
}

.share-dialog {
  height: 6vh;
  width: 6vh;
  border-radius: 100%;
  background: blue;
}

  
</style>
