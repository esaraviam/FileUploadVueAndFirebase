<template>
    <div>
        <div class="progress" v-if="show">
            <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" :style="uploadPerc"  role="progressbar" aria-valuenow="uploadValue" aria-valuemin="0" aria-valuemax="100">
            {{ uploadValue }}%
            </div>
        </div>
        <br/>
        <div class="input-group">
            <div class="custom-file">
                <input id="myfile" class="custom-file-input" type="file" v-on:change="handleUpload($event)"/>
                <label class="custom-file-label" for="myfile">Seleccione Archivo</label>
            </div>
        </div>
        <hr/>
        
    </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "FileUpload",
  props: ["user"],
  data() {
    return {
      uploadValue: 0,
      uploadPerc: "width: 0%",
      picture: null,
      fileName: "",
      show: false
    };
  },
  beforeMount() {
    console.log("Usuario en File Upload:", this.user);
  },
  methods: {
    handleUpload: function(event) {
      const file = event.target.files[0];
      this.show = true;
      const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
      const task = storageRef.put(file);
      task.on(
        "state_changed",
        snapshot => {
          let percentage =
            snapshot.bytesTransferred / snapshot.totalBytes * 100;
          this.uploadValue = Math.floor(percentage);
          this.uploadPerc = `width: ${percentage}%`;
        },
        error => {
          console.log("error ", error);
        },
        () => {
          this.uploadValue = 100;
          this.picture = task.snapshot.downloadURL;
          this.fileName = task.snapshot.metadata.name;
          this.show = false;

          const dbRef = firebase.database().ref("pictures");
          const newPicture = dbRef.push();
          newPicture.set({
            user_name: this.user.displayName,
            user_photo: this.user.photoURL,
            user_email: this.user.email,
            image: task.snapshot.downloadURL,
            image_name: task.snapshot.metadata.name
          });
        }
      );
    }
  }
};
</script>
<style>
</style>