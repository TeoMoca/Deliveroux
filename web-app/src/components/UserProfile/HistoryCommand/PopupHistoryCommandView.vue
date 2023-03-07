<template>
  <div class="text-center">
    <v-dialog v-model="dialog" max-width="900">
      <v-card class="scroll">
        <v-card-title>Commande n° {{ commandId }}</v-card-title>
        <v-container class="text-center">
          <v-row>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="commandPrice"
                class="mb-2"
                prefix="€"
                disabled
                label="prix de la commande"
              />
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="commandDate"
                class="mb-2 text-center"
                disabled
                label="date de la commande"
              />
            </v-col>
          </v-row>
          <h2>Adresse de Livraison</h2>
          <v-row>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="commandZipCode"
                class="mb-2"
                disabled
                label="Code postal"
              />
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="commandCity"
                class="mb-2"
                disabled
                label="Ville"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              v-model="commandAdress"
              class="mb-2"
              disabled
              label="Adresse"
            >
            </v-text-field>
          </v-row>
          <h2>Mes Articles</h2>
          <div class="articles" v-for="item in commandArticles" :key="item.id">
            <v-row>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="item.name"
                  class="mb-2"
                  disabled
                  label="Nom de l'article"
                />
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="item.price"
                  prefix="€"
                  class="mb-2"
                  disabled
                  label="Prix de l'article"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="item.quantity"
                  class="mb-2"
                  disabled
                  label="Quantité"
                />
              </v-col>
              <v-col cols="6" md="6">
                <v-text-field
                  v-model="item.type"
                  class="mb-2"
                  disabled
                  label="Type"
                />
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PopupHistoryCommandView",
  data: () => ({
    dialog: false,
    commandId: "",
    commandDate: "",
    commandAdress: "",
    commandCity: "",
    commandZipCode: "",
    commandCountry: "",
    commandPrice: "",
    commandArticles: [],
  }),
  created() {
    this.commandId = this.command.commandNumber;
    this.commandPrice = this.command.commandPrice;
    this.commandDate = this.command.commandDate;
    this.commandAdress = this.command.commandAdress;
    this.commandCity = this.command.commandCity;
    this.commandZipCode = this.command.commandZipCode;
    this.commandCountry = this.command.commandCountry;
    this.commandArticles = this.command.commandArticles;
  },
  methods: {
    openPopupHistoryCommandView() {
      this.dialog = true;
    },
  },
  props: {
    command: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
.scroll {
  overflow-y: auto;
}

.articles {
  padding-top: 5%;
}
</style>
