<template>
  <div v-for="command in commandeData" :key="command._id">
    <CommandeTechnicalCard
      :restaurantId="restorant_id"
      :submitLink="validateLink + command._id"
      :command="command"
      :enableButton="true"
      :buttonText="text_button"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandeTechnicalCard from "./CommandeTechnicalCard.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "RestorerCommandsToAccept",
  data: (): {
    commandeData: {
      _id: string;
    }[];
    validateLink: string;
    text_button: string;
    restorant_id: string;
  } => ({
    restorant_id: "",
    commandeData: [],
    validateLink: "http://127.0.0.1:8080/commands/accept/",
    text_button: "Accepter la Commande",
  }),
  methods: {},
  computed: {},
  components: { CommandeTechnicalCard },
  created() {
    //recupère les données du client
    axios
      .get("http://localhost:8080/user/" + this.$cookies.get("userId"), {
        //a changer pour l'id du resto
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((infoUser) => {
        this.restorant_id = infoUser.data.restaurantId;
        axios
          .get(
            "http://localhost:8080/commands/restaurant/toaccept/" +
              infoUser.data.restaurantId,
            {
              //a changer pour l'id du resto
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          )
          .then((resCommande) => {
            this.commandeData = resCommande.data;
            console.log("commandeData", this.commandeData);
          });
      });
  },
});
</script>

<style scoped></style>
