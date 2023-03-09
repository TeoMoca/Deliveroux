<template>
  <div><RestorerCommandDashboard /></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RestorerCommandDashboard from "../components/RestorerCommandDashboard.vue";

export default defineComponent({
  name: "LivraisonView",
  //data: (): {} => ({}),
  props: {
    id: { type: String, required: true },
  },
  components: { RestorerCommandDashboard },
  //created() {},
});
</script>

<style scoped></style>
