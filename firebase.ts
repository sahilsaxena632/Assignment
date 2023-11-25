
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdcL42fX5_ZtWXiS8A5T5FtkDBb5eaM6g",
  authDomain: "assignment-2cab8.firebaseapp.com",
  projectId: "assignment-2cab8",
  storageBucket: "assignment-2cab8.appspot.com",
  messagingSenderId: "816848939863",
  appId: "1:816848939863:web:832416d07577596aee2c12",
  measurementId: "G-SFZW9FFND2"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);


