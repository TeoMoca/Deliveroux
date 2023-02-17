<style>
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
</style>

<template>
  <div>
    <h1>Créer votre restaurant</h1>
  </div>

  <v-card class="ma-auto px-4 py-4">
    <v-form ref="form" v-model="valid" lazy-validation>
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
          <input
            type="time"
            v-model="datas.openingTime"
            min="00:00"
            max="23:59"
            required
          />
        </v-col>
        <v-col class="ma-auto">
          <label for="resto">Heure de fermeture</label><br />
          <input
            type="time"
            v-model="datas.closingTime"
            min="00:00"
            max="23:59"
            required
          />
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
            @click="validate, (snackbar = true)"
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

<script>
import axios from "axios";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  data() {
    return {
      valid: true,
      datas: {
        name: "",
        address: "",
        openingTime: "",
        closingTime: "",
        type: "",
        image: "",
      },
      snackbar: false,
      text: `Création de restaurant validée`,
    };
  },
  methods: {
    validate() {
      const { valid } = this.$refs.form.validate();

      if (valid) alert("Le formulaire est valide");

      var postData = {
        name: this.datas.name,
        address: this.datas.address,
        openingTime: this.datas.openingTime,
        closingTime: this.datas.closingTime,
        type: this.datas.type,
        image: this.datas.image,
      };

      axios.post(
        "http://127.0.0.1:8080/restaurants/registerRestaurant",
        postData
      );
    },

    reset() {
      this.$refs.form.reset();
    },
  },
  async created() {
    axios
      .get("http://127.0.0.1:8080/restaurants/displayAllRestaurant/")
      .then((resp) => {
        console.log(resp);
      });
  },
};
</script>
