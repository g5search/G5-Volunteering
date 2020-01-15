import firebase from 'firebase'
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyCA98aJtdW_R4j4wmyf2spxw1XlHiSwMvk",
    authDomain: "vhours-3c992.firebaseapp.com",
    databaseURL: "https://vhours-3c992.firebaseio.com",
    projectId: "vhours-3c992",
    storageBucket: "vhours-3c992.appspot.com",
    messagingSenderId: "937326836465",
    appId: "1:937326836465:web:bfa387a0cb16c956578750"
}

firebase.initializeApp(config)

const fireDb = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

export {
    fireDb,
    auth,
    currentUser,
}