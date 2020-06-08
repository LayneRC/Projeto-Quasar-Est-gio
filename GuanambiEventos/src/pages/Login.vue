<template>
  <q-page :class="animationOut" class="q-pa-xl  background-login">
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
            <q-input color="deep-orange-9" v-model="text" label="Email">
              <template v-slot:prepend>
                <q-icon name="lar la-envelope"/>
              </template>
            </q-input>
            <q-input color="deep-orange-9 q-mt-sm q-mb-lg" v-model="text" label="Senha">
              <template v-slot:prepend>
                <q-icon name="las la-lock"/>
              </template>
            </q-input>
            </q-tab-panel>

          <q-tab-panel name="register">
            <q-input color="deep-orange-9" v-model="text" label="Nome">
              <template v-slot:prepend>
                <q-icon name="lar la-user" />
              </template>
            </q-input>
            <q-input color="deep-orange-9 q-mt-sm " v-model="text" label="Email">
              <template v-slot:prepend>
                <q-icon name="lar la-envelope" />
              </template>
            </q-input>
            <q-input color="deep-orange-9 q-mt-sm " v-model="text" label="Senha">
              <template v-slot:prepend>
                <q-icon name="las la-lock" />
              </template>
            </q-input>
            <q-input color="deep-orange-9 q-mt-sm q-mb-lg" v-model="text" label="Confirmar senha">
              <template v-slot:prepend>
                <q-icon name="las la-lock" />
              </template>
            </q-input>
          </q-tab-panel>
        </q-tab-panels>

        <q-btn v-if="tab == 'login'" @click="logar" color="primary" label="Vamos lá" class="butao q-px-lg app-font-bold text-bold"/>
        <q-btn v-if="tab == 'register'" color="primary" label="Registrar" class="butao q-px-lg app-font-bold text-bold"/>

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

    
  </q-page>
</template>

<script>
export default {
  name: 'PageLogin',

  data(){
    return {
      tab: 'login',
      animationOut: ''
    }
  },

  methods: {
    logar () {
      this.$router.replace('/options')
    },
    
  }
}
</script>

<style>

.background-login{
  background: rgb(224,62,12);
  background: linear-gradient(180deg, rgba(224,62,12,1) 0%, rgba(246,115,75,1) 95%);
}

.q-tab__indicator{
  height: 36.5px !important;
  border-radius: 30px;
}

.q-tab__content {
  z-index: 1;
  position: absolute;
  margin-top: 4px;
}

.q-tabs {
  background: rgba(0, 0, 0, .4) !important;
  border-radius: 30px;
  font-weight: bold !important;
}

.tab-panels {
  border-radius: 10px !important;
}

.q-tab-panel {
  margin-top: -50x !important;
}

.butao {
  top: 0;
  transform: translateY(-18px);
  background: rgb(180,53,14) !important;
  background: linear-gradient(83deg, rgba(180,53,14,1) 6%, rgba(196,58,15,1) 39%, rgba(221,85,40,1) 95%) !important;

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
