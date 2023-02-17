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
    <h1>Modifiez les informations de votre restaurant</h1>
  </div>

  <v-card class="ma-auto px-4 py-4">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="restoData.name"
        label="Nom du restaurant"
        required
      ></v-text-field>

      <v-text-field
        v-model="restoData.address"
        label="Adresse"
        required
      ></v-text-field>

      <v-row>
        <v-col class="ma-auto">
          <label for="resto">Heure d'ouverture</label><br />
          <input
            type="time"
            v-model="restoData.openingTime"
            min="00:00"
            max="23:59"
            required
          />
        </v-col>
        <v-col class="ma-auto">
          <label for="resto">Heure de fermeture</label><br />
          <input
            type="time"
            v-model="restoData.closingTime"
            min="00:00"
            max="23:59"
            required
          />
        </v-col> </v-row
      ><br />

      <v-text-field
        v-model="restoData.type"
        label="Type de restaurant"
        required
      ></v-text-field>

      <v-text-field
        v-model="restoData.image"
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
  </v-card>
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
</template>

<script>
import axios from "axios";
import "@vuepic/vue-datepicker/dist/main.css";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => {
    return {
      valid: true,
      restoData: {},
      oldRestaurant: Object,
      snackbar: false,
      text: `Modification de restaurant réussie`,
    };
  },
  methods: {
    validate() {
      var putData = {
        _id: this.restoData._id,
        name: this.restoData.name,
        address: this.restoData.address,
        openingTime: this.restoData.openingTime,
        closingTime: this.restoData.closingTime,
        type: this.restoData.type,
        image: this.restoData.image,
      };

      axios.put("http://127.0.0.1:8080/restaurants/updateRestaurant", putData);
    },

    reset() {
      this.$refs.form.reset();
    },
  },
  async created() {
    axios
      .get(
        "http://127.0.0.1:8080/restaurants/displayRestaurant/63c8147851cdb28f9f6d46ca",
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
        {}
      )
      .then((resp) => {
        //console.log(resp)
        this.restoData = resp.data;
        console.log("test", this.restoData._id);
      });
  },
});
</script>
