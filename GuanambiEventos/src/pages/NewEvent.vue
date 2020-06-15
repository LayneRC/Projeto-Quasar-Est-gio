<template>
  <q-page  >

     <div class="">

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
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          1. Identificação do evento
        </div>
        <q-input v-model="text" label="Nome do evento" color="grey-7" class="app-font-light"/>
        <q-select v-model="modelCategorie" :options="optionsCategorie" color="deep-orange-9" class="app-font-light q-mt-sm"/>


        <div class="border-img q-pa-sm bg-grey-1 q-mt-xl text-center flex flex-center" style="height: 30vh">
          <div class="text-center">
            <div>
              <q-icon name="add_photo_alternate" size="40px" color="grey-6"/>
            </div>
            <div>
              Clique aqui para carregar uma imagem
            </div>
          </div>
        </div>

        <div class="q-mt-xs">
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
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          2. Quando o evento vai acontecer?
        </div>
        <div class="q-pa-lg" style="max-width: 300px">
          <div class="app-font-bold text-grey-10">
            Início
          </div>
          <q-input v-model="dateStart" readonly>
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateStart" color="deep-orange-9" today-btn mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
              </q-icon>
            </template>
          </q-input>
          <div class="q-mt-sm">
            <q-input v-model="time" mask="time" readonly :rules="['time']">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-time v-model="time" format24h color="deep-orange-9" />
              </q-popup-proxy>
              <template v-slot:prepend>
                <q-icon name="access_time" class="cursor-pointer">
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="app-font-bold text-grey-10">
            Fim
          </div>
          <q-input v-model="dateEnd" readonly>
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date v-model="dateEnd" color="deep-orange-9" today-btn mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()" />
            </q-popup-proxy>
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer">
              </q-icon>
            </template>
          </q-input>
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
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          3. Onde o seu evento vai acontecer?
        </div>
        <q-select v-model="modelAdress" :options="optionsAdress" color="deep-orange-9"/>
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="text" label="Nome do local" color="grey-7" class="q-mt-md"/>
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="text" label="Av/Rua" color="grey-7" class="q-mt-md"/>
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="text" label="Número" color="grey-7" class="q-mt-md"/>
        <q-input v-if="modelAdress == 'Cadastrar um endereço'" v-model="text" label="Bairro" color="grey-7" class="q-mt-md"/>



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
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          4. Descrição do evento
        </div>
        <q-editor v-model="editor" min-height="15rem" class="q-mt-md"/>
        

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
      >
        <div class="app-font-bold text-deep-orange-9" style="font-size:3vh">
          5. Sobre o organizador
        </div>
        <q-input v-model="text" label="Nome do organizador" color="grey-7"/>
        <q-input v-model="tel" type="tel" label="WhatsApp" color="grey-7" class="q-mt-md"/>



        <q-page-sticky position="bottom-right" :offset="[5, 5]">

          <q-circular-progress
            @click="done5 = true; value=100"
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

          <div clickable @click="() => {step = 4; value=60}" class="app-font-bold text-deep-orange-9">Voltar</div>


        </q-page-sticky>

      </q-step>
    </q-stepper>
  </div>
    

   
    
  </q-page>
</template>

<script>
export default {
  name: 'PageExample',

   data () {
    return {
      step: 1,
      value: 0,
      dateStart: '11/06/2020',
      dateEnd: '15/06/2020',
      time: '10:56',
      modelAdress: 'Cadastrar um endereço',
      optionsAdress: [
        'Cadastrar um endereço', 'Online'
      ],
      editor: '',
      modelCategorie: 'Categoria principal',
      optionsCategorie: [
        'Acadêmico', 'Artes Visuais', 'Competições', 'Esportes', 'Exposições', 'Festas e Shows', 'Online', 'Palestras', 'Religiosos', 'Teatro e Espetáculos'
      ],

  
    }
  },

  
  
}
</script>

<style scoped>

.border-img {
  border-style: dashed; 
  border-color: rgb(201, 195, 195);
  height: 25vh
}

</style>



