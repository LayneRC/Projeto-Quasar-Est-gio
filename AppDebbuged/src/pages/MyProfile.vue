<template>
  <q-page class="q-pa-lg" >

    <div class=" q-pa-md">
      <div class="flex flex-center" style="z-index: 1">
        <q-avatar size="20vh" class="q-mb-sm">
          <img :src="avatar">
        </q-avatar>
      </div>
      
      <div class="flex flex-center div-icon-photo">
        <q-icon name="add_a_photo" size="4vh" color="white"/>

        <q-menu touch-position>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="getImageCamera(); save = true">
              <q-item-section>Camera</q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="captureImageFromGallery(); save = true">
              <q-item-section>Galeria</q-item-section>
            </q-item>
          </q-list>

        </q-menu>

      </div>

    </div>

    <div>
      <q-input ref="nameUser" v-model="profileData.textName" :readonly="editName" color="grey-7" class="app-font-light">
        <template v-slot:append>
          <q-icon name="edit" @click="funcEditName" class="cursor-pointer" />
        </template>
      </q-input>
    </div>

    <div class="q-mt-md">
      <q-input ref="email" v-model="profileData.textEmail" :readonly="editEmail" color="grey-7" class="app-font-light">
        <template v-slot:append>
          <q-icon name="edit" @click="funcEditEmail" class="cursor-pointer" />
        </template>
      </q-input>
    </div>

    <div class="q-mt-md text-deep-orange-9" @click="resetPwd()">
      Redefinir senha
    </div>


    <div v-if="save == true" class="flex flex-center q-mt-xl app-font-bold">
      <q-btn  color="deep-orange-9" label="Salvar" @click="dialog = true"/>
    </div>



    <q-dialog v-model="dialog">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h6">Confirmação de usuário</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input 
            color="deep-orange-9 q-mt-sm " 
            v-model="profileData.validPassword" 
            label="Senha" 
            type="password"
            :rules="[ val => val.length >= 6 || 'A senha deve conter no mínimo 6 caracteres' ]"
            ref="password">
                <template v-slot:prepend>
                    <q-icon name="las la-lock" />
                </template>
          </q-input>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup @click="updateUser(profileData); profileData.validPassword=''"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

   
    
  </q-page>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageExample',

  data () {
    return {
      profileData: {
        textName: '',
        textEmail: '',
        userImage: null,
        validEmail: '',
        validPassword: ''
      },
      avatar: null,
      editName: true,
      editEmail: true,
      editPwd: true,
      save: false,
      dialog: false


    }
  },

  mounted() {
    this.profileData.textName = this.userData.userName,
    this.profileData.textEmail = this.userData.userEmail,
    this.avatar = this.userData.userUrlImage
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

    funcEditImage() {
      this.save = true
    },

    ...mapActions('store', [ 'resetPassword', 'updateUser']),
      
    resetPwd() {                  
      this.resetPassword()
    },

    getImageCamera() {
      navigator.camera.getPicture(
        data => { // on success
          this.profileData.userImage = `data:image/jpeg;base64,${data}`,
          this.avatar = `data:image/jpeg;base64,${data}`

        },
        () => { // on fail

        },
        {
          quality: 20, allowEdit: true,
          correctOrientation: true,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA
        }
      )

    },

    captureImageFromGallery () {
      navigator.camera.getPicture(
        data => { // on success
          this.profileData.userImage = `data:image/jpeg;base64,${data}`,
          this.avatar = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail

        },
        {
          quality: 20, allowEdit: true,
          correctOrientation: true,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        }
      )
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



