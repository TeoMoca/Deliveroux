<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Ajouter un article/menu </v-btn>
      </template>
      <!-- ------------------------------------ -->
      <v-tabs v-model="tab" fixed-tabs bg-color="indigo-darken-2">
        <v-tab value="item"> item </v-tab>
        <v-tab value="menu"> menu </v-tab>
      </v-tabs>
      <!-- ------------------------------------ -->
      <v-card v-if="tab == 'item'">
        <v-card-title>
          <span class="text-h5">Add an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newItem.name"
                  label="nom de l'item*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newItem.picture"
                  label="Lien de la photo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newItem.description"
                  label="description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="newItem.type"
                  :items="['plat', 'boisson', 'dessert']"
                  label="Type*"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newItem.price"
                  label="price*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="articleSubmit()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- -------------------------------------------------------------------------------------------------------- -->
      <v-card v-if="tab == 'menu'">
        <v-card-title>
          <span class="text-h5">Add an Item</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newMenu.name"
                  label="nom de l'item*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newMenu.picture"
                  label="Lien de la photo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="newMenu.description"
                  label="description"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="newMenu.price"
                  label="price*"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="newMenu.items"
                  :items="itemsList"
                  item-title="name"
                  item-value="_id"
                  chips
                  label="Articles dans le menu*"
                  multiple
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="menuSubmit()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CreationItemButton",
  data: function (): {
    dialog: boolean;
    itemsList: Array<{ _id: string; name: string }>;
    newItem: {
      id_restaurant: string;
      name: string;
      picture: string;
      description: string;
      type: string;
      price: number;
    };
    newMenu: {
      id_restaurant: string;
      name: string;
      picture: string;
      description: string;
      price: number;
      items: Array<string>;
    };
    articleRequestUrl: string;
    menuRequestUrl: string;
    getArticleUrl: string;
    tab: string;
  } {
    return {
      dialog: false,
      newItem: {
        id_restaurant: "",
        type: "",
        name: "",
        picture: "",
        description: "",
        price: 1,
      },
      newMenu: {
        id_restaurant: "",
        name: "",
        picture: "",
        description: "",
        price: 0,
        items: [],
      },
      itemsList: [],

      articleRequestUrl: "http://127.0.0.1:8080/articles/add",
      menuRequestUrl: "http://127.0.0.1:8080/menus/add",
      getArticleUrl: "http://127.0.0.1:8080/articles/",
      tab: "item",
    };
  },

  props: {
    restaurant_id: { type: String, required: true },
  },
  computed: {},
  methods: {
    articleSubmit: function () {
      console.log(this.newItem);
      axios
        .post(this.articleRequestUrl, this.newItem)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialog = false;
    },
    menuSubmit: function () {
      console.log(this.newMenu);
      axios
        .post(this.menuRequestUrl, this.newMenu)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialog = false;
    },
    getItemNameList: function () {
      var list: Array<string> = [];
      this.itemsList.map((item) => {
        list.push(item.name);
      });
      return list;
    },
  },
  created() {
    this.newItem.id_restaurant = this.restaurant_id;
    this.newMenu.id_restaurant = this.restaurant_id;
    fetch(this.getArticleUrl + this.restaurant_id, { method: "GET" }).then(
      (rep) => {
        rep.json().then((data) => {
          this.itemsList = data;
          console.log(this.itemsList);
        });
      }
    );
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
