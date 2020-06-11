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

              <q-card @click="filter='academico'" :class="academico" class="my-card shadow-box flex flex-center" >
                <q-card-section class="text-center">
                  <q-icon name="las la-school" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Acadêmico</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card  @click="filter='artesVisuais'" :class="artesVisuais" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center ">
                  <q-icon name="las la-palette" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Artes Visuais</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='competicoes'" :class="competicoes" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-trophy" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Competições</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='esportes'" :class="esportes" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-futbol" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Esportes</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9"> 

              <q-card @click="filter='exposicoes'" :class="exposicoes" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-camera" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Exposições</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='festasShows'" :class="festasShows" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-music" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Festas e Shows</div>

            </div>


            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='online'" :class="online" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-wifi" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Online</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='palestras'" :class="palestras" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-chalkboard-teacher" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Palestras</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='religiosos'" :class="religiosos" class="my-card shadow-box flex flex-center">
                <q-card-section class="text-center">
                  <q-icon name="las la-praying-hands" size="30px"/>
                </q-card-section>
              </q-card>

              <div class="text-center q-mt-sm text-grey-7" style="font-size: 12px">Religiosos</div>

            </div>

            <div class="q-pt-sm text-deep-orange-9">

              <q-card @click="filter='teatroEspetaculos'" :class="teatroEspetaculos" class="my-card shadow-box flex flex-center">
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

    
      

    <q-page-container class="bg-grey-2 app-font-light">
      <router-view />
    </q-page-container>

    <q-footer>
        
    </q-footer>
  </q-layout>
</template>

<script>

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
      if(val == 'academico') {
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
      }
      if(val == 'artesVisuais') {
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
      }
      if(val == 'competicoes') {
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
      }
      if(val == 'esportes') {
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
      }
      if(val == 'exposicoes') {
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
      }
      if(val == 'festasShows') {
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
      }
      if(val == 'online') {
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
      }
      if(val == 'palestras') {
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
      }
      if(val == 'religiosos') {
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
      }
      if(val == 'teatroEspetaculos') {
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
      }
      
      
      else{
        console.log('nada')
      }
    }
  },

  methods: {
    checkResolution () {
      const screenWidth = this.$q.screen.width
      this.resolution = screenWidth
    },
  },

  mounted () {
    this.filter = this.$route.params.categorie
      if (this.filter == 'esportes') {
        this.$refs.scrollCategories.setScrollPosition (45)
      }
     if (this.filter == 'exposicoes'
          || this.filter == 'festasShows'
          || this.filter == 'online') {
      this.$refs.scrollCategories.setScrollPosition (345)
    }
    if (this.filter == 'palestras') {
      this.$refs.scrollCategories.setScrollPosition (375)
    }
    if (this.filter == 'religiosos'
          || this.filter == 'teatroEspetaculos') {
      this.$refs.scrollCategories.setScrollPosition (545)
    }
  }
}
</script>

<style>

.q-tab__indicator{
  height: 1px !important;
  border-radius: 0px;
}

.q-tab__content {
  z-index: 0;
  position: relative;
  margin-top: 0px;
}

.q-tabs {
  background: white !important;
  border-radius: 0px;
  font-weight: bold !important;
}

.tab-panels {
  border-radius: 0px !important;
}

.q-tab-panel {
  margin-top: 0x !important;
}

</style>
