<template>
  <UpdateRestaurant />
</template>

<script>
import { defineComponent } from "vue";

// Components
import UpdateRestaurant from "../components/UpdateRestaurant.vue";

export default defineComponent({
  name: "UpdateRestaurantView",
  components: {
    UpdateRestaurant,
  },
});
</script>
