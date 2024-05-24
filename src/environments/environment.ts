/* // This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: true, // Cambia a true en production
  firebaseConfig: {
    apiKey: "AIzaSyCk9jF5lDfaFXtD6l_b4TjXDB1ZDvqB_gQ",
  authDomain: "laundry-app-21bf5.firebaseapp.com",
  projectId: "laundry-app-21bf5",
  storageBucket: "laundry-app-21bf5.appspot.com",
  messagingSenderId: "59208196010",
  appId: "1:59208196010:web:18e800ab242cf0f66455d3",
  measurementId: "G-CP68BSTLE2"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

/* // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCk9jF5lDfaFXtD6l_b4TjXDB1ZDvqB_gQ",
  authDomain: "laundry-app-21bf5.firebaseapp.com",
  projectId: "laundry-app-21bf5",
  storageBucket: "laundry-app-21bf5.appspot.com",
  messagingSenderId: "59208196010",
  appId: "1:59208196010:web:18e800ab242cf0f66455d3",
  measurementId: "G-CP68BSTLE2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: true,
   firebaseConfig :{
  apiKey: "AIzaSyCk9jF5lDfaFXtD6l_b4TjXDB1ZDvqB_gQ",
  authDomain: "laundry-app-21bf5.firebaseapp.com",
  projectId: "laundry-app-21bf5",
  storageBucket: "laundry-app-21bf5.appspot.com",
  messagingSenderId: "59208196010",
  appId: "1:59208196010:web:18e800ab242cf0f66455d3",
  measurementId: "G-CP68BSTLE2",
}
}

// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);