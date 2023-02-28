<template>
  <div class="main">
    <div class="container-content">
      <div id="livreur">
        <div class="container-user">
          <div class="container">
            <div class="name">
              {{ clientData.firstname }} {{ clientData.lastname }}
            </div>
            <div class="number">{{ clientData.phone }}</div>
          </div>
          <div class="container">
            <div v-if="digitSuccess == false">Entrez le code validation</div>
            <div class="container-input">
              <input
                class="input"
                type="text"
                maxlength="5"
                v-model="resultDigit"
                :placeholder="'ouai'"
                :on-keypress="checkOTP()"
              />
              <v-btn
                v-if="digitSuccess"
                :to="'./home'"
                :onclick="livraisonValide"
                >Valider la livraison</v-btn
              >
              <v-label v-if="digitEchec == true"> Mauvais Code</v-label>
            </div>
          </div>
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
          <li>{{ currentStateLivraison }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "LivraisonView",
  data() {
    return {
      idLivreur: cookies.get("userId"),
      clientData: {},
      commandeData: {},
      livraisonData: {},
      digits: 5,
      digitResult: "12345",
      resultDigit: "",
      digitSuccess: false,
      digitEchec: false,
    };
  },
  methods: {
    checkOTP() {
      if (this.$data.digitResult.length == this.$data.resultDigit.length) {
        if (this.$data.digitResult === this.$data.resultDigit) {
          this.$data.digitSuccess = true;
          this.$data.digitEchec = false;
        } else {
          this.$data.resultDigit = "";
          this.$data.digitSuccess = false;
          this.$data.digitEchec = true;
        }
      }
    },
    livraisonValide() {
      axios.post(
        "http://localhost:8080/livraisons/done/" + this.idLivreur,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      );
    },
  },
  computed: {},
  components: {},
  created() {
    //recupère les données de la livraison
    console.log(this.idLivreur);
    axios
      .get("http://localhost:8080/livraisons/livreur/" + this.idLivreur, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((resLivraison) => {
        this.commandeData = resLivraison.data;
        //recupère les données de la commande
        axios
          .get(
            "http://localhost:8080/commands/" + resLivraison.data.commandeID,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          )
          .then((resCommande) => {
            this.commandeData = resCommande.data;
            //recupère les données du client
            console.log(resCommande.data.clientID);
            axios
              .get("http://localhost:8080/user/" + resCommande.data.clientID, {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("token")}`,
                },
              })
              .then((resClient) => {
                this.clientData = resClient.data;
              });
          });
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
.digit-box {
  height: 3rem;
  width: 1.5rem;
  border: 2px solid black;
  display: inline-block;
  border-radius: 5px;
  margin: 5px;
  padding: 15px;
  font-size: 3rem;
}
.digit-box:focus {
  outline: 2px solid black;
}
.container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  overflow: hidden;
}
.container > * {
  margin: 5px;
}
.container-content {
  display: flex;
  width: 90%;
  height: 60%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 30px;
  border: 1px solid var(--light-mode-color-five);
  margin-top: 40px;
  overflow: hidden;
  margin: 5px;
}
.container-content > * {
  background-color: #fff;
}
.container-input > * {
  margin: 10px;
}
.container-user {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.container-user > * {
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
  margin-top: 50px;
}

.restaurant-title {
  display: flex;
  width: 100%;
  font-size: 45px;
  align-items: center;
  justify-content: center;
}
.input {
  width: 100px;
  border: 2px solid black;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
}
.input:focus-visible {
  border: 0px solid;
  outline: 5px solid var(--light-mode-color-four);
}
</style>
