<template>
  <div class="articleSummary">
    <v-container>
      <v-row>
        <v-col v-for="item in items" v-bind:key="item.id">
          <div>
            <v-img class="mx-auto" :src="item.picture"></v-img>
            <div>{{ item.name }}</div>
            <div>
              <v-text-field
                class="pa-4 secondary text-no-wrap rounded-pill"
                v-model="item.quantity"
                readonly
              />
              <v-btn
                icon="mdi-plus"
                color="primary"
                @click="($event) => addQuantity(item.id)"
              >
              </v-btn>
              <v-btn
                icon="mdi-window-minimize"
                color="error"
                @click="removeQuantity(item.id)"
              ></v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Item } from "../../Model/Item";
import { Articles } from "../../Model/Articles";
import { Menu } from "../../Model/Menu";
export default defineComponent({
  data: () => ({
    items: [] as Item[],
    menus: [] as Menu[],
  }),
  mounted() {
    const storeItems = this.$store.getters.getCart;
    this.items = storeItems;
    console.log(this.items);
    this.menus = storeItems.menus;
  },
  name: "ArticleSummary",
  methods: {
    addQuantity(objectid: string) {
      this.$store.commit("addQuantity", objectid);
      this.updateSummaryBill();
    },
    removeQuantity(objectid) {
      this.$store.commit("removeQuantity", objectid);
      const storeItems = this.$store.getters.getCart;
      this.items = storeItems;
      console.log(this.items);
      this.menus = storeItems.menus;
      this.updateSummaryBill();
    },
    updateSummaryBill() {
      this.$emit("parent-event");
      console.log("pk");
    },
  },
});
</script>

<style scoped></style>
