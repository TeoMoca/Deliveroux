<template>
  <v-container>
    <v-row>
      <v-col>
        <user-profile />
      </v-col>
      <v-col>
        <v-row>
          <v-col>
            <HistoryCommandUser />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <UserBalance />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserProfile from "@/components/UserProfile.vue";
import HistoryCommandUser from "@/components/UserProfile/HistoryCommandUser.vue";
import UserBalance from "@/components/UserProfile/UserBalance.vue";

export default defineComponent({
  components: { UserProfile, HistoryCommandUser, UserBalance },
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
