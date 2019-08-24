import * as firebase from 'firebase';
  const firebaseConfig = {
    apiKey: "AIzaSyAqisnlulyOtecA8jH0Al3U0p6tDYnuJ9I",
    authDomain: "recipe-97b7e.firebaseapp.com",
    databaseURL: "https://recipe-97b7e.firebaseio.com",
    projectId: "recipe-97b7e",
    storageBucket: "gs://recipe-97b7e.appspot.com",
    messagingSenderId: "613863165322",
    appId: "1:613863165322:web:e0e3290d4aaee02c"
  };

  export const db = firebase.initializeApp(firebaseConfig);
