import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy7Z_XxhsGANPfXZ3-8LKwHYQNcCk1CtU",
  authDomain: "chess-game-c5eef.firebaseapp.com",
  projectId: "chess-game-c5eef",
  storageBucket: "chess-game-c5eef.appspot.com",
  messagingSenderId: "687661322832",
  appId: "1:687661322832:web:40109569cb27ddc9ac7755",
  measurementId: "G-0DCMS0TQ15",
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()
export const auth = firebase.auth();
export default firebase
