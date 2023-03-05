<template>
  <h1>Votre commande a bien été passée !</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  async mounted() {
    const commandIds = this.$store.getters.getCommands;
    console.log(commandIds);
    for (const commandId of commandIds) {
      await this.setCommandPayed(commandId);
    }
    this.$router.push("/home");
  },
  name: "PayedCheckView",
  methods: {
    async setCommandPayed(commandId) {
      await this.$axios.patch(
        "http://localhost:8080/commands/pay/" + commandId,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      );
    },
  },
});
</script>

<style scoped></style>
