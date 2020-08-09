import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth, db } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
    loggedIn: false

}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    }

}

const actions = {
    registerUser ({}, payload) {
        Loading.show({
            message: 'Registrando usuário'
          })
        firebaseAuth.createUserWithEmailAndPassword(
        payload.email, payload.password)
        .then(response => {
            console.log('response: ', response)
            db.collection('users').add({
                userID: response.user.uid,
                userName: payload.name.toUpperCase(),
                userEmail: payload.email,
                userNivel: 'usuario',
                favorites: []
            })
        })
        .catch(error => {
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode == 'auth/email-already-in-use') {
                console.log('foi')
                errorMessage = 'Email já cadastrado.'
                showErrorMessage(errorMessage)
            } else {
                showErrorMessage(errorMessage)
                console.log(error +' '+ errorCode);
            }
        })
    },

    loginUser ({}, payload) {
        Loading.show({
            message: 'Validando usuário'
          })
        firebaseAuth.signInWithEmailAndPassword(
            payload.email, payload.password)
            .then(response => {
                console.log('response: ', response)
            })
            
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if(errorCode == 'auth/user-not-found') {
                    console.log('foi')
                    errorMessage = 'Email não cadastrado.'
                    showErrorMessage(errorMessage)
                }
                else if(errorCode == 'auth/wrong-password') {
                    console.log('foi')
                    errorMessage = 'Senha incorreta para o email cadastrado.'
                    showErrorMessage(errorMessage)
                } else {
                    showErrorMessage(errorMessage)
                    console.log(error +' '+ errorCode);
                }
                
            });

    },

    loggoutUser() {
        console.log('loggoutUser')
        firebaseAuth.signOut()
    },

    handleAuthStateChange({ commit }) {
        firebaseAuth.onAuthStateChanged(user => {
            Loading.hide()
            if (user) {
              commit('setLoggedIn', true)
              LocalStorage.set('loggedIn', true)
              this.$router.push('/index').catch(err => {})
            } else {
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.replace('/').catch(err => {})
            }
        })
    }

}

const getters = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}