<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-bar class="bg-white q-pa-sm text-white" style="height: 6vh">
        <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="15px" to="/">
        </q-btn> 
        <q-space/> 
        <div class="app-font-bold text-deep-orange-9" style="margin-left: -30px">Eventos</div>  
        <q-space/>         
      </q-bar>

      <div class="bg-white text-center q-py-sm">
        <q-scroll-area class="bg-white " horizontal style="height: 120px" :thumb-style="{ opacity: 0 }" ref="scrollCategories">
          
          <div class="row q-gutter-md no-wrap q-px-md">

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Acadêmico'" :class="academico" class="my-card shadow-box flex flex-center" >
                <q-card-section class="text-center">
                  <q-icon name="las la-school" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Acadêmico</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card  @click="filter='Artes Visuais'" :class="artesVisuais" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center ">
                  <q-icon name="las la-palette" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Artes Visuais</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Competições'" :class="competicoes" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-trophy" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Competições</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Esportes'" :class="esportes" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-futbol" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Esportes</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9"> 

              <q-card @click="filter='Exposições'" :class="exposicoes" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-camera" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Exposições</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Festas e Shows'" :class="festasShows" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-music" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Festas e Shows</div>

            </div>


            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Online'" :class="online" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-wifi" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Online</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Palestras'" :class="palestras" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-chalkboard-teacher" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Palestras</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Religiosos'" :class="religiosos" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-praying-hands" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Religiosos</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='Teatro e Espetáculos'" :class="teatroEspetaculos" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-theater-masks" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Teatro e Espetáculos</div>

            </div>

          </div>
          
        </q-scroll-area>
      </div>
      
      <q-tabs
          no-caps
          dense
          align="justify"
          v-model="selectedTab"
          switch-indicator
          indicator-color="deep-orange-9"
          active-color="deep-orange-9"
          :breakpoint="0"
          class="bg-white app-font-bold text-grey-7 shadow-1"
          >
          <q-route-tab clickable exact name="todos" label="Todos" to="/listCategories/all"/>
          <q-route-tab name="dia"  label="Dia" to="/listCategories/day"/>
          <q-route-tab name="mês" label="Mês" to="/listCategories/month"/>
          
        </q-tabs>
      
    </q-header>

    
      

    <q-page-container class="bg-grey-1 app-font-light">
      <router-view/>
    </q-page-container>

    <q-footer>
        
    </q-footer>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'
import { mapActions } from 'vuex'

export default {
  name: 'ListEventsLayout',

  
  data () {
    return {
      selectedTab: 'todos',
      filter: null,
      academico: '',
      artesVisuais: '',
      competicoes: '',
      esportes: '',
      exposicoes: '',
      festasShows: '',
      online: '',
      palestras: '',
      religiosos: '',
      teatroEspetaculos: '',
      
      resolution: null
      
    }
  },

  watch: {
    'filter': function (val) {
      this.eventFilter(this.filter)
      if(val == 'Acadêmico') {
        this.academico = 'bg-deep-orange-9 text-white'
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)

      }
      if(val == 'Artes Visuais') {
        this.artesVisuais = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Competições') {
        this.competicoes = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Esportes') {
        this.esportes = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Exposições') {
        this.exposicoes = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)


      }
      if(val == 'Festas e Shows') {
        this.festasShows = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.online = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Online') {
        this.online = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.palestras = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Palestras') {
        this.palestras = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.religiosos= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Religiosos') {
        this.religiosos = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras= ''
        this.teatroEspetaculos= ''

        LocalStorage.set('filter', val)
      }
      if(val == 'Teatro e Espetáculos') {
        this.teatroEspetaculos = 'bg-deep-orange-9 text-white'
        this.academico = ''
        this.artesVisuais = ''
        this.competicoes = ''
        this.esportes = ''
        this.exposicoes = ''
        this.festasShows = ''
        this.online = ''
        this.palestras= ''
        this.religiosos= ''

        LocalStorage.set('filter', val)
      }
      
    }
  },

  computed: {
   
  },

  methods: {
    ...mapActions('store', ['eventFilter']),
    checkResolution () {
      const screenWidth = this.$q.screen.width
      this.resolution = screenWidth
    },
  },

  mounted () {
    this.eventFilter(this.filter)
    this.filter = this.$route.params.categorie
      if (this.filter == 'Esportes') {
        this.$refs.scrollCategories.setScrollPosition (45)
      }
     if (this.filter == 'Exposições'
          || this.filter == 'Festas e Shows'
          || this.filter == 'Online') {
      this.$refs.scrollCategories.setScrollPosition (345)
    }
    if (this.filter == 'Palestras') {
      this.$refs.scrollCategories.setScrollPosition (375)
    }
    if (this.filter == 'Religiosos'
          || this.filter == 'Teatro e Espetáculos') {
      this.$refs.scrollCategories.setScrollPosition (545)
    }
  }
}
</script>

<style>


</style>
