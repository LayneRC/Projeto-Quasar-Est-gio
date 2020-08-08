<template>
  <q-page :class="animationOut" :key="aux" class="q-pa-xl  background-login vertical-middle" >
    <div>

    
    <div class="text-center">
      <div class="logo-block">
      <q-icon name="img:statics/icons/calendar-white.svg" size="15vh" />
    </div>

    <q-tabs
      dense
      v-model="tab"
      active-color="black"
      indicator-color="white"
      class="bg-grey-9 text-bold text-white app-font-bold q-pa-xs q-mt-lg"
      >
        <q-tab :ripple="false" name="login">Entrar</q-tab>
        <q-tab :ripple="false" name="register">Registrar</q-tab>
    </q-tabs>

     <q-tab-panels
          v-model="tab"
          animated
          swipeable        
          transition-prev="slide-right"
          transition-next="slide-left"
          class="q-mt-md tab-panels q-pa-xs app-font-light"
        >
          <q-tab-panel name="login">
            <login-register :tab="tab"/>
          </q-tab-panel>

          <q-tab-panel name="register">
            <login-register :tab="tab"/>
          </q-tab-panel>

        </q-tab-panels>

        <div v-if="tab == 'login'" class="text-white app-font-light">Esqueceu a senha?</div>
        <div class="row Flex flex-center q-mt-sm">
          <q-separator v-if="tab == 'login'" color="white" class="" inset />
          <div v-if="tab == 'login'" class="text-white ">ou</div>
          <q-separator v-if="tab == 'login'" color="white" inset />
        </div>
        <div v-if="tab == 'login'" class="flex flex-center logo-google-login">
          <div>
            <q-icon name="img:statics/icons/logo-google.svg" size="35px" />
          </div>
        </div>
        



    </div>

    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',

  data(){
    return {
      tab: 'login',
      animationOut: '',
      aux: 0
    }
  },

  components: {
    'login-register' : require('components/LoginRegister.vue').default

  },

  mounted () {
    
  },

  methods: {
    
    
  }
}
</script>

<style>

.background-login{
  background: rgb(224,62,12) !important;
  background: linear-gradient(180deg, rgba(224,62,12,1) 0%, rgba(246,115,75,1) 95%) !important;
}


.q-tab__content {
  z-index: 1 !important;
  position: absolute !important;
  margin-top: 4px !important;
}

.q-tabs {
  background: rgba(0, 0, 0, .4) !important;
  border-radius: 30px !important;
  font-weight: bold !important;
}

.q-separator {
  width: 25%;
}

.logo-google-login {
  border-radius: 100%;
  background: white;
  width: 50px;
  height: 50px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
}

.icon-google {
  margin: auto;
  text-align: center;
}



</style>
