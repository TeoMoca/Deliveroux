<template>
  <div class="home">
    <h1 :style="{ display: 'none' }">Quand on a faim, on y mets les moyens</h1>
    <SliderSection title="NOS RESTAURANTS" :items="restaurants" />
    <SliderSection title="LES MEILLEURS AVIS" :items="upperRates" />
    <SliderSection title="NOS COMPAGNIES" :items="restaurants" />
    <SliderSection title="NOS MENUS" :items="restaurants" />
  </div>
  <!-- <VueTest /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SliderSection from "../components/SliderSection.vue";
// import VueTest from "./VueTest.vue";

export default defineComponent({
  name: "HomeView",
  components: { SliderSection /*VueTest*/ },
  data: (): {
    restaurants: { notes: number }[];
  } => ({
    restaurants: [],
  }),
  created() {
    this.$axios
      .get("http://localhost:8080/restaurants", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
        rep.data.map((restaurant: { notes: number }) => {
          this.restaurants.push(restaurant);
        });
      });
  },
  computed: {
    upperRates() {
      return this.restaurants
        .filter((item) => {
          return item.notes > 15;
        })
        .sort((a, b) => {
          return b.notes - a.notes;
        });
    },
  },
});
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;
  column-gap: 10px;
  margin-top: 130px;
}
</style>
