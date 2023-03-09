<template>
  <v-card class="mx-auto cardItem" max-width="444" title="Enregistrement">
    <v-form ref="form" class="mb-2" v-model="valid" @submit.prevent="validate">
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

          <v-col cols="12" md="6"
            ><v-text-field
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
              label="Mot
              de
              passe"
              :rules="passwordrules"
              required
            />
          </v-col>
        </v-row>
        <v-text-field
          prepend-inner-icon="mdi-email"
          v-model="email"
          class="mb-2"
          label="Email"
          :rules="emailrules"
          required
        />
        <v-text-field
          v-model="phone"
          class="mb-2"
          label="Téléphone"
          :rules="phonerules"
          required
        />
        <v-text-field
          v-model="adressname"
          class="mb-2"
          label="Adresse"
          :rules="addressnamerules"
          required
        />
        <v-text-field
          v-model="codepostal"
          class="mb-2"
          label="Code
          Postal"
          :rules="codepostalrules"
          required
        />
        <v-text-field
          v-model="country"
          class="mb-2"
          label="Pays"
          :rules="countryrules"
          required
        />
        <v-text-field
          v-model="city"
          class="mb-2"
          label="Ville"
          :rules="cityrules"
          required
        />
        <v-text-field
          v-model="refercode"
          class="mb-2"
          label="Parrainage
          (email)"
        />
      </v-container>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :disabled="!valid" class="mr-4" type="submit">
          Enregistrement
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>

  <v-snackbar v-model="isRegistered" close-delay="100" location="top right">
    <p>Vous avez bien été enregistré !</p>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "../../Model/User";
import { Adress } from "../../Model/Adress";
export default defineComponent({
  data: () => ({
    valid: false,
    refercode: "",
    firstname: "",
    firstnamerules: [(v: string) => !!v || "le prénom est requis"],
    lastname: "",
    lastnamerules: [(v: string) => !!v || "le nom est requis"],
    email: "",
    emailrules: [
      (v: string) => /.+@.+\..+/.test(v) || "E-mail doit être valide",
      (v: string) => !!v || "Email est requis",
    ],
    phone: "",
    phonerules: [
      (v: string) => !!v || "Le numéro de téléphone est obligatoire",
    ],
    adressname: "",
    addressnamerules: [(v: string) => !!v || "L adresse est obligatoire"],
    codepostal: "",
    codepostalrules: [
      (v: string) => !!v || "Le code postal est obligatoire",
      (v: string) =>
        /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(v) ||
        "Le code postal n est pas valide",
    ],
    country: "",
    countryrules: [(v: string) => !!v || "Le pays est obligatoire"],
    city: "",
    cityrules: [(v: string) => !!v || "La ville est obligatoire"],
    password: "",
    passwordrules: [(v: string) => !!v || "Le mot de passe est obligatoire"],
    existingUsers: [],
    isRegistered: false,
  }),
  methods: {
    async validate() {
      const { valid } = await (this.$refs.form as HTMLFormElement).validate();

      if (valid) {
        const user = new User(
          "",
          18,
          this.firstname,
          this.lastname,
          this.phone,
          this.email,
          this.password
        );
        const adress = new Adress(
          "",
          this.adressname,
          this.codepostal,
          this.city,
          this.country
        );
        const response = await this.$axios.post(
          `http://${location.hostname}:8080/auth/register`,
          {
            user: user,
            adress: adress,
            sponsor: this.refercode,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        );
        this.isRegistered = true;
        await new Promise((t) => setTimeout(t, 2000));
        this.$router.push("/");
      }
    },
  },
});
</script>

<style>
.cardItem {
  background-color: var(--color-six);
}
</style>
