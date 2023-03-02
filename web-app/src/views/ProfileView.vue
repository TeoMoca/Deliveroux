<template>
  <user-profile />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserProfile from "@/components/UserProfile.vue";

export default defineComponent({
  components: { UserProfile },
});
</script>

<style>
#ProfileCard {
  text-align: center;
  font-size: 30px;
}
.v-card-title {
  font-size: 25px;
}
</style>
