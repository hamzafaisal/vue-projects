<template>
  <div>
    <div v-if="alerting2" class="alert alert-danger alert-dismissible fade show" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
      </button>
      <strong>You Can't Sell More Stocks Than You Have !</strong>
    </div>
    <h1>Portfolio Component</h1>

    <div class="row animated slideInRight slow">
      <app-stock-portfolio
        v-for="(portfolio , i) in stockPortfolio"
        :key="i"
        :portfolio="portfolio"
      ></app-stock-portfolio>
    </div>
  </div>
</template>

<script>
import PortfolioStock from "./PortfolioStock";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      stocks: []
    };
  },
  components: {
    "app-stock-portfolio": PortfolioStock
  },

  computed: {
    ...mapGetters(["stockPortfolio", "funds", "alerting2"])
  }
};
</script>

<style scoped>
</style>