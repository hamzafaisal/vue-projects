<template>
  <div class="col-lg-4 col-sm-12 col-md-6 col-12 my-3">
    <div class="card">
      <h5 class="card-header bg-dark text-light">
        {{portfolio.name}}
        <small
          class="ml-1"
        >(Price: {{portfolio.price }} | Quantity : {{portfolio.quantity}})</small>
      </h5>
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="Quantity..." v-model="quantity" />
          <div class="input-group-append">
            <button
              class="btn btn-dark text-light"
              type="button"
              :disabled="quantity <= 0 || Number.isInteger(quantity)"
              @click="sellStock()"
            >Sell</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["portfolio"],
  data() {
    return {
      quantity: null
    };
  },
  methods: {
    sellStock() {
      let sellingStock = {
        stockId: this.portfolio.id,
        price: this.portfolio.price,
        quantity: this.quantity
      };
      // console.log(sellingStock);
      this.$store.dispatch("sellStock", sellingStock);
      this.quantity = null;
    }
  }
};
</script>

<style scoped>
</style>