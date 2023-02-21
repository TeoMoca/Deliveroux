<template>
  <div>Restaurateur Home</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RestaurateurHomeView",
  beforeCreate() {
    this.$axios
      .get("http://localhost:8080/restaurants/displayRestaurant", {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
        console.log(rep.data);
      });
  },
});
</script>

<style></style>
