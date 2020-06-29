<template>
  <div class="container">
    <div id="nav">
      <app-header></app-header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  components: {
    "app-header": Header
  },
  created() {
    this.$store.dispatch("setStocks");
  }
};
</script>

<style scoped>
</style>

