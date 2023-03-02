<template>
  <div v-for="command in commandeData" :key="command">
    <CommandCard :command="command" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CommandCard from "../components/CommandCard.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "LivraisonView",
  data() {
    return {
      commandeData: {},
    };
  },
  props: {
    id: { type: String, required: true },
  },
  methods: {},
  computed: {},
  components: { CommandCard },
  created() {
    //recupère les données du client
    axios
      .get("http://localhost:8080/commands/" + this.$props.id, {
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
