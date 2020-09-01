<template>
  <q-page class="q-pa-lg" >

    <div class=" q-pa-md">
      <div class="flex flex-center" style="z-index: 1">
        <q-avatar size="20vh" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png">
        </q-avatar>
      </div>
      
      <div class="flex flex-center div-icon-photo">
        <q-icon name="add_a_photo" size="4vh" color="white"/>
      </div>

    </div>

    <div>
      <q-input ref="nameUser" v-model="textName" :readonly="editName" color="grey-7" class="app-font-light">
        <template v-slot:append>
          <q-icon name="edit" @click="funcEditName" class="cursor-pointer" />
        </template>
      </q-input>
    </div>

    <div class="q-mt-md">
      <q-input ref="email" v-model="textEmail" :readonly="editEmail" color="grey-7" class="app-font-light">
        <template v-slot:append>
          <q-icon name="edit" @click="funcEditEmail" class="cursor-pointer" />
        </template>
      </q-input>
    </div>

    <div class="q-mt-md text-deep-orange-9" @click="resetPwd()">
      Redefinir senha
    </div>


    <div v-if="save == true" class="flex flex-center q-mt-xl app-font-bold">
      <q-btn  color="deep-orange-9" label="Salvar" />
    </div>




   
    
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageExample',

  data () {
    return {
      textName: '',
      textEmail: '',
      editName: true,
      editEmail: true,
      editPwd: true,
      save: false,
      password: '',
      isPwd: true,
      isPwdConfirmed: false,
      passwordConfirmed: '',
      pwdConfirmed: false,

    }
  },

  mounted() {
    this.textName = this.userData.userName,
    this.textEmail = this.userData.userEmail
  },

  methods: {
    funcEditName () {
      this.editName = false
      this.$refs.nameUser.$el.focus()
      this.save = true

    },

    funcEditEmail () {
      this.editEmail = false
      this.$refs.email.$el.focus()
      this.save = true

    },

    funcEditPwd () {
      this.editPwd = false
      this.$refs.password.$el.focus()
      this.save = true
      this.pwdConfirmed = true

    }, 

    ...mapActions('store', [ 'resetPassword']),
      
    resetPwd() {
                    
      this.resetPassword()
                

      
    },

   
  },
    
  

  computed: {
    ...mapGetters('store', ['userData'])
  },
  
}
</script>

<style scoped>



.div-icon-photo {
  height: 6vh;
  width: 6vh;
  border-radius: 100%;
  background: #d84315;
  z-index: 2;
  transform: translateY(-40px);
  margin-left: 25vh;
}

</style>



