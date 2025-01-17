import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home";
import AddRecepie from "./components/AddRecepie";
import EditRecepie from "./components/EditRecepie";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/add",
      name: "add",
      component: AddRecepie
    },
    {
      path: "/edit/:slug",
      name: "edit",
      component: EditRecepie
    },
    {
      path: "*",
      component: Home
    }
  ]
});
