<template>
  <CreateRestaurant />
</template>

<script>
import { defineComponent } from "vue";

// Components
import CreateRestaurant from "../components/CreateRestaurant.vue";

export default defineComponent({
  name: "RestaurantCreateView",
  components: {
    CreateRestaurant,
  },
});
</script>
