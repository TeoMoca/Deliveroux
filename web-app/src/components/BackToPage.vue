<template>
  <button class="back-to-last-page" @click="goToLastPage">
    <v-icon color="white">mdi-arrow-left</v-icon>
    Back
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BackToPage",

  methods: {
    goToLastPage() {
      this.$router.go(-1);
    },
  },
});
</script>

<style>
.back-to-last-page {
  padding: 10px 30px;
  position: fixed;
  background: orange;
  border-radius: 20px;
  margin: 10px;
  top: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 200;
}
</style>
