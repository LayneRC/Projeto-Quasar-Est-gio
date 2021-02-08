<template>
  <div >

   <q-card class="my-card q-pa-sm" :class="status" flat bordered @click="dialogCard = true" >
        <q-card-section horizontal>
          <q-img v-if="event.eventImg != ''"
            class="col-5"
            :src="event.eventImg"
            :ratio="1"
            style="border-radius: 3px"
            
          />

          <q-img v-if="event.eventImg == ''"
            class="col-5"
            src="https://i.ibb.co/smfDnVS/Vermelho-rvore-de-Natal-Arte-de-Natal-Cart-o-5.png"
            :ratio="1"
            style="border-radius: 3px"
            
          />
          

          <q-card-section class="full-width ">

            <div v-if="((event.eventStatus == 0 || event.eventStatus == 1) && event.eventCancel == 0) && this.datePast == true"  class="no-shadow absolute-right">
              <q-icon @click.stop="menuOptions = true" name="las la-ellipsis-v" color="deep-orange-9" size="25px"/>
              <q-menu class="shadow-0"
                v-model="menuOptions"
                anchor="top left"
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list style="min-width: 100px">
                  <q-item clickable @click="$router.push({name:  'edit', params: {event}}); menuOptions = false" class="text-grey-9 app-font-bold">
                    <q-item-section>
                      <div class="row">
                        <q-icon class="q-mr-xs" name="las la-edit" color="amber-10" size="20px"/>
                        <div class="text-amber-10">
                          Alterar
                        </div>
                      </div>                    
                    </q-item-section>
                  </q-item>
                  <q-item clickable @click="confirmCancel = true; menuOptions = false" class="text-grey-9 app-font-bold">
                    <q-item-section>
                      <div class="row">
                        <q-icon class="q-mr-xs" name="las la-times-circle" color="red-7" size="20px"/>
                        <div class="text-red-7">
                          Cancelar
                        </div>
                      </div> 
                    </q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </div>

            <div class="text-deep-orange-9 app-font-bold q-ml-sm">
              {{date.weekDay +', '+date.day+' '+date.month+' '+date.year}}
              <br>
              {{event.eventTime}}
            </div>
            <div class="divName app-font-bold text-grey-9 q-ml-sm text-justify" style="font-size: 16px">
              {{ event.eventName }}
            </div>
            <div v-if="!eventOnline" class="app-font-light q-ml-sm">
              {{ event.eventAdressLocalName }}
            </div>
            <div v-if="eventOnline" class="app-font-light q-ml-sm q-mb-md">
              Online
            </div>
            <div class="row q-ml-sm text-center absolute-bottom">
              <div class=" text-bold q-mt-sm vertical-center app-font-bold" :class="nameStatus">
                {{textStatus}}
              </div>
              <q-space/>
              <div class="q-mt-xs">
                <q-icon name= "las la-heart" size="27px" color="red"/>
                {{ event.likes }}
              </div>
              <q-icon v-if="event.eventStatus == 1 && event.eventCancel == 0" @click.stop="showLoading(), share()" class="q-ml-md q-mt-xs" name="o_share" size="27px" color="blue-9"/>
            </div>
          </q-card-section>
        </q-card-section>

        <q-dialog
          v-model="dialogCard"
          :maximized="maximizedToggleCard"
          transition-show="scale"
          transition-hide="scale"
          >
          <event-dialog :eventData = this.event />
        </q-dialog>

        <q-dialog v-model="confirmCancel">
          <q-card class="">
            <q-card-section class="bg-deep-orange-9">
              <div class="row q-pa-sm">
                <q-icon name="las la-exclamation-triangle" color="white" size="30px"/>
                <div class="text-h6 app-font-bold text-white q-ml-md">Confirmar cancelamento</div>
              </div>
              
            </q-card-section>

            <q-card-section class="q-pt-none app-font-light">
              <div class="q-px-md q-mt-sm text-subtitle1 text-grey-7">
                Tem certeza que deseja cancelar o evento <span class="text-deep-orange-9 text-bold"> {{event.eventName}}</span>?
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Não" color="red" v-close-popup />
              <q-btn flat label="Sim" color="green" @click="cancelEvents(event.eventID)" v-close-popup />
            </q-card-actions>
          </q-card>

        </q-dialog>

      </q-card>
    
  </div>
</template>

<script>
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
import { QSpinner } from 'quasar'


export default {
  name: 'PageExample',

   data () {
    return {
      dialogCard: false,
      menuOptions: false,
      eventStatusPendAprov: false,
      maximizedToggleCard: true,
      confirmCancel: false,
      status: '',
      textStatus: 'PENDENTE',
      nameStatus: '',
      eventOnline: false,
      userFavorite: 'lar la-heart',
      heartBeat: 'animated heartBeat my-delay',
      date:{
        day: null,
        month: null,
        year: null,
        weekDay: null
      },
      datePast: '',
      dateActually: '',
      dateStartFormat: '',
      dateEndFormat: ''

    }
  },

  computed: {
    ...mapGetters('store', ['userData'])
  },

  methods: {
    ...mapActions('store', ['cancelEvents']),

    showLoading () {
      this.$q.loading.show({
        spinner: QSpinner,
        spinnerColor: 'white',
        spinnerSize: 100,
        message: 'Compartilhar evento...',
        messageColor: 'white'
      })

      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 3000)
    },

    share(){
      var texto = "*" + this.event.eventName + "*" + "\n" + "\n" + this.event.eventDateStart + "\n" + this.event.eventTime + 
                  "\n" + "\n" + this.event.eventDescription

      if(this.event.eventImg != ''){
        var  options  = { 
          message : texto, //  não compatível com alguns aplicativos (Facebook, Instagram)  
          chooserTitle : ' Compartilhar evento ' , //  Android apenas, você pode substituir o título da planilha de compartilhamento padrão 
          files: [this.event.eventImg],
        } 
      }else{
        var  options  = { 
          message : texto, //  não compatível com alguns aplicativos (Facebook, Instagram)  
          chooserTitle : ' Compartilhar evento ' , //  Android apenas, você pode substituir o título da planilha de compartilhamento padrão 
          files: ["https://i.ibb.co/smfDnVS/Vermelho-rvore-de-Natal-Arte-de-Natal-Cart-o-5.png"],
        } 
      }
      
       window.plugins.socialsharing.shareWithOptions (options)
    },

    openMenu(){
      console.log("testemenu")
      this.menuOptions = true
    },

    checkDate() {
      
            
    }

  },

  mounted() {
    this.date.day = moment(this.event.eventDateStart, "DD/MM/YYYY").format("D")
    this.date.month = moment(this.event.eventDateStart, "DD/MM/YYYY").format("MMM")
    this.date.year = moment(this.event.eventDateStart, "DD/MM/YYYY").format("YYYY")
    this.date.weekDay = (moment(this.event.eventDateStart, "DD/MM/YYYY").format("ddd"))
    this.date.weekDay = this.date.weekDay.charAt(0).toUpperCase() + this.date.weekDay.slice(1)
    this.date.month = this.date.month.charAt(0).toUpperCase() + this.date.month.slice(1)
    console.log(this.date)
    if(this.event.eventAdressOnline){
      this.eventOnline = true
    }

    if(this.event.eventCancel == 1){
      this.status = 'bg-red-2'
      this.textStatus = 'CANCELADO'
      this.nameStatus = 'text-red'

    }

    if(this.event.eventStatus == 1 && this.event.eventCancel == 0){
      this.status = 'bg-green-2'
      this.textStatus = 'APROVADO'
      this.nameStatus = 'text-light-green-10'

    }

    if(this.event.eventStatus == 2 && this.event.eventCancel == 0){
      this.status = 'bg-red-2'
      this.textStatus = 'REPROVADO'
      this.nameStatus = 'text-red-10'

    }

    if(this.event.eventStatus == 0 && this.event.eventCancel == 0){
      this.status = ''
      this.textStatus = 'PENDENTE'
      this.nameStatus = 'text-amber-9'

    }

    this.dateActually = moment().format('YYYY/MM/DD')
    this.dateStartFormat = moment(this.event.eventDateStart, 'DD/MM/YYYY').format('YYYY/MM/DD')
    this.dateEndFormat = moment(this.event.eventDateEnd, 'DD/MM/YYYY').format('YYYY/MM/DD')
    console.log(this.dateActually, this.dateStartFormat, this.dateEndFormat)

    if(moment(this.dateStartFormat).isBefore(this.dateActually) && moment(this.dateEndFormat).isBefore(this.dateActually)){
      console.log('menor')
      this.datePast = false
    }else{
      this.datePast = true
    }

  },

  watch: {
    'event.eventStatus': function (val) {
      
       if(val == 1 && this.event.eventCancel == 0){
        this.status = 'bg-green-2'
        this.textStatus = 'APROVADO'
        this.nameStatus = 'text-light-green-10'

      }
       if(val == 2 && this.event.eventCancel == 0){
        this.status = 'bg-red-2'
        this.textStatus = 'REPROVADO'
        this.nameStatus = 'text-red-10'

      }

      if(val == 0  && this.event.eventCancel == 0){
        this.status = ''
        this.textStatus = 'PENDENTE'
        this.nameStatus = 'text-amber-9'

      }
    },

    'event.eventCancel': function (val){
      if(val == 1){
        this.status = 'bg-red-2'
        this.textStatus = 'CANCELADO'
        this.nameStatus = 'text-red'
      }
    }
  },

  components: {
    'event-dialog': require("components/EventDialog.vue").default,

  },

  props: [
      "event"
  ]
  
}
</script>

<style scoped>

.divName{
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}


</style>
