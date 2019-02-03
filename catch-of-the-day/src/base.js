import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB8Ei87EFxkl3o5Yat8AcNLYSs8pBdS9dw",
  authDomain: "catch-of-the-day-21325.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-21325.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
