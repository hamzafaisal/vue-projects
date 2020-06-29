<template>
  <div class="col-lg-4 col-sm-12 col-md-6 col-12 my-3">
    <div class="card">
      <h5 class="card-header bg-dark text-light">
        {{stock.name}}
        <small class="ml-1">(Price: {{stock.price}})</small>
      </h5>
      <div class="card-body">
        <div class="input-group mb-3">
          <input type="number" class="form-control" placeholder="Quantity..." v-model="quantity" />
          <div class="input-group-append">
            <button
              class="btn btn-dark text-light"
              type="button"
              :disabled="quantity <= 0 || Number.isInteger(quantity)"
              @click="buyStock()"
            >Buy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quantity: null
    };
  },
  methods: {
    buyStock() {
      let buyingStock = {
        stockId: this.stock.id,
        price: this.stock.price,
        quantity: this.quantity
      };
      // console.log(buyingStock);
      this.$store.dispatch("buyStock", buyingStock);
      this.quantity = null;
    }
  },
  props: ["stock"]
};
</script>

<style scoped>
</style>