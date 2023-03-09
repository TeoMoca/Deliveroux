<template>
  <div v-for="command in commandeData" :key="command._id">
    <CommandeTechnicalCard
      cardType="restorer"
      :restaurantId="restorant_id"
      :command="command"
      :enableButton="false"
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
  name: "RestorerCommandsInPreparation",
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
    validateLink: "",
    text_button: "",
  }),
  methods: {},
  computed: {},
  components: { CommandeTechnicalCard },
  created() {
    //recupère les données du client
    axios
      .get(
        `http://${location.hostname}:8080/user/` + this.$cookies.get("userId"),
        {
          //a changer pour l'id du resto
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((infoUser) => {
        this.restorant_id = infoUser.data.restaurantId;
        axios
          .get(
            `http://${location.hostname}:8080/commands/restaurant/todeliver/` +
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
