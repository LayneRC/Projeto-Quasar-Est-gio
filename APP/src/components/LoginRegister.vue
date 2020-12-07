<template>
    <q-form @submit.prevent="submitForm"> 
        <q-input 
            color="deep-orange-9" 
            v-model="formData.name" 
            label="Nome"
            v-if="tab == 'register'"
            :rules="[val => !!val || 'Nome é obrigatório']">
                <template v-slot:prepend>
                    <q-icon name="lar la-user" />
                </template>
        </q-input>
 
        <q-input 
            color="deep-orange-9 q-mt-sm " 
            v-model="formData.email" 
            label="Email"
            :rules="[val => isValidEmailAddress(val) || 'Email inválido']"
            lazy-rules
            ref="email">
                <template v-slot:prepend>
                    <q-icon name="lar la-envelope" />
                </template>
        </q-input>
 
        <q-input 
            color="deep-orange-9 q-mt-sm " 
            v-model="formData.password" 
            label="Senha" 
            type="password"
            :rules="[ val => val.length >= 6 || 'A senha deve conter no mínimo 6 caracteres' ]"
            ref="password">
                <template v-slot:prepend>
                    <q-icon name="las la-lock" />
                </template>
        </q-input>

        <q-input 
            color="deep-orange-9 q-mt-sm q-mb-lg" 
            v-model="formData.confirmedPwd" 
            label="Confirmar senha" 
            type="password"
            v-if="tab == 'register'"
            :rules="[ val => val == formData.password || 'As senhas não são iguais' ]">
                <template v-slot:prepend>
                    <q-icon name="las la-lock" />
                </template>
        </q-input>

        <q-btn 
            v-if="tab == 'login'" 
            type="submit"
            color="primary" 
            label="Vamos lá" 
            class="botao q-px-lg q-mt-lg app-font-bold text-bold"
        />

        <q-btn 
            v-if="tab == 'register'" 
            type="submit"
            color="primary" 
            label="Registrar" 
            class="botao q-px-lg app-font-bold text-bold"
        />
    </q-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: ['tab'],

    data() {
        return {
            formData: {
                name: '',
                email: '',
                password: '',
                confirmedPwd: ''
            }
        }
        
    },

    methods: {
        ...mapActions('store', ['registerUser', 'loginUser']),
        isValidEmailAddress(email) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());

        },
        submitForm() {
            this.$refs.email.validate()
            this.$refs.password.validate()
            if(!this.$refs.email.hasError && !this.$refs.password.hasError){
                if(this.tab == 'login') {
                    this.loginUser(this.formData)

                } else {
                    console.log(this.formData.password)
                    this.registerUser(this.formData)
                    

                }
            }


        },

    }

}
</script>

<style>

.tab-panels {
  border-radius: 10px !important;
}

.q-tab-panel {
  margin-top: -50x !important;
}

.botao {
  background: rgb(180,53,14) !important;
  background: linear-gradient(83deg, rgba(180,53,14,1) 6%, rgba(196,58,15,1) 39%, rgba(221,85,40,1) 95%) !important;

}

</style>