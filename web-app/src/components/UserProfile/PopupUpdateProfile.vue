<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="900">
      <v-card>
        <v-form
          ref="form"
          class="mb-2"
          v-model="valid"
          @submit.prevent="validate"
        >
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
            <v-btn
              color="error"
              class="mr-4"
              type="button"
              @click="dialog = false"
              >Annuler</v-btn
            >
            <v-spacer></v-spacer>
            <v-btn color="success" :disabled="valid" class="mr-4" type="submit">
              Valider
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "../../../Model/User";
import { Adress } from "../../../Model/Adress";

export default defineComponent({
  data: () => ({
    dialog: false,
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
  name: "PopupUpdateProfile",
  methods: {
    async openPopup() {
      this.dialog = true;
      await this.setData();
    },

    async setData() {
      var adressId = "";
      this.$axios
        .get("http://localhost:8080/user/" + this.$cookies.get("userId"), {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.firstname = response.data.firstname;
          this.lastname = response.data.lastname;
          this.password = response.data.password;
          this.email = response.data.mail;
          this.phone = response.data.phone;
          adressId = response.data.addressId;
          this.$axios
            .get("http://localhost:8080/user/address/" + adressId, {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            })
            .then((response) => {
              console.log(response.data);
              this.adressname = response.data.adress;
              this.city = response.data.city;
              this.zipcode = response.data.codePostal;
              this.country = response.data.country;
            });
        });
    },

    async validate() {
      const { valid } = await (this.$refs.form as HTMLFormElement).validate();

      if (valid) {
        const user = new User(
          "",
          0,
          this.firstname,
          this.lastname,
          this.phone,
          this.email,
          this.password
        );
        const address = new Adress(
          "",
          this.adressname,
          this.zipcode,
          this.city,
          this.country
        );
        this.$axios.patch(
          "http://localhost:8080/user/" + this.$cookies.get("userId"),
          { user, address },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        );
        this.$emit("updateProfile");
        this.dialog = false;
      }
    },
  },
});
</script>

<style scoped></style>
