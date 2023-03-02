<template>
  <div v-for="command in commandeData" :key="command._id">
    <CommandeTechnicalCard
      :submitLink="validateLink + command._id"
      :command="command"
      :buttonText="text_button"
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
  name: "LivraisonView",
  data: (): {
    commandeData: {
      _id: string;
    }[];
    validateLink: string;
    text_button: string;
  } => ({
    commandeData: [],
    validateLink: "http://127.0.0.1:8080/commands/accept/",
    text_button: "Accepter la Commande",
  }),
  props: {
    id: { type: String, required: true },
  },
  methods: {},
  computed: {},
  components: { CommandeTechnicalCard },
  created() {
    //recupère les données du client
    axios
      .get("http://localhost:8080/commands/restaurant/" + this.$props.id, {
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
