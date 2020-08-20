import { LocalStorage, Loading, uid } from 'quasar'
import { firebaseAuth, db, storage } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import { showSucessMessage } from 'src/functions/function-show-sucess-message'
import { firestoreAction } from 'vuexfire'
import moment from "moment"

const state = {
    loggedIn: false,
    events: {
        // 'eventoid1':{
        //     eventID: 'event1',
        //     userID: 'usuarioid1',
        //     createdAt:'03/04/1998',
        //     dateAprov:'28/07/1997',
        //     dateAprovTimestamp: '21/01/2000',
        //     dateTimestamp: '03/04/1998',
        //     eventCategories: ['Academico', 'Empresarial', 'Social'],
        //     eventStartDate: '03/07/2019',
        //     eventEndDate: '03/07/2019',
        //     eventStart: '22:45',
        //     eventEntrance:'Gratuito',
        //     eventImageLink: 'https://getscopedm8katie.files.wordpress.com/2014/11/smiling-kitty.gif',
        //     eventLocal: 'No lugar lá',
        //     eventName: 'Evento Balada em casa',
        //     nomeRealizador: 'Pessoa Bacana',
        //     active: false,
        //     canceled: true,
        // },

        // 'eventoid2':{
        //     eventID: 'event2',
        //     userID: 'usuarioid1',
        //     createdAt:'03/04/1998',
        //     dateAprov:'28/07/1997',
        //     dateAprovTimestamp: '21/01/2000',
        //     dateTimestamp: '03/04/1998',
        //     eventCategories: ['Academico', 'Empresarial', 'Social'],
        //     eventStartDate: '03/07/2019',
        //     eventEndDate: '03/07/2019',
        //     eventStart: '22:45',
        //     eventEntrance:'Gratuito',
        //     eventImageLink: 'https://getscopedm8katie.files.wordpress.com/2014/11/smiling-kitty.gif',
        //     eventLocal: 'No lugar lá',
        //     eventName: 'alguma coisa coisa coisa',
        //     nomeRealizador: 'Pessoa Bacana',
        //     active: false,
        //     canceled: true,
        // }
    }

}

const mutations = {
    setLoggedIn(state, value) {
        state.loggedIn = value
    },

    

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
                LocalStorage.set('reload', false)
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
              LocalStorage.set('loggedInUser', firebaseAuth.currentUser.uid)
              this.$router.push('/').catch(err => {})
            } else {
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.replace('/auth').catch(err => {})
            }
        })
    },

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
                    eventName: payload.eventName,
                    eventCategorie: payload.modelCategorie,
                    eventEntrace: payload.modelEntrance,
                    eventImg: '',
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
                    eventWhatsappResponsible: payload.whatsapp
                
    
                })
                .then(result => {
                    console.log("Deu certo, Glória ao Pai!")
                    Loading.hide()
                    this.$router.replace('/myEvents/next')
                    var sucessMessage = 'Evento cadastrado com sucesso.'
                    showSucessMessage(sucessMessage)
                })
                .catch(error => {
                    Loading.hide()
                    this.$router.replace('/myEvents/next')
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
            } else {
                const storageRef =  storage.ref().child('/images/'+uid()+'.jpeg').putString(payload.image, 'data_url')

            storageRef.on(
                'state_changed',
                snapshot => console.log(snapshot),
                error => console.log(error),
                () => {
                    storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
                        db.collection("events").doc(docID).update({
                            eventID: docID,
                            userID: user.uid,
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
                            eventWhatsappResponsible: payload.whatsapp
                        
            
                        })
                        .then(result => {
                            console.log("Deu certo, Glória ao Pai!")
                            Loading.hide()
                            this.$router.replace('/myEvents/next')
                        })
                        .catch(error => {
                            Loading.hide()
                            this.$router.replace('/myEvents/next')
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

    bindEvents: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('events', db.collection('events'))
    }),


    

    

}

//----------------------Dates--------------------------

let today = moment().format('DD/MM/YYYY');
console.log(today);

let month = moment().format('MM/YYYY');
console.log(month);


//---------------------My Events------------------------

let eventUser = firebaseAuth.currentUser; 
console.log(LocalStorage.getItem('loggedInUser'))

let eventToday = moment().format('YYYY/MM/DD')
//----------------------Getters------------------------

const eventsToday = (state) => {
    return Object.values(state.events || {}).filter(i => i.eventDateStart == today);
    console.log(today);
}

const eventsMonth = (state) => {
    return Object.values(state.events || {}).filter(i => i.eventDateStart.substring(3) == month);
    console.log(month);
}


const eventsUserNext = (state) => {
    return Object.values(state.events || {}).filter(i => i.userID == LocalStorage.getItem('loggedInUser')
                                                        &&  (moment(moment(i.eventDateStart, "DD/MM/YYYY").format('YYYY/MM/DD')).isSameOrAfter(eventToday)
                                                                || moment(moment(i.eventDateEnd, "DD/MM/YYYY").format('YYYY/MM/DD')).isSameOrAfter(eventToday)));
}

const eventsUserPast = (state) => {
    return Object.values(state.events || {}).filter(i => i.userID == LocalStorage.getItem('loggedInUser')
                                                        &&  (moment(moment(i.eventDateStart, "DD/MM/YYYY").format('YYYY/MM/DD')).isBefore(eventToday))
                                                                && moment(moment(i.eventDateEnd, "DD/MM/YYYY").format('YYYY/MM/DD')).isBefore(eventToday));
}

const eventsCategorie = (state) => (categorie) => {
    return Object.values(state.events || {}).filter(i => i.eventCategorie == categorie)
}

const getters = {
    events: (state) => {
        return state.events
    },

    eventsToday : eventsToday,
    eventsMonth : eventsMonth,
    eventsUserNext : eventsUserNext,
    eventsUserPast : eventsUserPast,
    eventsCategorie : eventsCategorie

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}