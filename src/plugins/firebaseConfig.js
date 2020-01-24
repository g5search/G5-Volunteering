import firebase from 'firebase'
import 'firebase/firestore'
require('dotenv').config()



const config = {
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_DATABASE_URL,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_ID,
    appId: process.env.VUE_APP_APP_ID
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