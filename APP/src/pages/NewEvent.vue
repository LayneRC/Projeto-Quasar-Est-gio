<template>
  <q-page  >

     <div class="">

    <q-form  @submit.prevent="submitForm">
    <q-stepper
      v-model="step"
      header-nav
      ref="stepper"
      done-color="deep-orange-9"
      active-color="deep-orange-9"
      flat
      contracted
      animated
       
    >
      <q-step
        :name="1"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
        style="height: 81.01vh"
        title="identificação do evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          1. Identificação do evento
        </div>
        <q-input v-model="eventData.eventName" label="Nome do evento" color="grey-7" class="app-font-light"
          :rules="[
            val => val.length > 0 || 'Nome do evento é obrigatório'
          ]"
        />
        <q-select v-model="eventData.modelCategorie" :options="optionsCategorie" color="deep-orange-9" class="app-font-light q-mt-sm" label="Categoria principal"
           :rules="[
            val => val.length > 0 || 'Categoria é obrigatório'
          ]"
        />
        <q-select v-model="eventData.modelEntrance" :options="optionsEntrance" color="deep-orange-9" class="app-font-light q-mt-sm" label="Entrada"
          :rules="[
            val => val.length > 0 || 'Entrada é obrigatório'
          ]"

        />


        <div v-if="!eventData.image" class="border-img q-pa-sm bg-grey-1 q-mt-xl text-center flex flex-center">
          <div class="text-center">
            <div>
              <q-icon name="add_photo_alternate" size="40px" color="grey-6"/>
            </div>
            <div>
              Clique aqui para carregar uma imagem
            </div>
          </div>

          <q-menu touch-position>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="getImageCamera">
                <q-item-section>Camera</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="captureImageFromGallery">
                <q-item-section>Galeria</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>

        <q-img
          v-if="eventData.image"
          :src="eventData.image"
          :ratio="16/9"
          class="border-img q-mt-xl"

        />

        <div class="">
          A dimensão recomenda  é xx X xx
        </div>

        


        <q-page-sticky position="bottom-right" :offset="[5, 5]">

          <q-circular-progress
            @click="() => { done1 = true; step = 2; value=20 }"
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="grey-9"
            center-color="deep-orange-9"
            track-color="transparent"
            >
            <q-icon name="las la-angle-right" />
          </q-circular-progress>

        </q-page-sticky>
        
      </q-step>

      <q-step
        :name="2"
        caption="Optional"
        icon="las la-clock"
        :done="step > 2"
        :header-nav="step > 2"
        style="height: 81.01vh"
        title="data evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          2. Quando o evento vai acontecer?
        </div>
        <div class="q-pa-lg" style="max-width: 300px">
          <div class="app-font-bold text-grey-10">
            Início
          </div>
          <q-input v-model="eventData.dateStart" readonly>
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="eventData.dateStart"  color="deep-orange-9" today-btn mask="DD/MM/YYYY" @input="closeModelDate(); setDateEnd();" />
            </q-popup-proxy>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
              </q-icon>
            </template>
            
          </q-input>
          <div class="q-mt-sm">
            <q-input v-model="eventData.time" mask="time" readonly >
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="eventData.time" format24h color="deep-orange-9"/>
              </q-popup-proxy>
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="q-mt-md">
            <div class="app-font-bold text-grey-10">
              Fim
            </div>
            <q-input v-model="eventData.dateEnd" readonly :rules="[val => checkDateEnd() || 'Data final inválida']">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="eventData.dateEnd" color="deep-orange-9" today-btn mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
              </q-popup-proxy>
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                </q-icon>
              </template>
            </q-input>
          </div>
          
        </div>
        

        <q-page-sticky position="bottom-right" :offset="[5, 5]">

          <q-circular-progress
            @click="() => { done2 = true; step = 3; value=40 }"
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            center-color="deep-orange-9"
            track-color="transparent"
            >
            <q-icon name="las la-angle-right" />
          </q-circular-progress>

        </q-page-sticky>

        <q-page-sticky position="bottom-left" :offset="[20, 40]">

          <div clickable @click="() => {step = 1; value=0}" class="app-font-bold text-deep-orange-9">Voltar</div>


        </q-page-sticky>
      </q-step>

      <q-step
        :name="3"
        icon="las la-map-marker-alt"
        :done="step > 3"
        :header-nav="step > 3"
        style="height: 81.01vh"
        title="lucal evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          3. Onde o seu evento vai acontecer?
        </div>
        <q-select v-model="modelAdress" :options="optionsAdress" color="deep-orange-9"/>
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="eventData.adressLocalName" label="Nome do local" color="grey-7" class="q-mt-md"
          :rules="[
            val => val && val.length > 0 || 'O nome do local é obrigatório'
          ]"
        />
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="eventData.adressStreet" label="Av/Rua" color="grey-7" class="q-mt-md"
          :rules="[
            val => val && val.length > 0 || 'Rua é obrigatório'
          ]"
        />
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="eventData.adressNumber" label="Número" color="grey-7" class="q-mt-md"
          :rules="[
            val => val && val.length > 0 || 'Número é obrigatório. Caso não tenha número colocar S/N'
          ]"
        />
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="eventData.adressBairro" label="Bairro" color="grey-7" class="q-mt-md q-mb-xl"
          :rules="[
            val => val && val.length > 0 || 'Bairro é obrigatório'
          ]"
        />

        <q-input v-if="modelAdress == 'Online'" v-model="eventData.adressOnline" label="Endereço online" color="grey-7" class="q-mt-md"
          :rules="[
            val => val && val.length > 0 || 'O endereço online é obrigatório. Caso ainda não tenha colocar A definir. Você poderá alterar posteriormente.'
          ]"
        />

        <q-page-sticky position="bottom-right" :offset="[5, 5]">

          <q-circular-progress
            @click="() => { done2 = true; step = 4; value=60 }"
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            center-color="deep-orange-9"
            track-color="transparent"
            >
            <q-icon name="las la-angle-right" />
          </q-circular-progress>

        </q-page-sticky>

         <q-page-sticky position="bottom-left" :offset="[20, 40]">

          <div clickable @click="() => {step = 2; value=20}" class="app-font-bold text-deep-orange-9">Voltar</div>


        </q-page-sticky>
      </q-step>

      <q-step
        :name="4"
        icon="add_comment"
        :done="step > 4"
        :header-nav="step > 4"
        style="height: 81.01vh"
        title="descrição evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          4. Descrição do evento
        </div>
        <q-editor v-model="eventData.description" min-height="15rem" class="q-mt-md q-mb-xl"/>
        

        <q-page-sticky position="bottom-right" :offset="[5, 5]">

          <q-circular-progress
            @click="() => { done4 = true; step = 5; value=80 }"
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            center-color="deep-orange-9"
            track-color="transparent"
            >
            <q-icon name="las la-angle-right" />
          </q-circular-progress>

        </q-page-sticky>
         <q-page-sticky position="bottom-left" :offset="[20, 40]">

          <div clickable @click="() => {step = 3; value=40}" class="app-font-bold text-deep-orange-9">Voltar</div>


        </q-page-sticky>
      </q-step>

      <q-step
        :name="5"
        icon="las la-user"
        :header-nav="step > 5"
        style="height: 81.01vh"
        title="organizador evento"
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          5. Sobre o organizador
        </div>
        <q-input v-model="eventData.nameResponsible" label="Nome do organizador" color="grey-7"
          :rules="[
            val => val && val.length > 0 || 'Nome do organizador é obrigatório'
          ]"
        />
        <q-input v-model="eventData.whatsapp" type="tel" label="WhatsApp" color="grey-7" class="q-mt-md" mask="(##) ##### - ####"
        hint="Essa informação não ficará pública."
        lazy-rules
        :rules="[val => val != '' || 'O whatsapp é obrigatório',
                val => val.length == 17 || 'Número invalido']"
        
        />



        <q-page-sticky position="bottom-right" :offset="[5, 5]">

          <q-circular-progress
            @click="done5 = true; value=100; submitForm()"
            show-value
            class="text-white q-ma-md"
            :value="value"
            size="70px"
            :thickness="0.2"
            color="blue-3"
            center-color="deep-orange-9"
            track-color="transparent"
            type= "submit"
            >
            <q-icon name="las la-angle-right" />
          </q-circular-progress>

        </q-page-sticky>

         <q-page-sticky position="bottom-left" :offset="[20, 40]">

          <div clickable @click="() => {step = 4; value=60}" class="app-font-bold text-deep-orange-9">Voltar</div>


        </q-page-sticky>

      </q-step>
    </q-stepper>
    </q-form>
  </div>
    

   
    
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'

export default {
  name: 'PageExample',

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
      // checkRequiredWhats: val => val && val.length > 0 || 'O whatsapp é obrigatório',
      // checkLengthWhats: val => val && val.length == 9 || 'Número invalido',

      eventData: {
        eventName: '',
        modelCategorie: '',  
        modelEntrance: '',
        image: null,
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
    getImageCamera() {
      navigator.camera.getPicture(
        data => { // on success
          this.eventData.image = `data:image/jpeg;base64,${data}`
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
          this.eventData.image = `data:image/jpeg;base64,${data}`
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

    closeModelDate() {
      this.$refs.qDateProxy.hide()
    },

    setDateEnd() {
      this.eventData.dateEnd = this.eventData.dateStart
    },

    checkDateEnd() {
      var dateEndFormat = moment(this.eventData.dateEnd, 'DD/MM/YYYY').format('YYYY/MM/DD')
      var dateStartFormat = moment(this.eventData.dateStart, 'DD/MM/YYYY').format('YYYY/MM/DD')

      if(dateEndFormat < dateStartFormat){
        return false
      }else {
        return true
      }
      
    },

    checkWhats() {
      if(this.eventData.whatsapp ==''){
        return 'Whats é obrigatorio'
      }
      if(this.eventData.whatsapp.length != 9){
        return 'numero invalido'
      }
    },

    reset () {
      this.$refs.inputWhats.resetValidation()
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
    var currentdate = new Date()
    var hour = currentdate.getHours()
    var minute = currentdate.getMinutes()
    if(minute < 10 || hour < 10){
      minute = '0' + minute
      hour = '0' + hour

      this.eventData.time = hour + ":" + minute.slice(-2)

    }
    this.eventData.time = hour + ":" + minute
    
  }

  
  
}
</script>

<style scoped>

.border-img {
  border-style: dashed; 
  border-color: rgb(201, 195, 195);
  height: 30vh
}

</style>



