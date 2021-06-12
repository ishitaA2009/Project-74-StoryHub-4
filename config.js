import firebase from 'firebase';
require('@firebase/firestore');

  var firebaseConfig = {
    apiKey: "AIzaSyB0Jqd6MNOK7qdi5IkurUSBmvYyYcR0SnU",
    authDomain: "newsletter-4088f.firebaseapp.com",
    projectId: "newsletter-4088f",
    storageBucket: "newsletter-4088f.appspot.com",
    messagingSenderId: "300513510568",
    appId: "1:300513510568:web:d849c51fca6b60fcd42e9d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();