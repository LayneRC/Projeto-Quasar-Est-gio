<template>
  <q-page :class="animationOut" :key="aux" class="q-pa-xl  background-login vertical-middle" >
    <div>

    
    <div class="text-center">
      <div class="logo-block">
      <img 
        src="https://image.flaticon.com/icons/svg/1142/1142731.svg" 
        style="width: 18vh" 
      />
    </div>

    <q-tabs
      dense
      v-model="tab"
      active-color="white"
      indicator-color="white"
      class="text-bold text-blue-grey-11 app-font-bold q-pa-xs q-mt-lg"
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
          <div @click="auth('facebook')">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" 
            style="width: 30px" />
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
    auth (network) {
      this.$hello(network).login({ scope: 'friends' })
        .then((res) => {
          this.$router.push('index')
        })
    }
    
  }
}
</script>

<style>

.background-login{
  background: rgb(224,62,12) !important;
  background: linear-gradient(180deg, rgba(224,62,12,1) 0%, rgba(246,115,75,1) 95%) !important;
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
