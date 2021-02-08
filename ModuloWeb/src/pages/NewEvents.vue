<template>
  <q-page class="bg-grey-1 q-px-md ">
    
      <q-form ref="NewEventForm" @submit.prevent="submitForm" class=" q-px-xl q-py-md" >
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      done-color="deep-orange-9"
      active-color="deep-orange-9"
      flat
      contracted
      animated
      class=""
      
 
       
    >
      <q-step
        :name="1"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
        title="identificação do evento"
        class=""
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          1. Identificação do evento
          <div class="text-red-14" style="font-size:2vh">
            * Campos obrigatórios
          </div>
        </div>
        <q-input v-model="eventData.eventName" ref="refName" label="Nome do evento *" color="grey-7" class="app-font-light" counter maxlength="200"
          :rules="[ val => val && val.trim().length > 0 || 'Nome do evento é obrigatório']"
        />
        <q-select v-model="eventData.modelCategorie" ref="refCategorie" :options="optionsCategorie" color="deep-orange-9" class="app-font-light q-mt-sm" label="Categoria principal *"
          :rules="[ val => val && val.trim().length > 0 || 'Categoria é obrigatório']"
        />
        <q-select v-model="eventData.modelEntrance" ref="refEntrace" :options="optionsEntrance" color="deep-orange-9" class="app-font-light q-mt-sm" label="Entrada *"
          :rules="[ val => val && val.trim().length > 0 || 'Entrada é obrigatório']"
        />

        <label for="file" class="text-center"> 
          <div class="flex flex-center">
            <div v-if="!eventData.image" class="border-img q-pa-md bg-grey-1 q-mt-xl text-center flex flex-center" style="height: 300px; width: 40%">
              <div class="text-center">
                <div>
                  <q-icon name="add_photo_alternate" size="40px" color="grey-6"/>
                </div>
                <div>
                  Clique aqui para selecionar uma imagem
                </div>
              </div>
            </div>

            <q-img
              v-if="eventData.image"
              :src="eventData.imagePreview"
              :ratio="16/9"
              class="border-img q-mt-xl"

            />
          </div>
        </label>

       
        <div class="q-mb-xl q-mt-sm app-font-light text-center" style="font-size: 2vh">
          Caso não tenha uma imagem para o seu evento, uma imagem padrão será atribuída!
        </div>

        <input class="inputFile" type="file" name="file" id="file" @change="previewImage" accept="image/*" >
        <div class="flex flex-center">
          
         
        </div>
        



        <q-page-sticky position="bottom-right fixed" :offset="[60, 10]">

          <q-circular-progress
            
            
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="grey-9"
            track-color="transparent"
            
            >
            <q-btn :disable="checkValidate" @click="() => {done1 = true; step = 2; value=20, checkValidate = false  }" size="19px" round color="deep-orange-9">
              <q-icon name="las la-angle-right" />
            </q-btn>
          </q-circular-progress>

        </q-page-sticky>
      </q-step>

      <q-step
        :name="2"
        caption="Optional"
        icon="las la-clock"
        :done="step > 2"
        :header-nav="step > 2"
        title="data evento"
        class="window-height"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          2. Quando o evento vai acontecer?
          <div class="text-red-14" style="font-size:2vh">
            * Campos obrigatórios
          </div>
        </div>
        <div class="q-pa-lg q-mb-xl" style="max-width: 400px; margin-bottom:90px">
          <div class="app-font-bold text-grey-10">
            Início *
          </div>
          <q-input v-model="eventData.dateStart" ref="refDateStart" readonly :rules="[ val => checkDateStart() || 'Data inválida']">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="eventData.dateStart"  color="deep-orange-9" today-btn mask="DD/MM/YYYY" @input="setDateEnd();">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="OK" color="primary" flat />
              </div>
              </q-date>
            </q-popup-proxy>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
              </q-icon>
            </template>
          </q-input>
          <div class="q-mt-sm">
            <q-input v-model="eventData.time" ref="refTime" mask="time" readonly :rules="['time']">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="eventData.time" format24h color="deep-orange-9" />
              </q-popup-proxy>
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="app-font-bold text-grey-10">
            Fim *
          </div>
          <q-input v-model="eventData.dateEnd" ref="refDateEnd" readonly :rules="[ val => checkDateEnd() || 'Data inválida']">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale" >
              <q-date v-model="eventData.dateEnd" color="deep-orange-9" today-btn mask="DD/MM/YYYY">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="OK" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
              </q-icon>
            </template>
          </q-input>
        </div>
        

        <q-page-sticky position="bottom-right" :offset="[60, 10]">

          <q-circular-progress
            
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            track-color="transparent"
            >

            <q-btn :disable="checkValidate" @click="() => { done2 = true; step = 3; value=40, checkBtn1()}" size="19px" round color="deep-orange-9">
              <q-icon name="las la-angle-right" />
            </q-btn>
          </q-circular-progress>

        </q-page-sticky>

        <q-page-sticky position="bottom-left" :offset="[90, 40]">

          <div clickable @click="() => {step = 1; value=0, checkValidate = false}" class="app-font-bold text-deep-orange-9 text-subtitle1">Voltar</div>


        </q-page-sticky>
      </q-step>

      <q-step
        :name="3"
        icon="las la-map-marker-alt"
        :done="step > 3"
        :header-nav="step > 3"
        title="lucal evento"
        class="window-height"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          3. Onde o seu evento vai acontecer?
          <div class="text-red-14" style="font-size:2vh">
            * Campos obrigatórios
          </div>
        </div>
        <q-select v-model="modelAdress" :options="optionsAdress" color="deep-orange-9"/>
        <div v-if="modelAdress == 'Cadastrar um endereço'">

          <q-input v-model="eventData.adressLocalName" ref="refLocalName" label="Nome do local *" color="grey-7" class="q-mt-md"  key="end_name"
            :rules="[ val => val && val.trim().length > 0 || 'Nome do local é obrigatório']"
          />
          <q-input v-model="eventData.adressStreet" ref="refStreet" label="Av/Rua *" color="grey-7" class="q-mt-sm"  key="end_street"
            :rules="[val => val && val.trim().length > 0 || 'Av/Rua é obrigatório']"
          />

          <q-input v-model="eventData.adressBairro" ref="refBairro" label="Bairro *" color="grey-7" class="q-mt-sm"  key="end_bairro"
            :rules="[val => val && val.trim().length > 0 || 'Bairro é obrigatório']"
          />
          
          <q-input v-model="eventData.adressNumber" ref="refNumber" label="Número *" color="grey-7" class="q-mt-sm q-mb-xl"  key="end_num"
            :rules="[ val => val && val.trim().length > 0 || 'Número é obrigatório. Caso não tenha, colocar S/N']"
          />
        </div>

        <div v-else>
          <q-input v-model="eventData.adressOnline" ref="refOnline" label="Endereço online *" color="grey-7" class="q-mt-md"  key="end_online" counter maxlength="150"
            :rules="[ val => val && val.trim().length > 0 || 'Endereço online é obrigatório. Caso ainda não tenha, colocar A Definir. Você poderá alterar posteriormente']"
          />
        </div>

        

        <q-page-sticky position="bottom-right" :offset="[60, 10]">

          <q-circular-progress
         
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            track-color="transparent"
            >
            <q-btn :disable="checkValidate" @click="() => { done2 = true; step = 4; value=60 }" size="19px" round color="deep-orange-9">
              <q-icon name="las la-angle-right" />
            </q-btn>
          </q-circular-progress>

        </q-page-sticky>

         <q-page-sticky position="bottom-left" :offset="[90, 40]">

          <div clickable @click="() => {step = 2; value=20; checkValidate = false}" class="app-font-bold text-deep-orange-9 text-subtitle1">Voltar</div>


        </q-page-sticky>
      </q-step>

      <q-step
        :name="4"
        icon="add_comment"
        :done="step > 4"
        :header-nav="step > 4"
        class="window-height"
        title="descrição evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          4. Descrição do evento
        </div>
        <q-editor v-model="eventData.description" min-height="15rem" class="q-mt-md" toolbar-text-color="grey-9" style="margin-bottom:150px"
          :rules="[ val => val && val.length < 20 || 'Número máximo de caracteres']"
        />
        

        <q-page-sticky position="bottom-right" :offset="[60, 10]">

          <q-circular-progress
            
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            track-color="transparent"
            >
            <q-btn :disable="checkValidate" @click="() => { done4 = true; step = 5; value=80; checkBtn2() }" size="19px" round color="deep-orange-9">
              <q-icon name="las la-angle-right" />
            </q-btn>
          </q-circular-progress>

        </q-page-sticky>
         <q-page-sticky position="bottom-left" :offset="[90, 40]">

          <div clickable @click="() => {step = 3; value=40; checkValidate = false}" class="app-font-bold text-deep-orange-9 text-subtitle1">Voltar</div>


        </q-page-sticky>
      </q-step>

      <q-step
        :name="5"
        icon="las la-user"
        :header-nav="step > 5"
        class="window-height"
        title="organizador evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          5. Sobre o organizador
          <div class="text-red-14" style="font-size:2vh">
            * Campos obrigatórios
          </div>
        </div>
        <q-input v-model="eventData.nameResponsible" ref="refNameOrg" label="Nome do organizador *" color="grey-7"
          :rules="[ val => val && val.trim().length > 0 || 'Nome do organizador é obrigatório']"
        />
        <q-input v-model="eventData.whatsapp" ref="refWhats" type="tel" label="WhatsApp *" color="grey-7" class="q-mt-md" mask="(##) ##### - ####" hint="Esta informação não ficará pública." style="margin-bottom: 20%"
          :rules="[ val => val && val.trim().length > 0 || 'Whatsapp é obrigatório, Caso não tenha whatsapp, informe um número para contato.',
                    val => val && val.trim().length == 17 || 'Número inválido']"
        />



        <q-page-sticky position="bottom-right" :offset="[60, 10]">

          <q-circular-progress
            
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            track-color="transparent"
            type= "submit"
            >
            <q-btn :disable="checkValidate" @click="done5 = true; value=100, submitForm()" size="19px" round color="deep-orange-9">
              <q-icon name="las la-angle-right" />
            </q-btn>
          </q-circular-progress>

        </q-page-sticky>

         <q-page-sticky position="bottom-left" :offset="[90, 40]">

          <div clickable @click="() => {step = 4; value=60; checkValidate = false}" class="app-font-bold text-deep-orange-9 text-subtitle1">Voltar</div>


        </q-page-sticky>

      </q-step>
    </q-stepper>
    </q-form>


  
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import moment from "moment"
import { Notify } from 'quasar'

export default {
  name: 'PageIndex',

  data () {
    return {
      step: 1,
      optionsCategorie: [
        'Acadêmico', 'Artes Visuais', 'Competições', 'Esportes', 'Exposições', 'Festas e Shows', 'Online', 'Palestras', 'Religiosos', 'Teatro e Espetáculos'
      ],
      optionsAdress: [
        'Cadastrar um endereço', 'Online'
      ],
      optionsEntrance: [
        'Gratuito', 'Pago'
      ],
      value: 0,
      modelAdress: 'Cadastrar um endereço',
      checkValidate: true,
      validateName: false,
      validateCategorie: false,
      validateEntrace: false,
      validateLocalName: false,
      validateStreet: false,
      validateBairro: false,
      validateNumber: false,
      validateOnline: false,
      validateNameOrg: false,
      validateWhats: false,

      eventData: {
        eventName: '',
        modelCategorie: '',  
        modelEntrance: '',
        image: null,
        imagePreview: '/statics/placeholder.png',
        dateStart: '',
        time: '',
        dateEnd: '',
        adressLocalName: '',
        adressStreet: '',
        adressNumber: '',
        adressBairro: '',
        adressOnline: '',
        adressOption: '',
        description: '',
        nameResponsible: '',
        whatsapp: ''

         
      }
      

    }
    
  },

   methods: {
    previewImage(e) {
      const file = e.target.files[0];
      console.log(file)
      this.eventData.image = file
      this.eventData.imagePreview = URL.createObjectURL(file);
      console.log(this.eventData.imagePreview)
      console.log(this.eventData)

    },

    closeModelDate() {
      this.$refs.qDateProxy.hide()
    },

    setDateEnd() {
      this.eventData.dateEnd = this.eventData.dateStart
    },

    checkDateStart() {
        var dateActually = moment().format('YYYY/MM/DD')
        var dateStartFormat = moment(this.eventData.dateStart, 'DD/MM/YYYY').format('YYYY/MM/DD')
        if(dateStartFormat < dateActually){
          this.eventData.dateStart = new Date().getDate().toString().padStart(2,0)+'/'+(new Date().getMonth()+1).toString().padStart(2,0)+'/'+new Date().getFullYear();
          this.eventData.dateEnd = this.eventData.dateStart
        }
       return moment(dateActually).isSameOrBefore(dateStartFormat)
    },

    checkDateEnd(){
      var dateStartFormat = moment(this.eventData.dateStart, 'DD/MM/YYYY').format('YYYY/MM/DD')
      var dateEndFormat = moment(this.eventData.dateEnd, 'DD/MM/YYYY').format('YYYY/MM/DD')

      if(dateEndFormat < dateStartFormat){
        this.eventData.dateEnd = this.eventData.dateStart
      }
      
      return moment(dateStartFormat).isSameOrBefore(dateEndFormat)
    },

    checkAdress () {
      if(this.optionsAdress == 'Online'){
        return val && val.trim().length > 0
      }
 
    },

    checkBtn1() {
      if((this.eventData.adressLocalName != '' && this.eventData.adressStreet != '' && this.eventData.adressBairro != '' && this.eventData.adressNumber)
        || this.eventData.adressOnline){
          this.checkValidate = false
      }else{
        this.checkValidate = true
      }
    },

    checkBtn2() {
      if(this.eventData.nameResponsible != '' && this.eventData.whatsapp != '' ){
          this.checkValidate = false
      }else{
        this.checkValidate = true
      }
    },

     ...mapActions('store', [ 'createEvents']),
      
    submitForm() {

      if(this.eventData.adressOnline == ''){
        this.eventData.adressOption = 'Físico'
      }else{
        this.eventData.adressOption = 'Online'
      }

      this.createEvents(this.eventData)
                  
      
    }
       
  },
  

  mounted() {
    this.eventData.dateStart = new Date().getDate().toString().padStart(2,0)+'/'+(new Date().getMonth()+1).toString().padStart(2,0)+'/'+new Date().getFullYear();
    this.eventData.dateEnd = new Date().getDate().toString().padStart(2,0)+'/'+(new Date().getMonth()+1).toString().padStart(2,0)+'/'+new Date().getFullYear();

    var hour = (new Date().getHours()).toString().padStart(2,0)
    var minute = (new Date().getMinutes()).toString().padStart(2,0)
    this.eventData.time = hour + ':' + minute
    
  },

  watch: {
    'modelAdress': function (val) {
      if(val == 'Online'){
          this.eventData.adressLocalName = ''
          this.eventData.adressStreet = ''
          this.eventData.adressNumber = ''
          this.eventData.adressBairro = ''


          this.checkValidate = true


      }
      if(val == 'Cadastrar um endereço'){
          this.eventData.adressOnline = ''

          this.checkValidate = true

      }

    },
    'eventData.eventName': {
      
      handler: function(val){
        this.$refs.refName.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refName.hasError){
            this.validateName = true
            console.log(this.validateName)
          }else{
            this.validateName = false 
          }
          if(this.validateName == true && this.validateCategorie == true && this.validateEntrace == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
          
        }, 100)

        
      },
      
    },

    'eventData.modelCategorie': {
      
      handler: function(val){
        this.$refs.refCategorie.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refCategorie.hasError){
            this.validateCategorie = true
            console.log(this.validateCategorie)
          }
          else{
            this.validateCategorie = false
          }
          if(this.validateName == true && this.validateCategorie == true && this.validateEntrace == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.modelEntrance': {
      
      handler: function(val){
        this.$refs.refEntrace.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refEntrace.hasError){
            this.validateEntrace = true
            console.log(this.validateEntrace)
          }
          else{
            this.validateEntrace = false
          }
          if(this.validateName == true && this.validateCategorie == true && this.validateEntrace == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.modelAdress':{
      handler:function(val){
        if(this.modelAdress == 'Online'){
          this.checkValidate = true
        }
      }
    },

    'eventData.adressLocalName': {
      
      handler: function(val){
        this.$refs.refLocalName.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refLocalName.hasError){
            this.validateLocalName = true
            console.log(this.validateLocalName)
          }
          else{
            this.validateLocalName = false
          }
          if(this.modelAdress == 'Cadastrar um endereço' && this.validateLocalName == true && this.validateStreet == true && this.validateNumber == true && this.validateBairro == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.adressStreet': {
      
      handler: function(val){
        this.$refs.refStreet.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refStreet.hasError){
            this.validateStreet = true
            console.log(this.validateStreet)
          }
          else{
            this.validateStreet = false
          }
          if(this.modelAdress == 'Cadastrar um endereço' && this.validateLocalName == true && this.validateStreet == true && this.validateNumber == true && this.validateBairro == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.adressBairro': {
      
      handler: function(val){
        this.$refs.refBairro.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refBairro.hasError){
            this.validateBairro = true
            console.log(this.validateBairro)
          }
          else{
            this.validateBairro = false
          }
          if(this.modelAdress == 'Cadastrar um endereço' && this.validateLocalName == true && this.validateStreet == true && this.validateNumber == true && this.validateBairro == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.adressNumber': {
      
      handler: function(val){
        this.$refs.refNumber.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refNumber.hasError){
            this.validateNumber = true
            console.log(this.validateNumber)
          }
          else{
            this.validateNumber = false
          }
          if(this.modelAdress == 'Cadastrar um endereço' && this.validateLocalName == true && this.validateStreet == true && this.validateBairro == true && this.validateNumber == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.adressOnline': {
      
      handler: function(val){
        this.$refs.refOnline.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refOnline.hasError){
            this.validateOnline = true
            console.log(this.validateOnline)
          }
          else{
            this.validateOnline = false
          }
          if(this.modelAdress == 'Online' && this.validateOnline == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.nameResponsible': {
      
      handler: function(val){
        this.$refs.refNameOrg.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refNameOrg.hasError){
            this.validateNameOrg = true
            console.log(this.validateNameOrg)
          }
          else{
            this.validateNameOrg = false
          }
          if(this.validateNameOrg == true && this.validateWhats == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    'eventData.whatsapp': {
      
      handler: function(val){
        this.$refs.refWhats.validate()
        console.log(val)
        setTimeout(() => {
          if(!this.$refs.refWhats.hasError){
            this.validateWhats = true
            console.log(this.validateWhats)
          }
          else{
            this.validateWhats = false
          }
          if(this.validateNameOrg == true && this.validateWhats == true){
          this.checkValidate = false
          console.log(this.checkValidate)
        }else{
          this.checkValidate = true
        }
        }, 100)
         
      },
      
    },

    



  }
}
</script>

<style scoped>

.border-img {
  border-style: dashed; 
  border-color: rgb(201, 195, 195);
  height: 300px;
  width: 40%;
}

.inputFile {
  visibility: hidden;
}



</style>
