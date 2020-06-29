<template>
  <div class="chat container">
    <h1 class="center teal-text">Chat</h1>
    <div class="card">
      <h5 class="center teal-text name" v-if="userProfile">{{userProfile}} Profile</h5>
      <div class="card-content">
        <ul class="messages">
          <li v-for="message in messages" :key="message.id">
            <span class="teal-text">{{message.from}}</span>
            <span class="grey-text text-darken-3">{{message.content}}</span>
            <span class="grey-text time">{{message.time}}</span>
          </li>
        </ul>
      </div>
      <div class="card-action">
        <app-message :to="userProfile" :from="userCommenting"></app-message>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import firebase from "firebase";
import NewMessage from "./NewMessage";

export default {
  data() {
    return {
      userProfile: null,
      userCommenting: null,
      messages: []
    };
  },
  components: {
    "app-message": NewMessage
  },
  created() {
    // FETCHING COMMENTING USER DATA
    let ref = db.collection("users").doc(this.$route.params.name);
    ref.get().then(doc => {
      this.userProfile = doc.data().alias;

      console.log("to: " + doc.data().alias);
    });

    // FETCHING PROFILE USER DATA
    let user = firebase.auth().currentUser;
    db.collection("users")
      .where("user_id", "==", user.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.userCommenting = doc.data().alias;

          // FETCHING COMMENTS REALTIME OF PROFILE
          let commentRef = db
            .collection("comments")
            .where("to", "==", this.userProfile)
            // .where("from", "==", this.userCommenting)
            .orderBy("time", "asc");

          commentRef.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if (change.type == "added") {
                this.messages.push(change.doc.data());
              }
            });
          });

          console.log("from: " + doc.data().alias);
        });
      });
  }
};
</script>

<style scoped>
.name {
  margin: 10px auto;
  text-transform: capitalize;
}

.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.chat span {
  font-size: 1.4em;
  margin-right: 7px;
}
.chat .time {
  display: block;
  font-size: 1.2em;
}
.messages {
  max-height: 400px;
  overflow-y: scroll;
}
.messages::-webkit-scrollbar {
  width: 4px;
}
.messages::-webkit-scrollbar-track {
  background: #eee;
}
.messages::-webkit-scrollbar-thumb {
  background: rgb(134, 129, 129);
}
</style>