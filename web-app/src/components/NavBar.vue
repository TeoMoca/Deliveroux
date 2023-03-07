<template>
  <div class="nav-bar">
    <img
      class="logo"
      :src="require('@/assets/deliveroux.png')"
      alt="Deliveroux"
    />
    <h1 class="title" v-if="$router.currentRoute.value.fullPath !== '/home'">
      <a :href="'/home'">
        {{ title }}
      </a>
    </h1>
    <h1 class="title" v-else>
      {{ title }}
    </h1>

    <v-spacer></v-spacer>
    <div class="search-bar" tabindex="1" v-if="condition && searchBar">
      <input
        type="text"
        v-model="search"
        placeholder="De quoi avez vous envie ?"
      />
      <div class="search-items">
        <a
          class="item"
          v-for="item in filteredList()"
          :key="item.name"
          :href="'http://localhost:8081/restaurants/' + item._id"
        >
          <img class="item-img" :src="item.image_link" />
          <p>{{ item.name }}</p>
        </a>
        <div class="item error" v-if="search && !filteredList().length">
          <p>No results found!</p>
        </div>
      </div>
    </div>
    <v-badge
      v-if="condition && cart"
      color="white"
      :content="$store.getters.getCount"
      :value="$store.getters.getCount"
      @click="RedirectToCheckout"
      ><v-icon color="white" @click="RedirectToCheckout" large>
        mdi-shopping
      </v-icon>
    </v-badge>
    <div v-if="livraison" class="user">
      <v-icon v-if="livraison"
        ><v-btn variant="plain"></v-btn>mdi-bicycle</v-icon
      >
    </div>
    <div v-if="commandesEnCours" class="user" tabindex="1">
      <v-badge v-bind:content="commandes.length" floating
        ><v-icon>mdi-food</v-icon></v-badge
      >
      <div class="options">
        <a
          variant="plain"
          v-for="commande in commandes.filter(
            (commande) => commande.commandeStatut == 'EC'
          )"
          :key="commande.id"
          :href="'/livraisons/:' + commande.id"
        >
          {{ commande.id }}
        </a>
      </div>
    </div>
    <div tabindex="1" class="user" v-if="getUserInitials() && condition">
      {{ getUserInitials() }}
      <div class="options">
        <p @click="RedirectProfile">Mes informations</p>
        <p @click="RedirectCommands">Voir mes commandes</p>
        <p>Parrainez un amis</p>
        <p class="disconnect" @click="disconnect">Me déconnecter</p>
        <p @click="$store.commit('changeMode')">Changer de thème</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  computed: {
    condition() {
      return !(
        this.$route.path === "/" ||
        this.$route.path === "/register" ||
        this.$route.path === "/customerRegister" ||
        this.$route.path === "/deliveryRegister"
      );
    },
    livraison() {
      var isdisplay = true;
      if (this.$data.livraisons === undefined) {
        isdisplay = false;
      }
      if (this.$route.path !== "/home") {
        isdisplay = false;
      }
      if (this.$data.idRole !== 3) {
        isdisplay = false;
      }
      return isdisplay;
    },
    commandesEnCours() {
      var isdisplay = true;
      if (this.$data.idRole !== 2) {
        isdisplay = false;
      }
      if (this.$route.path === "/livraison") {
        isdisplay = false;
      }
      return isdisplay;
    },
  },
  beforeCreate() {
    //Restaurant
    if (this.$cookies.get("userId")) {
      this.$axios
        .get("http://localhost:8080/restaurants", {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((rep) => {
          rep.data.map(
            (item: { name: string; image_link: string; _id: string }) => {
              this.restaurants.push(item);
            }
          );
        });
      //
      this.$axios
        .get("http://localhost:8080/user/" + this.$cookies.get("userId"), {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((rep) => {
          switch (rep.data.roleId) {
            case 1: {
              this.searchBar = true;
              this.cart = true;
              break;
            }
            case 15: {
              this.searchBar = true;
              this.cart = true;
              break;
            }
            case 16: {
              this.searchBar = false;
              this.cart = false;
              break;
            }
            case 18: {
              this.searchBar = true;
              this.cart = true;
              break;
            }
            default: {
              this.searchBar = false;
              this.cart = false;
              break;
            }
          }
          console.log(this.searchBar, this.cart);
        });
      //Livraisons
      this.$axios
        .get(
          "http://localhost:8080/livraisons/livreur/" +
            this.$cookies.get("userId"),
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then((rep) => {
          this.livraisons = rep.data;
          console.log(this.$data.livraisons);
        });
      this.$axios
        .get("http://localhost:8080/commands/" + this.$cookies.get("userId"), {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((rep) => {
          this.commandes = rep.data;
          console.log(this.$data.commandes);
        });
      this.counter = this.$store.getters.getCount;
    }
  },
  data: (): {
    counter: number;
    title: string;
    search: string;
    restaurants: { name: string; image_link: string; _id: string }[];
    initials: string;
    idRole: number;
    livraisons: object;
    commandes: Array<{ commandeStatut: string; id: string }>;
    searchBar: boolean;
    cart: boolean;
  } => ({
    counter: 0,
    title: "Deliveroux",
    search: "",
    restaurants: [],
    initials: "",
    idRole: 0,
    livraisons: {},
    commandes: [],
    searchBar: false,
    cart: false,
  }),
  methods: {
    updateBalance() {
      this.counter = this.$store.getters.getCount;
    },
    RedirectProfile() {
      this.$router.push("/Profile");
    },
    RedirectToCheckout() {
      this.$router.push("/checkout");
    },
    RedirectCommands() {
      this.$router.push("/livraison/" + this.$cookies.get("userId"));
    },
    filteredList() {
      const regex = new RegExp("^" + this.$data.search.toLowerCase());
      const filteredFruits = this.$data.restaurants.filter((restaurant) =>
        regex.test(restaurant.name.toLowerCase())
      );
      return filteredFruits;
    },
    getUserInitials() {
      const firstname = this.$cookies.get("firstname") as string;
      const lastname = this.$cookies.get("lastname") as string;
      if (firstname && lastname) {
        this.initials = firstname?.charAt(0) + lastname?.charAt(0) || "";
        return this.initials.toUpperCase();
      }
    },
    disconnect() {
      console.log("disconnect");
      this.$cookies.remove("token");
      this.$cookies.remove("firstname");
      this.$cookies.remove("lastname");
      this.$cookies.remove("userId");
      localStorage.removeItem("store");
      this.$router.push({ path: "/" });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  overflow: visible;
  gap: 10px;
  width: 100%;
  height: 8vh;
  background: var(--color-one);
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  grid-template-columns: max-content 1fr max-content max-content max-content;
  grid-template-areas: "title blank search cart user-options";
  padding: 10px;
  position: fixed;
  z-index: 200;
}

.nav-bar .title {
  color: var(--color-two);
  cursor: default;
}

.logo {
  width: 50px;
}

.search-bar {
  display: grid;
  grid-template-rows: 100% 1fr;
  position: relative;
  margin-right: 10px;
  background: var(--color-five);
  padding: 10px;
  width: 30vw;
  grid-area: search;
}

.search-bar input:focus {
  outline: none;
}

.search-bar:focus-within .search-items {
  display: block;
}

.search-items {
  display: none;
  position: absolute;
  top: 100%;
  background: var(--color-four);
  color: var(--color-six);
  width: 100%;
  overflow: auto;
  max-height: 300px;
  transition: all 1s ease-in-out;
}

.search-items .item {
  text-decoration: none;
  padding: 10px 5px;
}

.search-items .item:hover {
  background: var(--color-two);
}

.item {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 80px 1fr;
  grid-template-areas: "img item-infos";
  width: 100%;
  height: 100%;
  gap: 10px;
  cursor: pointer;
  color: var(--color-one);
}

.item .item-img {
  width: 100%;
  height: 80px;
  background: var(--color-one);
  object-fit: cover;
}

.v-badge {
  grid-area: cart;
}

.user {
  background: var(--color-five);
  color: var(--color-two);
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 30px;
  grid-area: user-options;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}

.user .options {
  display: none;
  outline: none;
  width: 200px;
  background: var(--color-six);
  color: var(--color-two);
  border-radius: 10px 0 10px 10px;
  position: absolute;
  top: 85%;
  right: 85%;
  overflow: hidden;
  z-index: 200;
}

.user .options p {
  padding: 10px;
  display: flex;
  align-items: center;
}

.disconnect::before {
  content: "\F0343";
  font: normal normal normal 24px/1 "Material Design Icons";
}

.user .options p:hover {
  background: var(--color-one);
  color: var(--color-four);
}

.user:focus-within .options {
  display: block;
}
</style>
