import { LocalStorage, Loading, uid, Dialog, Notify } from 'quasar'
import { firebaseAuth, db, storage } from 'boot/firebase'
import * as firebase from 'firebase/app'
import { showErrorMessage } from 'src/functions/function-show-error-message'
import { showSucessMessage } from 'src/functions/function-show-sucess-message'
import { firestoreAction } from 'vuexfire'
import moment from "moment"
import 'moment/locale/pt-br'

const state = {
    loggedIn: false,
    userData: {},
    eventFilter: null,
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

    updateFilter(state, value){
        console.log(value)
        state.eventFilter = value
    }

    

}

const objToArray = obj => Object.values(obj);

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
                userUrlImage: 'https://image.flaticon.com/icons/svg/747/747376.svg',
                favorites: [],
                eventsHistory: []
            })
            LocalStorage.set('reload', false)
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
                LocalStorage.set('reload', false)
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

    googleLoginUser() {
        var base_provider = new firebase.auth.GoogleAuthProvider()
        var newUser = false
        firebase.auth().signInWithPopup(base_provider).then(function(result){
            db.collection('users').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(result.user.email == doc.data().userEmail){
                        console.log('email ja existe')
                        LocalStorage.set('reload', false)
                        newUser = true
                    }
                })
                if(newUser == false){
                    console.log('email não existe doc')
                    db.collection('users').add({
                        userID: result.user.uid,
                        userName: result.user.displayName,
                        userEmail: result.user.email,
                        userNivel: 'usuario',
                        userUrlImage: 'https://image.flaticon.com/icons/svg/747/747376.svg',
                        favorites: [],
                        eventsHistory: []
                    }).then(response => {
                        console.log('doc cadastrado')
    
                    })
                    .catch(error => {
                        console.log(error)
                        console.log('doc não cadastrado')
                    })

                }

            })      
            console.log(result)
            console.log("Sucesso login Google")
            LocalStorage.set('reload', false)

        }).catch(function(err){
            console.log(err)
            console.log("Falhou login Google")
        })

    },

    facebookLoginUser() {
        var base_provider = new firebase.auth.FacebookAuthProvider()
        var newUser = false
        firebase.auth().signInWithPopup(base_provider).then(function(result){
            db.collection('users').get().then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(result.user.email == doc.data().userEmail){
                        console.log('email ja existe')
                        LocalStorage.set('reload', false)
                        newUser = true
                    }
                })
                if(newUser == false){
                    console.log('email não existe doc')
                    db.collection('users').add({
                        userID: result.user.uid,
                        userName: result.user.displayName,
                        userEmail: result.user.email,
                        userNivel: 'usuario',
                        userUrlImage: 'https://image.flaticon.com/icons/svg/747/747376.svg',
                        favorites: [],
                        eventsHistory: []
                    }).then(response => {
                        console.log('doc cadastrado')
    
                    })
                    .catch(error => {
                        console.log(error)
                        console.log('doc não cadastrado')
                    })

                }

            })      
            console.log(result)
            console.log("Sucesso login Google")
            LocalStorage.set('reload', false)

        }).catch(function(err){
            console.log(err)
            console.log("Falhou login Google")
        })

    },

    handleAuthStateChange({ commit }) {
        firebaseAuth.onAuthStateChanged(user => {
            Loading.hide()
            if (user) {
              commit('setLoggedIn', true)
              LocalStorage.set('loggedIn', true)
              LocalStorage.set('att', true)

              LocalStorage.set('loggedInUser', firebaseAuth.currentUser.uid)
              this.$router.push('/loading').catch(err => {})
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
                    likes: 0,
                    eventStatus: 0,
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
                    this.$router.replace('/myEvents/next')
                
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
                    this.$router.replace('/myEvents/next')
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
                        this.$router.replace('/myEvents/next')
                        console.log("Não deletou!")
                        console.log(error)
                    })
                })
            } else {
                const storageRef =  storage.ref().child('/' + 'Evento'+ uid() +'.jpeg').putString(payload.image, 'data_url')

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
                            eventStatus: 0,
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
                            eventAdressOption: payload.adressOption,
                            eventDescription: payload.description,
                            eventNameResponsible: payload.nameResponsible,
                            eventWhatsappResponsible: payload.whatsapp,
                            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                            eventCancel: 0
                        
            
                        })
                        .then(result => {
                            console.log("Deu certo, Glória ao Pai!")
                            Loading.hide()
                            this.$router.replace('/myEvents/next')
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

    addFavorite({}, eventID){
        console.log(eventID)
        let favorites = objToArray(state.userData.favorites)
        const increment = firebase.firestore.FieldValue.increment(1);

        const decrement = firebase.firestore.FieldValue.increment(-1);

        if(!favorites.includes(eventID)){
            console.log('N Tem')
            db.collection('users').where("userID", "==", LocalStorage.getItem('loggedInUser')).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    db.collection('users').doc(doc.id).update({
                        favorites: firebase.firestore.FieldValue.arrayUnion(eventID)
                    })
                    .then(response => {
                        db.collection('events').where("eventID", "==", eventID).get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                db.collection('events').doc(doc.id).update({
                                    likes: increment
                                })
                                .then(response => {
                                    console.log(objToArray(state.userData.favorites))
                                    return response
                                })
                                .catch(error => {
                                    console.log(error)
                                    return error
                                })
                            })
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        return error
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
        }
        else{
            console.log('Tem')
            db.collection('users').where("userID", "==", LocalStorage.getItem('loggedInUser')).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc.data())
                    db.collection('users').doc(doc.id).update({
                        favorites: firebase.firestore.FieldValue.arrayRemove(eventID)
                    })
                    .then(response => {
                        db.collection('events').where("eventID", "==", eventID).get()
                        .then(querySnapshot => {
                            querySnapshot.forEach(doc => {
                                console.log(doc.data())
                                db.collection('events').doc(doc.id).update({
                                    likes: decrement
                                })
                                .then(response => {
                                    console.log(objToArray(state.userData.favorites))
                                    return response
                                })
                                .catch(error => {
                                    console.log(error)
                                    return error
                                })
                            })
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        return error
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
        }

    },

    eventsHistory({}, eventID) {
        let eventsArr = []
        let docID
        db.collection('users').where("userID", "==", LocalStorage.getItem('loggedInUser')).get()
        .then(querySnapshot => {
            console.log(querySnapshot.size)
            querySnapshot.forEach(doc => {
                docID = doc.id
                eventsArr = doc.data().eventsHistory
                if(!eventsArr.includes(eventID)){
                    if(eventsArr.length >= 5)
                    eventsArr.pop()
                    eventsArr.unshift(eventID)
                }
                else{
                    let position = eventsArr.indexOf(eventID)
                    eventsArr.splice(position, 1)
                    eventsArr.unshift(eventID)
                }
            })
            db.collection('users').doc(docID).update({
                eventsHistory: eventsArr
            })
            .then(result => {
                console.log('Historico de eventos atualizado')
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error)
        })
    },

    eventFilter({commit, state}, filter) {
        console.log(filter)
        commit('updateFilter', filter)
    },

    bindEvents: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        return bindFirestoreRef('events', db.collection('events'))
    }),

    bindUserData: firestoreAction(({ bindFirestoreRef }) => {
        // return the promise returned by `bindFirestoreRef`
        var docID
        db.collection('users').where("userID", "==", LocalStorage.getItem('loggedInUser')).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                docID = doc.id
                return bindFirestoreRef('userData', db.collection('users').doc(docID))
            })
        })
    }),


    resetPassword({state}) {
        var auth = firebaseAuth;
        var emailAddress = state.userData.userEmail;
        
        auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log('email enviado')
            Dialog.create({
                
                  title: '<div class="q-pa-sm text-center text-deep-orange-9 app-font-bold">Verifique seu email</div>',
                  message: '<div class="q-pa-md app-font-light text-grey-10"> Um link para alteração da senha foi enviado para seu email! </div>',
                  html: true 
                
            })
            
        }).catch(function(error) {
            console.log('email não enviado')
        });
    },

    resetPasswordInit({state}, payload) {
        var auth = firebaseAuth;
        var emailAddress = payload.emailresetPwd;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            console.log('email enviado')
            Dialog.create({
                
                  title: '<div class="q-pa-sm text-center text-deep-orange-9 app-font-bold">Verifique seu email</div>',
                  message: '<div class="q-pa-sm text-subtitle1 text-justify app-font-light text-grey-10"> Um link para alteração da senha foi enviado para seu email! </div>',
                  html: true 
                
            })
            
        }).catch(function(error) {
            console.log('email não enviado')
        });

    },

    updateUser({state}, payload) {
        var userID = firebaseAuth.currentUser.uid;
        console.log(userID)

        const credential = firebase.auth.EmailAuthProvider.credential(
            state.userData.userEmail, 
            payload.validPassword
        );

        firebaseAuth.currentUser.reauthenticateWithCredential(credential).then(function() {
            db.collection('users').where('userID', '==', userID).get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    console.log(doc.data())
                    firebaseAuth.currentUser.updateEmail(payload.textEmail).then(function() {
                        console.log('atualizado email')
                        if(payload.userImage == null){
                            db.collection('users').doc(doc.id).update({
                                userName: payload.textName,
                                userEmail: payload.textEmail
                            }).then(result => {
                                console.log('atualizou doc')
                            }).catch(error => {
                                console.log('não atualizou doc')
                            })
                        } else {
                            const storageRef =  storage.ref().child('/images/users/'+uid()+'.jpeg').putString(payload.userImage, 'data_url')

                            storageRef.on(
                                'state_changed',
                                snapshot => console.log(snapshot),
                                error => console.log(error),
                                () => {
                                    storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
                                        db.collection('users').doc(doc.id).update({
                                            userName: payload.textName,
                                            userEmail: payload.textEmail,
                                            userUrlImage: downloadURL
                                        }).then(result => {
                                            console.log('atualizou doc')
                                        }).catch(error => {
                                            console.log('não atualizou doc')
                                        })
                                    }
                                )}
                            )               
                        }        
                    }).catch(function(error) {
                        console.log('não atualizado email')
                    });
                })
            }).catch(error => {

            })
        }).catch(function(error) {
            console.log('vc ñ é vc')
        });

        
    },

    cancelEvents({state}, id){
        db.collection('events').where('eventID', '==', id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data())
                db.collection('events').doc(doc.id).update({
                    eventCancel: 1,
                }).then(result => {
                    console.log('cancelou')
                    Notify.create({
                        type: 'positive',
                        progress: true,
                        message: 'Evento cancelado!',
                        icon: 'check_circle',
                        color: 'positive',
                        textColor: 'white',
                        position: 'top',
                        timeout: 4000,
                    }) 
                }).catch(error => {
                    console.log('não cancelou')
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
                })
            })
        })
    },

    updateEvent({state}, payload){
        Loading.show({
            message: 'Alterando evento'
        })
        var id = payload.id
        console.log(payload)
        db.collection('events').where('eventID', '==', id).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(doc.data())
                if(payload.eventImage == null){
                    if ((payload.adressOption == 'Online' && payload.adressLocalName == '') ||
                    (payload.adressOption == 'Físico' && payload.adressOnline != '')){
                    db.collection('events').doc(doc.id).update({
                        eventName: payload.eventName,
                        eventCategorie: payload.modelCategorie,
                        eventEntrace: payload.modelEntrance,
                        eventDateStart: payload.dateStart,
                        eventTime: payload.time,
                        eventDateEnd: payload.dateEnd,
                        eventAdressOption: payload.adressOption,
                        eventAdressLocalName: '',
                        eventAdressStreet: '',
                        eventAdressNumber: '',
                        eventAdressBairro: '',
                        eventAdressOnline: payload.adressOnline,
                        eventDescription: payload.description,
                        eventNameResponsible: payload.nameResponsible,
                        eventWhatsappResponsible: payload.whatsapp
                    }).then(result => {
                        console.log('alterou')
                        Loading.hide()
                        this.$router.replace('/myEvents/next')
                        Notify.create({
                            type: 'positive',
                            progress: true,
                            message: 'Evento alterado!',
                            icon: 'check_circle',
                            color: 'positive',
                            textColor: 'white',
                            position: 'top',
                            timeout: 4000,
                        }) 
                    }).catch(error => {
                        Loading.hide()
                        console.log('não alterou')
                        this.$router.replace('/myEvents/next')
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
                    })
                    }if ((payload.adressOption == 'Físico' && payload.adressOnline == '') ||
                        (payload.adressOption == 'Online' && payload.adressLocalName != '')) {
                        db.collection('events').doc(doc.id).update({
                            eventName: payload.eventName,
                            eventCategorie: payload.modelCategorie,
                            eventEntrace: payload.modelEntrance,
                            eventDateStart: payload.dateStart,
                            eventTime: payload.time,
                            eventDateEnd: payload.dateEnd,
                            eventAdressOption: payload.adressOption,
                            eventAdressLocalName: payload.adressLocalName,
                            eventAdressStreet: payload.adressStreet,
                            eventAdressNumber: payload.adressNumber,
                            eventAdressBairro: payload.adressBairro,
                            eventAdressOnline: '',
                            eventDescription: payload.description,
                            eventNameResponsible: payload.nameResponsible,
                            eventWhatsappResponsible: payload.whatsapp
                        }).then(result => {
                            console.log('alterou')
                            Loading.hide()
                            this.$router.replace('/myEvents/next')
                            Notify.create({
                                type: 'positive',
                                progress: true,
                                message: 'Evento alterado!',
                                icon: 'check_circle',
                                color: 'positive',
                                textColor: 'white',
                                position: 'top',
                                timeout: 4000,
                            }) 
                        }).catch(error => {
                            Loading.hide()
                            console.log('não alterou')
                            this.$router.replace('/myEvents/next')
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
                        })
                
                    }
                } else {
                    const storageRef =  storage.ref().child('/images/events/'+uid()+'.jpeg').putString(payload.eventImage, 'data_url')

                    storageRef.on(
                        'state_changed',
                        snapshot => console.log(snapshot),
                        error => console.log(error),
                        () => {
                            storageRef.snapshot.ref.getDownloadURL().then(downloadURL => {
                                if ((payload.adressOption == 'Online' && payload.adressLocalName == '') ||
                                    (payload.adressOption == 'Físico' && payload.adressOnline != '')){
                                    db.collection('events').doc(doc.id).update({
                                        eventName: payload.eventName,
                                        eventCategorie: payload.modelCategorie,
                                        eventEntrace: payload.modelEntrance,
                                        eventImg: downloadURL,
                                        eventDateStart: payload.dateStart,
                                        eventTime: payload.time,
                                        eventDateEnd: payload.dateEnd,
                                        eventAdressOption: payload.adressOption,
                                        eventAdressLocalName: '',
                                        eventAdressStreet: '',
                                        eventAdressNumber: '',
                                        eventAdressBairro: '',
                                        eventAdressOnline: payload.adressOnline,
                                        eventDescription: payload.description,
                                        eventNameResponsible: payload.nameResponsible,
                                        eventWhatsappResponsible: payload.whatsapp
                                    }).then(result => {
                                        console.log('alterou')
                                        Loading.hide()
                                        this.$router.replace('/myEvents/next')
                                        Notify.create({
                                            type: 'positive',
                                            progress: true,
                                            message: 'Evento alterado!',
                                            icon: 'check_circle',
                                            color: 'positive',
                                            textColor: 'white',
                                            position: 'top',
                                            timeout: 4000,
                                        }) 
                                    }).catch(error => {
                                        console.log('não alterou')
                                        Loading.hide()
                                        this.$router.replace('/myEvents/next')
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
                                    })
                                }if ((payload.adressOption == 'Físico' && payload.adressOnline == '') ||
                                    (payload.adressOption == 'Online' && payload.adressLocalName != '')) {
                                    db.collection('events').doc(doc.id).update({
                                        eventName: payload.eventName,
                                        eventCategorie: payload.modelCategorie,
                                        eventEntrace: payload.modelEntrance,
                                        eventImg: downloadURL,
                                        eventDateStart: payload.dateStart,
                                        eventTime: payload.time,
                                        eventDateEnd: payload.dateEnd,
                                        eventAdressOption: payload.adressOption,
                                        eventAdressLocalName: payload.adressLocalName,
                                        eventAdressStreet: payload.adressStreet,
                                        eventAdressNumber: payload.adressNumber,
                                        eventAdressBairro: payload.adressBairro,
                                        eventAdressOnline: '',
                                        eventDescription: payload.description,
                                        eventNameResponsible: payload.nameResponsible,
                                        eventWhatsappResponsible: payload.whatsapp
                                    }).then(result => {
                                        console.log('alterou')
                                        Loading.hide()
                                        this.$router.replace('/myEvents/next')
                                        Notify.create({
                                            type: 'positive',
                                            progress: true,
                                            message: 'Evento alterado!',
                                            icon: 'check_circle',
                                            color: 'positive',
                                            textColor: 'white',
                                            position: 'top',
                                            timeout: 4000,
                                        }) 
                                    }).catch(error => {
                                        console.log('não alterou')
                                        Loading.hide()
                                        this.$router.replace('/myEvents/next')
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
                                    })
                                
                                }
                            }
                        )}
                    )               
                }     
                
                
            })
        })

    }

    

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
    return Object.values(state.events || {}).filter(i => i.eventDateStart == today && i.eventStatus == 1);
    console.log(eventsToday);
}

const eventsMonth = (state) => {
    return Object.values(state.events || {}).filter(i => i.eventDateStart.substring(3) == month && i.eventStatus == 1);
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

const eventsDestaques = (state) => {
    return Object.values(state.events || {}).filter(i => (moment(moment(i.eventDateStart, "DD/MM/YYYY").format('YYYY/MM/DD')).isSameOrAfter(eventToday)
                                                            || moment(moment(i.eventDateEnd, "DD/MM/YYYY").format('YYYY/MM/DD')).isSameOrAfter(eventToday))
                                                            && i.eventStatus == 1);

}

const eventsAllCategorie = (state) => (categorie) => {
    return Object.values(state.events || {}).filter(i => i.eventCategorie == categorie && i.eventStatus == 1)
}

const eventsTodayCategorie = (state) => (categorie) => {
    return Object.values(state.events || {}).filter(i => i.eventCategorie == categorie && i.eventDateStart == today && i.eventStatus == 1)
}

const eventsMonthCategorie = (state) => (categorie) => {
    return Object.values(state.events || {}).filter(i => i.eventCategorie == categorie && i.eventDateStart.substring(3) == month && i.eventStatus == 1)
}

const eventFinder = (state) => (eventID) => {
    console.log(eventID)
    return Object.values(state.events || {}).find(i => i.eventID == eventID)
}

const getters = {
    events: (state) => {
        return Object.values(state.events || {}).filter(i => i.eventStatus != 0 && i.eventStatus != 2)
    },

    userData: (state) => {
        return state.userData
    },

    eventFilter: (state) => {
        return state.eventFilter
    },

    eventFinder : eventFinder,
    eventsToday : eventsToday,
    eventsMonth : eventsMonth,
    eventsUserNext : eventsUserNext,
    eventsUserPast : eventsUserPast,
    eventsAllCategorie : eventsAllCategorie,
    eventsTodayCategorie : eventsTodayCategorie,
    eventsMonthCategorie : eventsMonthCategorie,
    eventsDestaques : eventsDestaques

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}