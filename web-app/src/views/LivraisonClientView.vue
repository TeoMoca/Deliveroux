<template>
  <div class="main">
    <ProgressBar
      class="pBar"
      msg="test"
      :state="commandeData.commandeStatut"
    ></ProgressBar>
    <div class="container">
      <div id="livreur">
        <div class="photo">Photo jpeg</div>
        <div class="container-livreur">
          <div class="name">
            {{ livreurData.firstname }} {{ livreurData.lastname }}
          </div>
          <div class="number">{{ livreurData.phone }}</div>
          <button
            :class="{ bouton: true }"
            v-on:click="commandeData.commandeStatut = 'EP'"
          >
            1
          </button>
          <button
            :class="{ bouton: true }"
            v-on:click="commandeData.commandeStatut = 'P'"
          >
            2
          </button>
          <button
            :class="{ bouton: true }"
            v-on:click="commandeData.commandeStatut = 'EC'"
          >
            3
          </button>
          <button
            :class="{ bouton: true }"
            v-on:click="commandeData.commandeStatut = 'F'"
          >
            4
          </button>
        </div>
      </div>
      <div id="map">
        <v-img src="/map.jpg" alt="ceci est une carte"></v-img>
      </div>
      <div id="commande">
        <div name="recap">Récapitulatif de votre commande</div>
        <ul class="list-item">
          <li
            class="item"
            v-for="article in commandeData.orderDetails.articles"
            :key="article"
          >
            {{ article }}
          </li>
          <li>{{ commandeData.orderDetails.prix }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressBar from "./../components/ProgressBar.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "LivraisonView",
  data() {
    return {
      idClient: cookies.get("userId"),
      livreurData: {},
      commandeData: {},
      livraisonData: {},
    };
  },
  props: ["id"],
  methods: {},
  computed: {},
  components: { ProgressBar },
  created() {
    //recupère les données du client
    axios
      .get(
        "http://localhost:8080/livraison/commande/" + this.$props.id.slice(1),
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((resLivraison) => {
        this.livraisonData = resLivraison.data;
        axios
          .get(
            "http://localhost:8080/api/users/" + resLivraison.data.livreurID,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          )
          .then((resLivreur) => {
            this.livreurData = resLivreur.data;
          });
      });
    axios
      .get(
        "http://localhost:8080/commands/command/" + this.$props.id.slice(1),
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((resCommande) => {
        this.commandeData = resCommande.data;
      });
    // res.data.forEach(element => {
    // this.livreurData.livreurFName = element.firstname, this.livreurData.livreurLName = element.lastname, this.livreurData.livreurPNumber = element.phone, console.log(element)})
  },
});
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-image: linear-gradient(
    0deg,
    var(--light-mode-color-five) 3%,
    var(--light-mode-color-four) 10%
  );
}

.container {
  display: flex;
  width: 90%;
  height: 60%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  position: relative;
  border-radius: 30px;
  border: 1px solid var(--light-mode-color-five);
  margin-bottom: 10px;
  overflow: hidden;
}
.container > * {
  background-color: #fff;
}
.container-livreur {
  display: flex;
  width: 100%;
  height: 50%;
  margin: 10px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
}
.container-livreur > * {
  margin: 20px;
}
.bouton {
  background-color: red;
}
#livreur {
  display: flex;
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo {
  margin-top: 50px;
  padding: 0px;
  display: flex;
  height: 300px;
  width: 200px;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid black;
}

#map {
  width: 40%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#commande {
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
}
#commande > * {
  margin: 5px;
}

.restaurant-title {
  display: flex;
  width: 100%;
  font-size: 45px;
  align-items: center;
  justify-content: center;
}
</style>
