import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App).use(store).use(router).mount("#app");

// Firebase
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.VUE_FIREBASE_apiKey,
    authDomain: "apps-and-games-666d6.firebaseapp.com",
    projectId: "apps-and-games-666d6",
    storageBucket: "apps-and-games-666d6.appspot.com",
    messagingSenderId: process.env.VUE_FIREBASE_messagingSenderId,
    appId: process.env.VUE_FIREBASE_appId,
};

initializeApp(firebaseConfig);
