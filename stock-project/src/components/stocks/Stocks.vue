<template>
  <div>
    <div v-if="alerting" class="alert alert-danger alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
      </button>
      <strong>You Are Out Of Funds !</strong>
    </div>
    <h1>Stocks Component</h1>
    <div class="row animated slideInLeft slow">
      <app-stock v-for="(stock , i) in getStocks" :key="i" :stock="stock"></app-stock>
    </div>
  </div>
</template>

<script>
import Stock from "./Stock";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      stocks: []
    };
  },
  components: {
    "app-stock": Stock
  },
  computed: {
    ...mapGetters(["getStocks", "alerting"])
  }
};
</script>

<style scoped>
</style>