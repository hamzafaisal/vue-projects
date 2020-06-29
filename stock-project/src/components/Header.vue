<template>
  <div id="nav">
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark my-5 rounded">
      <router-link class="navbar-brand p-1" to="/">Stock Trader</router-link>
      <button
        class="navbar-toggler d-lg-none"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/stocks">Stocks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item" @click="randStocks()">
            <span class="nav-link">End Day</span>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Save & Load</a>
            <div class="dropdown-menu" aria-labelledby="dropdownId">
              <a class="dropdown-item" @click="saveData()">Save Data</a>
              <a class="dropdown-item" @click="loadData()">Load Data</a>
            </div>
          </li>
          <li class="nav-item">
            <strong class="nav-link active">Rs. {{funds}}</strong>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["funds"])
  },
  methods: {
    ...mapActions(["randStocks"]),
    saveData() {
      let data = {
        portfolio: this.$store.getters.stockPortfolio,
        funds: this.$store.getters.funds,
        stocks: this.$store.getters.getStocks
      };
      this.$http
        .put("https://vue-stocks-app-5a325.firebaseio.com/data.json", data)
        .then(result => {});
    },
    loadData() {
      this.$http
        .get("https://vue-stocks-app-5a325.firebaseio.com/data.json")
        .then(result => {
          console.log(result.body);
          this.$store.commit("setStocks", result.body.stocks);
          this.$store.commit("setFunds", result.body.funds);
          this.$store.commit("setPortfolio", result.body.portfolio);
        });
    }
  }
};
</script>

<style>
#nav {
  z-index: 1;
}
.router-link-exact-active {
  color: #222 !important;
  background: lightgrey;
  border-radius: 5px;
  font-weight: bold;
}
</style>