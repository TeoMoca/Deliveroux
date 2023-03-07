<template>
  <div>
    <v-container>
      <v-row class="rowItem" v-for="item in items" v-bind:key="item.id">
        <v-col cols="6" md="3">
          <div>
            <v-img class="mx-auto" height="100" :src="item.picture"></v-img>
          </div>
        </v-col>
        <v-col class="rowName" cols="12" md="6">
          <h1>{{ item.name }}</h1>
        </v-col>
        <v-col class="buttonQuantity" cols="6" md="3">
          <v-btn
            icon="mdi-plus"
            color="var(--color-one)"
            @click="($event) => addQuantity(item.id)"
          ></v-btn>
          <div class="quantity">
            {{ item.quantity }}
          </div>
          <v-btn
            icon="mdi-window-minimize"
            color="var(--color-three)"
            @click="removeQuantity(item.id)"
          ></v-btn>
        </v-col>
        <v-divider :thickness="2"></v-divider>
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

<style scoped>
.buttonQuantity {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.quantity {
  font-size: 20px;
  height: 50px;
  width: 50px;
  background-color: var(--color-four);
  border-radius: 50%;
  text-align: center;
  padding: 4.5%;
}
.rowItem {
  padding-bottom: 3%;
}
.rowName {
  display: flex;
  align-items: center;
}
</style>
