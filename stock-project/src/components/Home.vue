<template>
  <div class="animated slideInUp slow">
    <div class="jumbotron">
      <h1 class="display-4">Trade or View Your portfolio!</h1>
      <p class="lead">You may save and load your data.</p>
      <hr class="my-4" />
      <p class="display-4">funds : {{ funds }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["funds"])
  }
};
</script>

<style scoped>
.jumbotron {
  text-transform: capitalize;
}
</style>