<template>
  <div v-for="command in commandeData" :key="command._id">
    <CommandeTechnicalCard
      :cardType="'delivery'"
      :restaurantId="restorant_id"
      :command="command"
      :enableButton="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandeTechnicalCard from "../components/CommandeTechnicalCard.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "DeliveryCommandsInCharge",
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
    validateLink: "http://127.0.0.1:8080/commands/takedelivery/",
    text_button: "Accepter la Commande",
  }),

  computed: {},
  components: { CommandeTechnicalCard },
  created() {
    //recupère les données du client
    axios
      .get("http://localhost:8080/commands/delivery/delivering", {
        //a changer pour l'id du resto
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((resCommande) => {
        this.commandeData = resCommande.data;
        console.log("commandeData", this.commandeData);
      });
  },
});
</script>

<style scoped></style>
