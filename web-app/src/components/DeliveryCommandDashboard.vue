<template>
  <div class="d-flex justify-space-evenly">
    <v-col class="HalfDashboard d-flex justify-center" cols="12" sm="5">
      <div class="flex-column">
        <h1>Livraisons à accepter</h1>
        <DeliveryCommandToAccept />
      </div>
    </v-col>
    <v-col class="HalfDashboard d-flex justify-center" cols="12" sm="5">
      <div class="flex-column">
        <h1>Livraisons en cours</h1>
        <DeliveryCommandsInCharge />
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DeliveryCommandToAccept from "../components/DeliveryCommandToAccept.vue";
import DeliveryCommandsInCharge from "../components/DeliveryCommandsInCharge.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "RestorerCommandDashboard",
  //data: (): {} => ({}),
  methods: {},
  computed: {},
  components: { DeliveryCommandToAccept, DeliveryCommandsInCharge },
  //created() {},
});
</script>

<style scoped>
.HalfDashboard {
  margin-top: 200px;
  background-color: rgb(226, 226, 226);
  border-radius: 20px;
  height: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: var(--color-four);
}
</style>
