import { LocalStorage, Loading } from 'quasar'
import { db, firebaseAuth } from 'boot/firebase'
// import * as firebase from 'firebase/app'
import { firestoreAction } from 'vuexfire'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  events: {}
}

const mutations = {
}
const actions = {

  loginUser ({ state }, payload) {
    console.log(payload)
    Loading.show({
      message: 'Validando usuário'
    })
    db.collection('users').where('userEmail', '==', payload.email).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().userNivel === 'Admin') {
          firebaseAuth.signInWithEmailAndPassword(
            payload.email, payload.password)
            .then(response => {
              console.log('response: ', response)
            })
            .catch(error => {
              var errorCode = error.code
              var errorMessage = error.message
              if (errorCode === 'auth/user-not-found') {
                errorMessage = 'Email não cadastrado.'
                showErrorMessage(errorMessage)
              }
              else if (errorCode === 'auth/wrong-password') {
                errorMessage = 'Senha incorreta para o email cadastrado.'
                showErrorMessage(errorMessage)
              } else {
                showErrorMessage(errorMessage)
                console.log(error + ' ' + errorCode)
              }
            })
        }
        else {
          var errorMessage = 'Email não cadastrado.'
          showErrorMessage(errorMessage)
        }
      })
    })
  },

  loggoutUser () {
    console.log('loggoutUser')
    firebaseAuth.signOut()
  },

  handleAuthStateChange () {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => { console.log(err) })
      } else {
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => { console.log(err) })
      }
    })
  },

  bindEvents: firestoreAction(({ bindFirestoreRef }) => {
    // return the promise returned by `bindFirestoreRef`
    return bindFirestoreRef('events', db.collection('events'))
  })

}

const pendentEvents = (state) => {
  return Object.values(state.events || {}).filter(i => i.eventStatus === 0)
}

const approvedEvents = (state) => {
  return Object.values(state.events || {}).filter(i => i.eventStatus === 1)
}

const reprovedEvents = (state) => {
  return Object.values(state.events || {}).filter(i => i.eventStatus === 2)
}

const getters = {

  events: (state) => {
    return state.events
  },

  pendentEvents: pendentEvents,
  approvedEvents: approvedEvents,
  reprovedEvents: reprovedEvents

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
