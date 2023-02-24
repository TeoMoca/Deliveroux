<template>
  <v-card width="1000" style="margin: auto">
    <v-row no-gutters>
      <v-col cols="5">
        <div
          style="display: flex; height: 33%; width: 100%; text-align: center"
          @click="ToPersonalInformation"
        >
          <div class="circle">1</div>
          <div>Informations Personnelles</div>
        </div>
        <div style="display: flex; height: 33%" @click="ToAddressInformation">
          <div class="circle">2</div>
          <div>Addresse</div>
        </div>
        <div style="display: flex; height: 33%" @click="ToRoleInformation">
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
          <div v-if="isPersonalInformation" style="text-align: center">
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
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    class="mb-2"
                    label="Mot de passe"
                    :rules="passwordrules"
                    type="password"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    class="mb-2"
                    label="Confirmer le mot de passe"
                    type="password"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    v-model="email"
                    class="mb-2"
                    label="Email"
                    :rules="emailrules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="phone"
                    class="mb-2"
                    label="Téléphone"
                    :rules="phonerules"
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="isAddressInformation" style="text-align: center">
            <h1>Addresse</h1>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="adressname"
                    class="mb-2"
                    label="Adresse"
                    :rules="addressnamerules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="city"
                    class="mb-2"
                    label="Ville"
                    :rules="cityrules"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="codepostal"
                    class="mb-2"
                    label="Code Postal"
                    :rules="codepostalrules"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="country"
                    class="mb-2"
                    label="Pays"
                    :rules="countryrules"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="refercode"
                    class="mb-2"
                    label="Parrainage (email)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="isRoleInformation" style="text-align: center">
            <h1>Vous êtes</h1>

            <v-row>
              <v-col>
                <v-radio-group>
                  <v-radio
                    v-for="role in checkRoles"
                    :key="role.value"
                    @click="checkRole(role.value)"
                    :value="role.value"
                    :label="role.label"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
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
    isAddressInformation: false,
    isRoleInformation: false,
    firstname: "",
    firstnamerules: [(v: string) => !!v || "le prénom est requis"],
    lastname: "",
    lastnamerules: [(v: string) => !!v || "le nom est requis"],
    password: "",
    passwordrules: [(v) => !!v || "Le mot de passe est obligatoire"],
    email: "",
    emailrules: [
      (v) => /.+@.+\..+/.test(v) || "E-mail doit être valide",
      (v) => !!v || "Email est requis",
    ],
    phone: "",
    phonerules: [(v) => !!v || "Le numéro de téléphone est obligatoire"],
    adressname: "",
    addressnamerules: [(v) => !!v || "L adresse est obligatoire"],
    city: "",
    cityrules: [(v) => !!v || "La ville est obligatoire"],
    codepostal: "",
    codepostalrules: [
      (v) => !!v || "Le code postal est obligatoire",
      (v) =>
        /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(v) ||
        "Le code postal n est pas valide",
    ],
    country: "",
    countryrules: [(v) => !!v || "Le pays est obligatoire"],
    checkRoles: [
      { label: "Consommateur", value: 1 },
      { label: "Restaurateur", value: 2 },
      { label: "Livreur", value: 3 },
    ],
    selectedRole: 0,
  }),
  methods: {
    checkRole(roleId) {
      this.selectedRole = roleId;
      console.log(this.selectedRole);
    },
    ToPersonalInformation() {
      this.isPersonalInformation = true;
      this.isAddressInformation = false;
      this.isRoleInformation = false;
    },
    ToAddressInformation() {
      this.isPersonalInformation = false;
      this.isAddressInformation = true;
      this.isRoleInformation = false;
    },
    ToRoleInformation() {
      this.isPersonalInformation = false;
      this.isAddressInformation = false;
      this.isRoleInformation = true;
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
