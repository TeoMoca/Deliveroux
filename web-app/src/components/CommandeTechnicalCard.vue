<template>
  <v-card width="400" :title="nom_user">
    <p v-for="menu in command.articles.menus">{{ menu }}</p>
    <p v-for="item in command.articles.items">{{ item }}</p>
    <v-btn color="success" class="me-4" @click="validate">
      {{ buttonText }}
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommandeTechnicalCard",
  props: {
    nom_user: String,
    command: {
      type: Object,
      required: true,
      articles: { menus: Array, items: Array },
    },
    submitLink: String,
    buttonText: String,
  },

  data: (): {} => ({}),

  created() {},
  methods: {
    validate() {
      //request
      this.$axios.get("" + this.$props.submitLink, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      });
    },
  },
});
</script>
