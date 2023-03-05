<template>
  <div>
    <DeliveryCommandDashboard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DeliveryCommandDashboard from "../components/DeliveryCommandDashboard.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "LivraisonView",
  //data: (): {} => ({}),

  computed: {},
  components: { DeliveryCommandDashboard },
  //created() {},
});
</script>

<style scoped></style>
