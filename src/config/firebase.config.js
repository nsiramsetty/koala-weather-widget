// Config file
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyCpiLQDE9B3p0CMfVJO9zBoOKYVj3s_hng",
    authDomain: "koala-4944d.firebaseapp.com",
    projectId: "koala-4944d",
    storageBucket: "koala-4944d.appspot.com",
    messagingSenderId: "174931317216",
    appId: "1:174931317216:web:64a0e98ca45b4ae8b65b85",
    measurementId: "G-E9ZYS1QL02"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
