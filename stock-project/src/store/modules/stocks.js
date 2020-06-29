import stocksData from "../../data/stocksData";

const state = {
  stocks: []
};

const mutations = {
  setStocks(state, stocks) {
    state.stocks = stocks;
  },
  randStocks(state) {
    state.stocks.forEach(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  }
};

const actions = {
  setStocks({ commit }) {
    commit("setStocks", stocksData);
  },
  randStocks({ commit }) {
    commit("randStocks");
  }
};

const getters = {
  getStocks: state => {
    return state.stocks;
  }
};

export default { state, mutations, actions, getters };
