import * as firebase from 'firebase/app';
import 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDEk8y_H_ykumrJ6kiB5bA-xkfQxeV7hQE",
  authDomain: "live-chat-5f865.firebaseapp.com",
  databaseURL: "https://live-chat-5f865.firebaseio.com",
  projectId: "live-chat-5f865",
  storageBucket: "live-chat-5f865.appspot.com",
  messagingSenderId: "760521782186",
  appId: "1:760521782186:web:a328c84800bdfc91"
};
// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);


export default app.firestore()
