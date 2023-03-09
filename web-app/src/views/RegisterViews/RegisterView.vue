<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary" direction="vertical">
      <v-tab direction="vertical" value="one">Item One</v-tab>
      <v-tab direction="vertical" value="two">Item Two</v-tab>
      <v-tab direction="vertical" value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one"> One </v-window-item>

        <v-window-item value="two"> Two </v-window-item>

        <v-window-item value="three"> Three </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegisterView",
};
</script>

<style scoped></style>
