import { LocalStorage, Loading, Notify, Dialog, uid } from 'quasar'
import { db, firebaseAuth, storage } from 'boot/firebase'
import * as firebase from 'firebase/app'
// import * as firebase from 'firebase/app'
import { firestoreAction } from 'vuexfire'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import moment from "moment"
import 'moment/locale/pt-br'

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
        LocalStorage.set('loggedInUser', firebaseAuth.currentUser.uid)
        console.log(loggedInUser)
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
  }),

  createEvents({}, payload) {
    Loading.show({
        message: 'Cadastrando evento'
    })
    db.collection('events').add({

    }).then(result => {
        let docID = result.id
        let user = firebaseAuth.currentUser; 
        if(payload.image == null) {
            db.collection("events").doc(docID).update({
                eventID: docID,
                userID: user.uid,
                likes: 0,
                eventStatus: 1,
                eventName: payload.eventName,
                eventCategorie: payload.modelCategorie,
                eventEntrace: payload.modelEntrance,
                eventImg: '',
                eventDateStart: payload.dateStart,
                eventTime: payload.time,
                eventDateEnd: payload.dateEnd,
                eventAdressOption: payload.adressOption,
                eventAdressLocalName: payload.adressLocalName,
                eventAdressStreet: payload.adressStreet,
                eventAdressNumber: payload.adressNumber,
                eventAdressBairro: payload.adressBairro,
                eventAdressOnline: payload.adressOnline,
                eventDescription: payload.description,
                eventNameResponsible: payload.nameResponsible,
                eventWhatsappResponsible: payload.whatsapp,
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                eventCancel: 0
            

            })
            .then(result => {
                console.log("Deu certo, Glória ao Pai!")
                Loading.hide()
                this.$router.replace('/myEvents/')
            
                Notify.create({
                    type: 'positive',
                    progress: true,
                    message: 'Evento cadastrado e enviado para análise!',
                    icon: 'check_circle',
                    color: 'positive',
                    textColor: 'white',
                    position: 'top',
                    timeout: 4000,
                }) 
            })
            .catch(error => {
                Loading.hide()
                this.$router.replace('/myEvents/')
                console.log("Não Salvou os dados!")
                Notify.create({
                    type: 'negative',
                    progress: true,
                    message: 'Erro. Tente novamente mais tarde.',
                    icon: 'error',
                    color: 'negative',
                    textColor: 'white',
                    position: 'top',
                    timeout: 4000,
                }) 
                console.log(error)
                db.collection('events').doc(docID).delete()
                .then(result => {
                    console.log("Deletou!")
                })
                .catch(error => {
                    Loading.hide()
                    this.$router.replace('/myEvents/')
                    console.log("Não deletou!")
                    console.log(error)
                })
            })
        } else {
            const storageRef =  storage.ref().child('/' + 'Evento '+ uid() +'.jpeg').put(payload.image)

        storageRef.on(
            'state_changed',
            snapshot => console.log(snapshot),
            error => console.log(error),
            () => {
                storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
                    db.collection("events").doc(docID).update({
                        eventID: docID,
                        userID: user.uid,
                        likes: 0,
                        eventStatus: 1,
                        eventName: payload.eventName,
                        eventCategorie: payload.modelCategorie,
                        eventEntrace: payload.modelEntrance,
                        eventImg: downloadURL,
                        eventDateStart: payload.dateStart,
                        eventTime: payload.time,
                        eventDateEnd: payload.dateEnd,
                        eventAdressLocalName: payload.adressLocalName,
                        eventAdressStreet: payload.adressStreet,
                        eventAdressNumber: payload.adressNumber,
                        eventAdressBairro: payload.adressBairro,
                        eventAdressOnline: payload.adressOnline,
                        eventDescription: payload.description,
                        eventNameResponsible: payload.nameResponsible,
                        eventWhatsappResponsible: payload.whatsapp,
                        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                        eventCancel: 0
                    
        
                    })
                    .then(result => {
                        console.log("Deu certo, Glória ao Pai!")
                        Loading.hide()
                        this.$router.replace('/myEvents/')
                        Notify.create({
                            type: 'positive',
                            progress: true,
                            message: 'Evento cadastrado e enviado para análise!',
                            icon: 'check_circle',
                            color: 'positive',
                            textColor: 'white',
                            position: 'top',
                            timeout: 4000,
                        }) 
                    })
                    .catch(error => {
                        Loading.hide()
                        this.$router.replace('/myEvents/')
                        console.log("Não Salvou os dados!")
                        console.log(error)
                        db.collection('events').doc(docID).delete()
                        .then(result => {
                            console.log("Deletou!")
                        })
                        .catch(error => {
                            Loading.hide()
                            this.$router.replace('/myEvents/next')
                            console.log("Não deletou!")
                            console.log(error)
                        })
                    })
                })
            }
        )

        }
        
    })
    .catch(error => {
        Loading.hide()
        this.$router.replace('/myEvents/next')
        console.log(error)
    })
},

}

let eventToday = moment().format('YYYY/MM/DD')

const pendentEvents = (state) => {
  return Object.values(state.events || {}).filter(i => i.eventStatus === 0)
}

const approvedEvents = (state) => {
  return Object.values(state.events || {}).filter(i => i.eventStatus === 1)
}

const reprovedEvents = (state) => {
  return Object.values(state.events || {}).filter(i => i.eventStatus === 2)
}

const eventsUserPast = (state) => {
  return Object.values(state.events || {}).filter(i => i.userID == LocalStorage.getItem('loggedInUser')
                                                      &&  (moment(moment(i.eventDateStart, "DD/MM/YYYY").format('YYYY/MM/DD')).isBefore(eventToday))
                                                              && moment(moment(i.eventDateEnd, "DD/MM/YYYY").format('YYYY/MM/DD')).isBefore(eventToday));
console.log(eventsUserPast)
}

const getters = {

  events: (state) => {
    return state.events
  },

  pendentEvents: pendentEvents,
  approvedEvents: approvedEvents,
  reprovedEvents: reprovedEvents,
  eventsUserPast: eventsUserPast

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
