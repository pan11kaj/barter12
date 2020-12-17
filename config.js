import firebase from 'firebase'
require('@firebase/firestore');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCrUaELJOsk8Pqq94q4kq1l01mmAxjbwgk",
    authDomain: "barter-4b626.firebaseapp.com",
    databaseURL: "https://barter-4b626.firebaseio.com",
    projectId: "barter-4b626",
    storageBucket: "barter-4b626.appspot.com",
    messagingSenderId: "771141516753",
    appId: "1:771141516753:web:1803f6b0761a4da2b5b4f0",
    measurementId: "G-4XSFXEYWCN"
  };
 firebase.initializeApp(firebaseConfig);
 export default firebase.firestore()
