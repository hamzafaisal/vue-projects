<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link to="/" class="brand-logo left">Geo Location!</router-link>
        <ul class="right">
          <li>
            <router-link to="/signup" v-if="!user">Signup</router-link>
          </li>
          <li>
            <router-link to="/login" v-if="!user">Login</router-link>
          </li>
          <li v-if="user">
            <a>{{user.email}}</a>
          </li>
          <li v-if="user">
            <a @click="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      user: ""
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(result => {
          this.$router.push("/signup");
        });
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = "";
      }
    });
  }
};
</script>

<style scoped>
</style>