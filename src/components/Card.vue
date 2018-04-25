<template>
    <div class="card" style="width: 18rem;">
            <img class="card-img-top" :src="card_image" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">{{card_image_name}}</h5>
              <p class="card-text">Upload By: {{ card_user_name }}</p>
              <a class="btn btn-danger btn-sm" v-on:click="handleDelete">Delete</a>
              <a :href="card_image" class="btn btn-primary btn-sm">Download</a>
            </div>
          </div>
</template>

<script>
import firebase from "firebase";
import swal from "sweetalert2";
export default {
  name: "Card",
  props: ["card_image", "card_image_name", "card_user_name", "card_image_key"],
  beforeMount() {
    console.log("Usuario en File Upload:", this.card_image);
  },
  methods: {
    async handleDelete() {
      console.log(`Deleteing ${this.card_image_key}`);
      const result = await swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        buttonsStyling: true,
        reverseButtons: true
      });
      if (result.value) {
        const dbRef = firebase.database().ref("pictures");
        const storageRef = firebase
          .storage()
          .ref(`/fotos/${this.card_image_name}`);

        await dbRef.child(this.card_image_key).remove();
        await storageRef.delete();

        swal("Deleted!", "Your file has been deleted.", "success");
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    }
  }
};
</script>

<style scoped>
.card-img-top {
  width: 286px !important;
  height: 180px !important;
}
</style>
