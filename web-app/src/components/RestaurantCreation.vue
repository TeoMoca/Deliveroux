<template>
  <div>
    <h1>Créer votre restaurant</h1>
  </div>
  <v-card class="ma-auto px-4 py-4">
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="validate"
    >
      <v-text-field
        v-model="datas.name"
        label="Nom du restaurant"
        required
      ></v-text-field>

      <v-text-field
        v-model="datas.address"
        label="Adresse"
        required
      ></v-text-field>

      <v-row>
        <v-col class="ma-auto">
          <label for="resto">Heure d'ouverture</label><br />
          <v-text-field
            label="Label Text"
            v-model="datas.openingTime"
            type="time"
          ></v-text-field>
        </v-col>
        <v-col class="ma-auto">
          <label for="resto">Heure de fermeture</label><br />
          <v-text-field
            label="Label Text"
            v-model="datas.closingTime"
            type="time"
          ></v-text-field>
        </v-col> </v-row
      ><br />

      <v-text-field
        v-model="datas.type"
        label="Type de restaurant"
        required
      ></v-text-field>

      <v-text-field
        v-model="datas.image"
        label="Lien de l'image"
        required
      ></v-text-field>

      <v-row>
        <v-col class="ma-auto" style="text-align: center">
          <v-btn
            color="success"
            class="mr-4"
            type="submit"
            style="width: 150px"
          >
            Valider
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset" style="width: 150px">
            Réinitialiser
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}

        <template v-slot:actions>
          <v-btn color="pink" variant="text" @click="snackbar = false">
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "RestaurantCreation",
  data: (): {
    dialog: boolean;
    valid: boolean;
    datas: {
      name: string;
      gps: number[];
      address: string;
      openingTime: string;
      closingTime: string;
      type: string;
      image: string;
    };
    snackbar: boolean;
    text: string;
  } => {
    return {
      dialog: false,
      valid: true,
      datas: {
        name: "",
        gps: [],
        address: "",
        openingTime: "10:00:00",
        closingTime: "23:00:00",
        type: "",
        image: "",
      },
      snackbar: false,
      text: `Création de restaurant validée`,
    };
  },
  methods: {
    validate() {
      console.log("aaaaaaaaaaah", this.datas);
      var postData = {
        name: this.datas.name,
        gps: [0, 0],
        address: this.datas.address,
        opening_time: this.datas.openingTime,
        closing_time: this.datas.closingTime,
        type: this.datas.type,
        image_link: this.datas.image,
      };

      axios
        .post("http://127.0.0.1:8080/restaurants/", postData, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((rep) => {
          this.$axios.patch(
            "http://127.0.0.1:8080/user/restaurant/",
            {
              id: this.$cookies.get("userId"),
              restaurantId: rep.data.restorantid,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          );
        });
      this.snackbar = true;
      window.location.reload();
    },

    reset() {
      let formulaire = this.$refs.form as any;
      formulaire.reset();
    },
  },
  //created() {},
});
</script>

<style scoped></style>
