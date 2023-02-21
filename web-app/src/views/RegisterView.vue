<template>
  <v-card width="1000" style="margin: auto">
    <v-row no-gutters>
      <v-col cols="5">
        <div
          style="display: flex; height: 33%; width: 100%; text-align: center"
        >
          <div class="circle">1</div>
          <div>Informations Personnelles</div>
        </div>
        <div style="display: flex; height: 33%">
          <div class="circle">2</div>
          <div>Addresse</div>
        </div>
        <div style="display: flex; height: 33%">
          <div class="circle">3</div>
          <div>Rôle</div>
        </div>
      </v-col>
      <v-col>
        <v-form
          ref="form"
          class="mb-2"
          v-model="valid"
          @submit.prevent="validate"
        >
          <div v-if="isPersonalInformation">
            <h1>Informations Personnelles</h1>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="firstname"
                    class="mb-2"
                    label="Prénom"
                    :rules="firstnamerules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="lastname"
                    class="mb-2"
                    label="Nom"
                    :rules="lastnamerules"
                    required
                /></v-col>
              </v-row>
            </v-container>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data: () => ({
    valid: false,
    isPersonalInformation: true,
    firstname: "",
    firstnamerules: [(v: string) => !!v || "le prénom est requis"],
    lastname: "",
    lastnamerules: [(v: string) => !!v || "le nom est requis"],
  }),
  methods: {
    toCustomerRegister() {
      this.$router.push("/customerRegister");
    },
    toRestaurateurRegister() {
      this.$router.push("/restaurateurRegister");
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

.circle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  border-color: var(--light-mode-color-five);
  border-style: solid;
}
</style>
