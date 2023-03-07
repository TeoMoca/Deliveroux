<template>
  <div id="container">
    <div style="padding-left: 2%">
      <h2>Commande n°: ada585s25</h2>
    </div>
    <div
      style="
        padding-right: 2%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      "
    >
      <h2>15 $</h2>
      <v-icon
        icon="mdi mdi-arrow-right-bold"
        style="padding-left: 5%"
        size="x-large"
      ></v-icon>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "HistoryCommand",
});
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
