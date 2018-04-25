// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */

import Vue from "vue";
import App from "./App";
import FileUpload from "./components/FileUpload";
import Card from "./components/Card";
import router from "./router";

import firebase from "firebase";
import firebase_config from "./firebase_config";

firebase.initializeApp(firebase_config);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App,
    FileUpload,
    Card
  },
  template: "<App/>"
});
