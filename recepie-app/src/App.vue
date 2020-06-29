<template>
  <div>
    <app-navbar></app-navbar>
    <router-view></router-view>
  </div>
</template>


<script>
import Navbar from "./components/Navbar";

export default {
  data() {
    return {};
  },
  components: {
    "app-navbar": Navbar
  }
};
</script>

<style scoped>
</style>

<style>
</style>
