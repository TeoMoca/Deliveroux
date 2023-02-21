<template>
  <v-card width="400">
    <v-card-item>
      <v-card-title>Vos Parrainages</v-card-title>
    </v-card-item>

    <v-card-text v-for="refer in refers" v-bind:key="refer">
      {{ refer }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data: () => ({
    refers: [],
  }),
  async created() {
    await this.$axios
      .get(
        "http://localhost:8080/api/users/refers/" + this.$cookies.get("userId"),
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        console.log(rep.data);
        this.refers = rep.data;
      });
  },
});
</script>
