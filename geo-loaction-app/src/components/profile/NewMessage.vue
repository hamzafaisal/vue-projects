<template>
  <div class="new-message">
    <form @submit.prevent="newMessage()">
      <label for="message">Message (enter to add):</label>
      <input v-model="message" type="text" />
    </form>
  </div>
</template>

<script>
import db from "../../firebase/init";
export default {
  props: ["to", "from"],
  data() {
    return {
      message: null
    };
  },
  methods: {
    newMessage() {
      if (this.message) {
        db.collection("comments")
          .add({
            content: this.message,
            to: this.to,
            from: this.from,
            time: Date.now()
          })
          .then(result => {
            // console.log(result);
          });
        this.message = null;
      }
    }
  }
};
</script>

<style scoped>
</style>