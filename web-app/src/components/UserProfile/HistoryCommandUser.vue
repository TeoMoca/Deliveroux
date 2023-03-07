<template>
  <v-card
    id="titleSummary"
    max-width="844"
    max-height="500"
    class="scroll"
    title="Mon historique de commandes"
  >
    <div v-for="item in Allcommands" :key="item.commandNumber">
      <v-divider />
      <HistoryCommand :commands="item" />
      <v-divider />
    </div>
  </v-card>
</template>

<script>
import { defineComponent } from "vue";
import HistoryCommand from "@/components/UserProfile/HistoryCommand/HistoryCommand.vue";
export default defineComponent({
  name: "HistoryCommandUser",
  components: { HistoryCommand },
  data: () => ({
    Allcommands: [
      {
        commandNumber: "",
        commandPrice: 0,
        commandAdress: "",
        commandCity: "",
        commandZipCode: "",
        commandCountry: "",
        commandDate: "",
        commandArticles: [],
      },
    ],
  }),
  async created() {
    await this.getAllCommands();
  },
  methods: {
    async getAllCommands() {
      const commands = await this.$axios.get(
        "http://localhost:8080/commands/" + this.$cookies.get("userId"),
        {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("token"),
          },
        }
      );
      for (const command of commands.data) {
        const date = new Date(command.date);
        this.Allcommands.push({
          commandNumber: command._id,
          commandPrice: command.price,
          commandAdress: command.adress,
          commandCity: command.city,
          commandZipCode: command.codePostal,
          commandCountry: command.country,
          commandDate: date.toLocaleDateString("fr"),
          commandArticles: command.articles.items,
        });
      }
      this.Allcommands.splice(0, 1);
    },
  },
});
</script>

<style scoped>
#titleSummary {
  text-align: center;
}

.scroll {
  overflow-y: scroll;
}
</style>
