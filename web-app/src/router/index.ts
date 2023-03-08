import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import RestaurateurHomeView from "../views/RestaurateurViews/RestaurateurHomeView.vue";
import RestaurantView from "../views/RestaurantView.vue";
import livraisonClientView from "../views/LivraisonClientView.vue";
import CommandRestorerView from "../views/CommandRestorerView.vue";
import livraisonLivreurView from "../views/LivraisonLivreurView.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: LoginView,
  },
  {
    path: "/home",
    name: "home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      console.log("function for hoe component");
      return axios
        .get(`http://${location.hostname}:8080/user/${cookies.get("userId")}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        })
        .then((rep) => {
          switch (rep.data.roleId) {
            case 1: {
              return HomeView;
            }
            case 15: {
              console.log("client");
              return HomeView;
            }
            case 16: {
              console.log("restarateur");
              return RestaurateurHomeView;
            }
            case 18: {
              return HomeView;
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  {
    path: "/restaurants/:id",
    name: "restaurant",
    component: RestaurantView,
    beforeEnter: (to, from, next) => {
      //axios.get(`http://${location.hostname}:8080/`, {
      //
      //});
      return next();
    },
  },
  {
    path: "/livraison/:id",
    name: "livraison",
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => {
      return axios
        .get(`http://${location.hostname}:8080/user/${cookies.get("userId")}`, {
          headers: {
            Authorization: `Bearer ${cookies.get("token")}`,
          },
        })
        .then((rep) => {
          console.log(rep.data.roleId);
          switch (rep.data.roleId) {
            case 1: {
              return livraisonClientView;
            }
            case 15: {
              return livraisonClientView;
            }
            //restorer
            case 16: {
              return CommandRestorerView;
            }
            case 18: {
              return livraisonLivreurView;
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/Profile",
    name: "Profile",
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/commands/:id/payment",
    name: "PayedCheckView",
    component: () => import("../views/PayedCheckView.vue"),
  },
  {
    path: "/Refer",
    name: "Refer",
    component: () => import("../views/ReferView.vue"),
  },
  {
    path: "/customerRegister",
    name: "CustomerRegister",
    component: () => import("../views/CustomerView.vue"),
  },
  {
    path: "/deliveryRegister",
    name: "DeliveryRegister",
    component: () => import("../views/DeliveryView.vue"),
  },
  {
    path: "/restaurateurRegister",
    name: "restaurateurRegister",
    component: () => import("../views/RestaurateurRegisterView.vue"),
  },
  {
    path: "/Checkout",
    name: "Checkout",
    component: () => import("../views/CheckoutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = cookies.get("token");
  if (token) {
    if (to.path === "/") return next({ path: "/home" });
    return next();
  } else {
    if (
      to.path === "/" ||
      to.path === "/register" ||
      to.path === "/customerRegister" ||
      to.path === "/deliveryRegister" ||
      to.path === "/restaurateurRegister"
    )
      return next();
    return next({ path: "/" });
  }
});

export default router;
