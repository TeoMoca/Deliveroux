<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <v-btn class="add-btn" v-bind="props">Ajouter un article/menu</v-btn>
      </template>
      <!-- ------------------------------------ -->
      <v-tabs v-model="tab" fixed-tabs bg-color="indigo-darken-2">
        <v-tab value="item"> item </v-tab>
        <v-tab value="menu" :disabled="itemsList.length === 0"> menu </v-tab>
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
                  v-model="newMenu.articles"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "CreationItemButton",
  data: (): {
    dialog: boolean;
    itemsList: Array<{ _id: string; name: string }>;
    newItem: {
      name: string;
      picture: string;
      description: string;
      type: string;
      price: number;
    };
    newMenu: {
      name: string;
      picture: string;
      description: string;
      price: number;
      articles: Array<string>;
    };
    articleRequestUrl: string;
    menuRequestUrl: string;
    getArticleUrl: string;
    tab: string;
  } => {
    return {
      dialog: false,
      newItem: {
        type: "",
        name: "",
        picture: "",
        description: "",
        price: 1,
      },
      newMenu: {
        name: "",
        picture: "",
        description: "",
        price: 0,
        articles: [],
      },
      itemsList: [],

      articleRequestUrl: `http://${location.hostname}:8080/catalogs/articles/add`,
      menuRequestUrl: `http://${location.hostname}:8080/catalogs/menus/add`,
      getArticleUrl: `http://${location.hostname}:8080/catalogs/articles/`,
      tab: "item",
    };
  },
  props: {
    id: String,
  },
  computed: {},
  methods: {
    articleSubmit: function () {
      axios
        .post(
          this.articleRequestUrl,
          { id_restaurant: this.id, ...this.newItem },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
      this.dialog = false;
    },
    menuSubmit: function () {
      console.log(this.newMenu);
      axios
        .post(
          this.menuRequestUrl,
          { id_restaurant: this.id, ...this.newMenu },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          window.location.reload();
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
    this.$axios
      .get(
        `http://${location.hostname}:8080/catalogs/articles/${this.$props.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        this.itemsList = rep.data;
      });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-btn {
  background: var(--color-three);
  color: var(--color-seven);
}
</style>
