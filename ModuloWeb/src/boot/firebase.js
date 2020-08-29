// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase/app'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAY156KuzSTW7bb-3XXp6qlHO5uWm1OT4k',
  authDomain: 'guanambieventos-estagio.firebaseapp.com',
  databaseURL: 'https://guanambieventos-estagio.firebaseio.com',
  projectId: 'guanambieventos-estagio',
  storageBucket: 'guanambieventos-estagio.appspot.com',
  messagingSenderId: '481298033809',
  appId: '1:481298033809:web:c6349f6221f06c6479a330',
  measurementId: 'G-BT9KSMR2BK'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const db = firebaseApp.firestore()
const storage = firebaseApp.storage()

export { firebaseAuth, db, storage }
