<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup()">
      <h2 class="center deep-purple-text">Signup</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <div class="field">
        <p v-if="aliasError" class="red-text">Alias Already Taken!</p>
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias" @keyup="aliasCheck()" />
      </div>
      <div class="field center">
        <p v-if="emptyError" class="red-text">{{emptyError}}!</p>

        <button :disabled="aliasError" class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      alias: "",
      slug: "",
      aliasError: false,
      emptyError: ""
    };
  },
  methods: {
    aliasCheck() {
      this.slug = this.alias.replace(/ /g, "-").toLowerCase();

      const ref = db.collection("users").doc(this.slug);
      ref.get().then(result => {
        if (result.exists) {
          this.aliasError = true;
        } else {
          this.aliasError = false;
        }
      });
    },
    signup() {
      if (this.email && this.password && this.alias) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            const ref = db.collection("users").doc(this.slug);
            ref
              .set({
                alias: this.alias,
                geolocation: null,
                user_id: cred.user.uid
              })
              .then(result => {
                this.emptyError = false;
                this.$router.push("/login");
              });
          })
          .catch(err => {
            this.emptyError = err.message;
          });
      } else {
        this.emptyError = true;
      }
    }
  }
};
</script>

<style scoped>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup .field {
  margin-bottom: 16px;
}
</style>