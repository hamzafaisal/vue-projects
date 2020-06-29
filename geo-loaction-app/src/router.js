import Vue from "vue";
import Router from "vue-router";
import Map from "./components/Map";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import ViewProfile from "./components/profile/ViewProfile";
import firebase from "firebase";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "map",
      component: Map,
      beforeEnter(to, from, next) {
        if (firebase.auth().currentUser) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/profile/:name",
      name: "profile",
      component: ViewProfile,
      beforeEnter(to, from, next) {
        if (firebase.auth().currentUser) {
          next();
        } else {
          next("/login");
        }
      }
    },
    {
      path: "*",
      component: Map
    }
  ]
});
