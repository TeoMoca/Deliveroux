<template>
  <v-card
    id="titleSummary"
    class="mx-auto"
    max-width="844"
    title="Mon historique de commandes"
  >
    <div>
      <v-divider />
      <HistoryCommand />
      <v-divider />
      <v-divider />
      <HistoryCommand />
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
});
</script>

<style scoped>
#titleSummary {
  text-align: center;
}
</style>
