<template>
  <v-card class="mx-auto" max-width="400" elevation="6">
    <v-img
      class="white--text align-end"
      height="150px"
      v-bind:src="item.picture"
      cover
    >
    </v-img>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-subtitle class="pb-0">
      {{ item.type }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>description:</div>

      <div>{{ item.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text> Commander </v-btn>
      <div class="price">
        {{ parseFloat(item.price).toFixed(2).replace(".", ",") }} €
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ArticleCard",
  props: {
    item: { type: Object, required: true },
  },
  created() {
    console.log(this);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card-actions {
  justify-content: space-between;
}

.v-card {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}
</style>
