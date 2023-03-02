<template>
  <v-card width="400" :title="userInfos.firstname + ' ' + userInfos.lastname">
    <p v-for="menu in command.articles.menus" :key="menu">{{ menu }}</p>
    <p v-for="item in command.articles.items" :key="item">{{ item }}</p>
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
    command: {
      customerId: String,
      type: Object,
      required: true,
      articles: { menus: Array, items: Array },
    },
    submitLink: String,
    buttonText: String,
  },

  data: (): {
    userInfos: {
      id: string;
      firstname: string;
      lastname: string;
      phone: string;
    };
  } => ({
    userInfos: { id: "", firstname: "", lastname: "", phone: "" },
  }),

  created() {
    this.$axios
      .get("http://localhost:8080/user/" + this.command.customerId, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
        this.userInfos = rep.data;
      });
  },
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
