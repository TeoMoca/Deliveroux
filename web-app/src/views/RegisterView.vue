<template>
  <v-card class="mx-auto my-12" max-width="600">
    <h2>Je suis un ...</h2>
    <v-container class="d-flex mb-6" fluid>
      <v-row justify="center" no-gutters>
        <v-col cols="3" md="4">
          <v-btn
            @click="toCustomerRegister"
            color="primary"
            prepend-icon="mdi-silverware-variant"
          >
            Utilisateur
          </v-btn>
        </v-col>
        <v-col cols="3" md="4">
          <v-btn
            @click="toRestorerRegister"
            prepend-icon="mdi-chef-hat"
            color="primary"
          >
            Restaurateur
          </v-btn>
        </v-col>
        <v-col cols="3" md="">
          <v-btn
            @click="toDeliveryRegister"
            prepend-icon="mdi-bike"
            color="primary"
          >
            Livreur
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  methods: {
    toCustomerRegister() {
      this.$router.push("/customerRegister");
    },
    toRestorerRegister() {
      this.$router.push("/restorerRegister");
    },
    toDeliveryRegister() {
      this.$router.push("/deliveryRegister");
    },
  },
});
</script>

<style>
h2 {
  text-align: center;
}
.container {
  align-items: center;
}
</style>
