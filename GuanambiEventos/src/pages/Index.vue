<template>
  <q-page>
    <div class="row justify-around q-mt-md">
      <div clickable @click="dialogList = true">
        <div
          class="flex inline shadow-box flex-center bg-deep-orange-9"
          :class="`shadow-5`">
          <q-icon name="las la-bars" size="30px" color="white"/>
        </div>

        <div class="text-center text-bold q-mt-sm" style="font-size: 12px">Todos</div>

      </div>
      
      <div>
        <div
          class="flex inline shadow-box flex-center bg-deep-orange-9"
          :class="`shadow-5`">
          <q-icon name="las la-calendar-check" size="35px" color="white"/>
        </div>

        <div class="text-center text-bold q-mt-sm" style="font-size: 12px">Dia</div>

      </div>
      
      <div>
        <div
          class="flex inline shadow-box flex-center bg-deep-orange-9"
          :class="`shadow-5`">
          <q-icon name="lar la-calendar-alt" size="35px" color="white"/>
        </div>

        <div class="text-center text-bold q-mt-sm" style="font-size: 12px">Mês</div>

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

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-school" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Acadêmico</div>

          </div>

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center ">
                <q-icon name="las la-palette" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Artes Visuais</div>

          </div>

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-trophy" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Competições</div>

          </div>

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-futbol" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Esportes</div>

          </div>

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-camera" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Exposições</div>

          </div>

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-music" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Festas e Shows</div>

          </div>


          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-wifi" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Online</div>

          </div>

           <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-chalkboard-teacher" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Palestras</div>

          </div>

          <div>

            <q-card class="my-card shadow-box flex flex-center">
              <q-card-section class="text-center">
                <q-icon name="las la-praying-hands" size="30px" color="deep-orange-9"/>
              </q-card-section>
            </q-card>

            <div class="text-center q-mt-sm" style="font-size: 12px">Religiosos</div>

          </div>

          <div>

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
      <div class="col-4  categoria-all text-right">
        Ver tudo
      </div>

    </div>

    <div>
      
      <q-scroll-area horizontal style="height: 263px" :thumb-style="{ opacity: 0 }">
        
        <div class="row q-gutter-sm no-wrap q-px-md">

         <q-card  v-for="n in 4" :key="n" class="my-card" style="width: 250px"  @click="dialogCard = true" >
            <q-img
              :ratio="1.2"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              >
              <div class="absolute-bottom text-subtitle2 text-center">
                Title
              </div>
            </q-img>   
            <q-card-section class=" items-center row">
              <div class="row q-mt-sm q-ml-sm col-auto">
                <q-icon name="las la-calendar" size="25px" color="grey-6" class="q-mt-xs"/>
                <div class="q-ml-xs">
                  <div>01/01/2020</div>
                  <div class="text-caption">12:00</div>
                </div>
              </div>
              <q-space/>
              <div class="col-auto">
                <q-btn flat round color="red" icon="lar la-heart" class="" />
                <q-btn flat round color="primary" icon="share" class="action-share"/>
              </div>
            </q-card-section> 
          </q-card>

        </div>
        
      </q-scroll-area>

    </div>

    <div class="row q-pl-md q-pr-md q-mt-lg q-mb-md">
      <div class="col-8 categorias app-font-bold text-grey-9">
        Vistos recentemente
      </div>
      <div class="col-4  categoria-all text-right">
        Ver tudo
      </div>

    </div>

    <div>
      
      <q-scroll-area horizontal style="height: 275px" :thumb-style="{ opacity: 0 }">
        
        <div class="row q-gutter-sm no-wrap q-px-md q-mb-md">

         <q-card  v-for="n in 4" :key="n" class="my-card" style="width: 250px" @click="dialog = true">
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
                <div class="q-ml-xs">
                  <div>01/01/2020</div>
                  <div class="text-caption">12:00</div>
                </div>
              </div>
              <q-space/>
              <div class="col-auto">
                <q-btn flat round color="red" icon="lar la-heart" class="" />
                <q-btn flat round color="primary" icon="share" class="action-share"/>
              </div>
            </q-card-section> 
          </q-card>

        </div>
        
      </q-scroll-area>

    </div>

    <q-dialog
      v-model="dialogCard"
      persistent
      :maximized="maximizedToggleCard"
      transition-show="scale"
      transition-hide="scale"
      >
      <q-card class="bg-grey-1 text-white">
        <q-bar class="bg-white q-pa-sm">
          <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="15px" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
          <q-space/>

          <q-btn flat round color="white" icon="lar la-heart" />
          <q-btn flat round color="white" icon="share"/>
                
        </q-bar>

        <q-scroll-area vertical style="height: 100vh" :thumb-style="{ opacity: 0 }">
          <q-card-section >
            <q-img class="img-dialog"
              contain
              src="https://cdn.quasar.dev/img/parallax2.jpg"
              basic
              >
            </q-img> 

            <div class="bg-white ">
              <div class="text-grey-9 titulo app-font-bold q-pt-sm q-pl-md">
                Nome Evento
              </div>

              <div class="row q-pl-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-ml-sm">Categoria</div>
              </div>

              <div class="row q-pl-md q-pt-md">
                <q-icon name="las la-calendar-day" size="30px" color="grey-8" class="q-mt-xs"/>
                <div class="q-ml-sm">
                  <div class="text-grey-8">dom, 07 jun 2020</div>
                  <div class="text-grey-8">19:00</div>
                </div>
              </div>

              <div class="row q-pl-md q-pt-sm">
                <q-icon name="las la-map-marker" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">Localização</div>
              </div>

              <div class="row q-pl-md q-pt-sm q-pb-sm">
                <q-icon name="las la-dollar-sign" size="30px" color="grey-8"/>
                <div class="text-grey-8 flex flex-center q-ml-sm">Gratuito</div>
              </div>
            </div>
      
          </q-card-section>

          <q-card-section >
            <div class="bg-white q-mt-md">
              <div class="text-grey-9 app-font-bold q-pt-sm q-pl-md">
                Descrição
              </div>

              <div class="row q-pl-md q-pt-sm">
                <div class="text-grey-8 flex flex-center q-mr-md text-justify">Lorem Ipsum is simply dummy text of the printing and 
                  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                  when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has 
                  survived not only five centuries, but also the leap into electronic typesetting, remaining essentially 
                  unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                  passages, and more recently with desktop publishing software like Aldus PageMaker including versions of 
                  Lorem Ipsum.
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-section >
            <div class="bg-white q-mt-md">
              <div class="text-grey-9 app-font-bold q-pt-sm q-pl-md">
                Organizador
              </div>

              <div class="row q-pl-md q-pt-sm q-mb-md">
                <div class="text-grey-8 flex flex-center q-mr-md q-mb-md text-justify">
                  Nome do organizador
                </div>
              </div>
            </div>
          </q-card-section>
        </q-scroll-area>  
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="dialogList"
      persistent
      :maximized="maximizedToggleList"
      transition-show="scale"
      transition-hide="scale"
      >
      
      <q-bar class="bg-white q-pa-sm text-white" style="height: 6vh">
        <q-btn dense flat icon="las la-arrow-left" color="deep-orange-9" size="15px" v-close-popup>
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>              
      </q-bar>

      <div class="bg-grey-1">
        <q-tabs
          v-model="tab"
          dense
          no-caps
          indicator-color="deep-orange-9"
          active-color="deep-orange-9"
          class="bg-grey app-font-bold text-grey-9"
          >
          <q-tab clickable name="todos" color label="Todos" />
          <q-tab clickable name="dia" label="Dia" />
          <q-tab clickable name="mês" label="Mês" />
        </q-tabs>
      </div>

      <q-scroll-area vertical style="height: 100vh" :thumb-style="{ opacity: 0 }">
          
      </q-scroll-area>  
      
    </q-dialog>


  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      dialogCard: false,
      maximizedToggleCard: true,

      dialogList: false,
      maximizedToggleList: true
    }
  },

  methods: {
    list () {
      this.$router.replace('/list')
    },
    
  }
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

.action-share{
  margin-left: 0px;

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

.div-actions-dialog {
   transform: translateY(-20px) !important;
   z-index: 2 !important;
}
  
</style>
