<template>
  <v-card class="mx-auto" max-width="844" title="Mon Profile">
    <v-form ref="form" class="mb-2" v-model="valid" @submit.prevent="validate">
      <v-container>
        <v-row>
          <v-col cold="12" md="6">
            <v-text-field
              v-model="firstname"
              class="mb-2"
              label="Prénom"
              :rules="firstnamerules"
              required
            >
            </v-text-field>
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
              label="Mot de passe"
              :rules="passwordrules"
              required
            />
          </v-col>
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
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="phone"
              class="mb-2"
              label="Téléphone"
              :rules="phonerules"
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="adressname"
              class="mb-2"
              label="Adresse"
              :rules="addressnamerules"
              required
            />
          </v-col>
        </v-row>
        <v-text-field
          v-model="codepostal"
          class="mb-2"
          label="Code Postal"
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
      </v-container>
      <v-divider></v-divider>
      <v-btn variant="flat" color="error" @click="dialog = true">
        Supprimer votre compte
      </v-btn>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" :disabled="!valid" class="mr-4" type="submit">
          Modifier
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>

  <ReferOne />

  <v-dialog v-model="dialog" width="500">
    <v-card>
      <v-card-title class="text-h5"> Supression de compte </v-card-title>

      <v-card-text> Voulez-vous vraiment supprimer votre compte </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="dialog = false"> Annuler </v-btn>
        <v-btn color="red" text @click="deleteUser"> Supprimer </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar v-model="updated" close-delay="200" location="top right">
    <p>Vos modifications ont été enregistré !</p>
  </v-snackbar>

  <v-snackbar v-model="deleted" close-delay="200" location="top right">
    <p>Votre compte a bien été supprimé !</p>
  </v-snackbar>
</template>

<script lang="ts">
import { Adress } from "../../Model/Adress";
import { defineComponent } from "vue";
import { User } from "../../Model/User";
import ReferOne from "@/components/ReferOne.vue";

export default defineComponent({
  async created() {
    this.$axios
      .get("http://localhost:8080/api/users/" + this.$cookies.get("userId"))
      .then((data) => {
        this.userId = this.$cookies.get("userId") as string;
        this.firstname = data.data.firstname;
        this.roleId = data.data.roleId;
        this.lastname = data.data.lastname;
        this.phone = data.data.phone;
        this.email = data.data.mail;
        this.password = data.data.password;
        this.addressId = data.data.adress[0].Id;
        this.adressname = data.data.adress[0].adress;
        this.codepostal = data.data.adress[0].codePostal;
        this.country = data.data.adress[0].country;
        this.city = data.data.adress[0].city;
      });
    this.$store.commit("addCount");
    console.log(this.$store.getters.getCount);
    const a = this.$store.getters.getCart;
    console.log(a[0]);
  },
  data: () => ({
    userId: "",
    valid: false,
    updated: false,
    firstname: "",
    roleId: "0",
    addressId: "",
    firstnamerules: [(v: string) => !!v || "le prénom est requis"],
    lastname: "",
    lastnamerules: [(v: string) => !!v || "le nom est requis"],
    password: "",
    passwordrules: [(v: string) => !!v || "Le mot de passe est obligatoire"],
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
    dialog: false,
    deleted: false,
  }),
  methods: {
    async deleteUser() {
      await this.$axios
        .delete(
          "http://localhost:8080/api/users/" + this.$cookies.get("userId")
        )
        .then(async (rep) => {
          console.log(rep.data);
          if (rep.data) {
            this.dialog = false;
            this.deleted = true;
            await new Promise((t) => setTimeout(t, 2000));
            this.$cookies.remove("token");
            this.$cookies.remove("firstname");
            this.$cookies.remove("lastname");
            this.$router.push({ path: "/" });
          }
        });
    },
    async validate() {
      const { valid } = await (this.$refs.form as HTMLFormElement).validate();
      if (valid) {
        console.log(this.$cookies.get("userId"));
        const user = new User(
          this.userId,
          0,
          this.firstname,
          this.lastname,
          this.phone,
          this.email,
          this.password
        );
        const adress = new Adress(
          this.addressId,
          this.adressname,
          this.codepostal,
          this.city,
          this.country
        );
        const isUpdated = (await this.$axios.patch(
          "http://localhost:8080/api/users",
          { users: user, adress: adress }
        )) as boolean;
        this.updated = isUpdated;
      }
    },
  },
  components: { ReferOne },
});
</script>
