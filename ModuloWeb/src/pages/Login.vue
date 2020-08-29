<template>
  <q-page class="flex flex-center pageBackground">
    <div class="text-center bg-white">
      <div class="q-pa-md">
        <div class="text-justify text-h6 q-py-md"><q-icon name="login" size="md" class="q-mr-xs"/> ACESSAR O SISTEMA</div>
        <q-separator inset/>
        <q-input class="q-mt-md" color="deep-orange" v-model="userData.email" label="E-mail" style="width: 35vw">
          <template v-slot:prepend>
            <q-icon name="lar la-envelope" />
          </template>
        </q-input>
        <q-input class="q-mt-md q-mb-lg" type="password" color="deep-orange" v-model="userData.password" label="Senha">
          <template v-slot:prepend>
            <q-icon name="las la-lock" />
          </template>
        </q-input>
        <q-btn @click="login" square color="deep-orange" text-color="white" label="ENTRAR" class="q-py-sm" style="width: 100%"/>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
  .pageBackground {
    background-image: url("../assets/background.jpg");
      background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PageIndex',

  data () {
    return {
      userData: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapActions('store', ['loginUser']),

    login () {
      this.loginUser(this.userData)
    }
  }
}
</script>
