<template>
  <div class="d-flex justify-space-evenly">
    <v-col class="HalfDashboard d-flex justify-center" cols="12" sm="5">
      <div class="flex-column">
        <h1>Commandes à accepter</h1>
        <RestorerCommandsToAccept />
      </div>
    </v-col>
    <v-col class="HalfDashboard d-flex justify-center" cols="12" sm="5">
      <div class="flex-column">
        <h1>Commandes en préparation</h1>
        <RestorerCommandsInPreparation />
      </div>
    </v-col>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RestorerCommandsToAccept from "../components/RestorerCommandsToAccept.vue";
import RestorerCommandsInPreparation from "../components/RestorerCommandsInPreparation.vue";
import axios from "axios";
import Cookies from "cookies-ts";

const cookies = new Cookies();

export default defineComponent({
  name: "RestorerCommandDashboard",
  //data: (): {} => ({}),
  methods: {},
  computed: {},
  components: { RestorerCommandsToAccept, RestorerCommandsInPreparation },
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
}
</style>
