import { firebaseAuth, db } from 'boot/firebase'

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
            console.log('error.message: ', error.message)
        })
    },

    loginUser ({}, payload) {
        firebaseAuth.signInWithEmailAndPassword(
            payload.email, payload.password)
            .then(response => {
                console.log('response: ', response)
            })
            
            .catch(error => {
                console.log('error.message: ', error.message)
            })

    },

    loggoutUser() {
        console.log('loggoutUser')
        firebaseAuth.signOut()
    },

    handleAuthStateChange({ commit }) {
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
              commit('setLoggedIn', true)
              this.$router.push('/index')
            } else {
                commit('setLoggedIn', false)
                this.$router.replace('/')
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