<template>
  <q-page :class="animationOut" :key="aux" class="q-pa-xl  background-login vertical-middle flex flex-center" >
    <div>

    
    <div class="text-center">
      <div class="logo-block">
      <img 
        src="https://i.ibb.co/M7KMgfn/Vermelho-rvore-de-Natal-Arte-de-Natal-Cart-o-6-removebg-preview-1.png"
        style="width: 150px" 
      />
      <div class="app-font-bold text-white" style="font-size: 1.8em">
        GBI Eventos
      </div>
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

        
        
    </div>

    </div>

    
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageLogin',

  data(){
    return {
      tab: 'login',
      animationOut: '',
      aux: 0,
      resetPwd: false,
      email: ''
    }
  },

  components: {
    'login-register' : require('components/LoginRegister.vue').default

  },

  mounted () {
    
  },

  methods: {
    ...mapActions('store', ['googleLoginUser', 'facebookLoginUser', 'resetPasswordInit']),
    loginGoogle(){
      this.googleLoginUser()
    },
    loginFacebook(){
      this.facebookLoginUser()
    },

    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());

    },

   

   

    
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
  margin-top: 10px;
  text-align: center;
}

.icon-google {
  text-align: center;
}



</style>
