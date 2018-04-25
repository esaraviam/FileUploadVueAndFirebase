/* eslint-disable */
<template>
<div class="container-fluid">
  <div class="row" v-if="usuario">
    <div class="col-sm-2">     
        <img class="usuario-img " :src="usuario.photoURL" />
        <h4>{{ usuario.displayName }}</h4>
        <h5>{{ usuario.email }}</h5>
        <button class="btn btn-sm btn-primary"  v-on:click="handleLogout">Logout</button>     
    </div>
    <div class="col-sm-10">
      <FileUpload :user="usuario"/>
      <div class="row">
        <div class="col" v-for="pic in pictures" :key="pic.key">                 
          <Card 
            :card_image_key="pic.key"
            :card_image="pic.image"   
            :card_image_name="pic.image_name"
            :card_user_name="pic.user_name"
            />
        </div>
      </div>
    </div>
  
  </div>
  
  <div v-else>
  <button class="btn btn-success btn-lg" v-on:click="handleAuth">Login con Google</button>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import firebase from "firebase";
import FileUpload from "./FileUpload.vue";
import Card from "./Card.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      usuario: null,
      pictures: []
    };
  },
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.usuario = user;
    });
    const dbRef = firebase.database().ref("pictures");
    dbRef.on("child_added", snapshot => {
      let value = snapshot.val();
      value.key = snapshot.key;
      this.pictures = this.pictures.concat(value);
    });
    dbRef.on("child_removed", snapshot => {
      this.pictures = this.pictures.filter(item => {
        return item.key !== snapshot.key;
      });
    });
  },
  methods: {
    handleAuth: async function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      this.usuario = result.user;
    },
    handleLogout: async function() {
      let logout = await firebase.auth().signOut();
    }
  },
  components: {
    FileUpload,
    Card
  }
};
</script>
<style scoped>
.usuario-img {
  border-radius: 50%;
  height: 150px;
  width: 150px;
}
</style>
