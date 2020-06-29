const state = {
  funds: 10000,
  stocks: [],
  alert: false,
  alert2: false
};

const mutations = {
  buyStock(state, buyingStock) {
    if (state.funds < buyingStock.price * buyingStock.quantity) {
      state.alert = true;
    } else {
      const record = state.stocks.find(
        element => element.id == buyingStock.stockId
      );
      if (record) {
        record.quantity =
          parseInt(record.quantity) + parseInt(buyingStock.quantity);
      } else {
        state.stocks.push({
          id: buyingStock.stockId,
          quantity: buyingStock.quantity
        });
      }
      state.funds -= buyingStock.price * buyingStock.quantity;
      state.alert = false;
    }
  },
  sellStock(state, sellingStock) {
    const record = state.stocks.find(
      element => element.id == sellingStock.stockId
    );
    if (record.quantity >= sellingStock.quantity) {
      record.quantity -= sellingStock.quantity;
      state.funds += sellingStock.price * sellingStock.quantity;
      state.alert2 = false;
    } else {
      console.log("error");
      state.alert2 = true;
      //   state.stocks.splice(state.stocks.indexOf(record), 1);
    }
  },
  setFunds(state, data) {
    state.funds = data;
  },
  setPortfolio(state, data) {
    state.stocks = data;
  }
};

const actions = {
  buyStock({ commit }, buyingStock) {
    commit("buyStock", buyingStock);
  },
  sellStock({ commit }, sellingStock) {
    commit("sellStock", sellingStock);
  }
  //   loadData({ commit }, data) {
  //     commit("loadData", data);
  //   }
};

const getters = {
  stockPortfolio: (state, getters) => {
    return state.stocks.map(stock => {
      const record = getters.getStocks.find(element => element.id == stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      };
    });
  },
  funds: state => {
    return state.funds;
  },
  alerting: state => {
    return state.alert;
  },
  alerting2: state => {
    return state.alert2;
  }
};

export default { state, mutations, actions, getters };
