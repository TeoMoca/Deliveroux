<template>
  <v-card
    id="UserProfileCard"
    class="mx-auto"
    max-width="844"
    title="Mes informations"
  >
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
          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastname"
              class="mb-2"
              label="Nom"
              :rules="lastnamerules"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              class="mb-2"
              type="password"
              label="Mot de passe"
              :rules="passwordrules"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phone"
              class="mb-2"
              label="Numéro de téléphone"
              :rules="phonerules"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              class="mb-2"
              label="Email"
              :rules="emailrules"
              required
            />
          </v-col>
        </v-row>
        <h2 class="TitleProfile">Mon addresse</h2>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="adressname"
              class="mb-2"
              label="Adresse"
              :rules="adressnamerules"
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
              v-model="zipcode"
              class="mb-2"
              label="Code postal"
              :rules="zipcoderules"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="country"
              class="mb-2"
              label="Pays"
              :rules="countryrules"
              required
            />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :disabled="!valid" class="mr-4" type="submit">
          Modifier
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    valid: false,
    firstname: "",
    firstnamerules: [(v: string) => !!v || "Le prénom est requis"],
    lastname: "",
    lastnamerules: [(v: string) => !!v || "Le nom est requis"],
    password: "",
    passwordrules: [(v: string) => !!v || "Le mot de passe est requis"],
    email: "",
    emailrules: [
      (v: string) => !!v || "L'adresse email est requise",
      (v: string) => /.+@.+\..+/.test(v) || "L'adresse email doit être valide",
    ],
    phone: "",
    phonerules: [
      (v: string) => !!v || "Le numéro de téléphone est requis",
      (v: string) =>
        (v && v.length >= 10) ||
        "Le numéro de téléphone doit contenir au moins 10 chiffres",
    ],
    adressname: "",
    adressnamerules: [(v: string) => !!v || "L'adresse est requise"],
    city: "",
    cityrules: [(v: string) => !!v || "La ville est requise"],
    zipcode: "",
    zipcoderules: [
      (v: string) => !!v || "Le code postal est requis",
      (v: string) =>
        (v && v.length >= 5) ||
        "Le code postal doit contenir au moins 5 chiffres",
    ],
    country: "",
    countryrules: [(v: string) => !!v || "Le pays est requis"],
  }),
  name: "UserProfile",
  async created() {
    this.$axios
      .get("http://localhost:8080/user/" + this.$cookies.get("userId"), {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((response) => {
        this.firstname = response.data.firstname;
        this.lastname = response.data.lastname;
        this.password = response.data.password;
        this.email = response.data.mail;
        this.phone = response.data.phone;
        this.adressname = response.data.adressname;
        this.city = response.data.city;
        this.zipcode = response.data.zipcode;
        this.country = response.data.country;
      });
  },
});
</script>

<style scoped>
#UserProfileCard {
  text-align: center;
}

.TitleProfile {
  font-size: 25px;
}
</style>
