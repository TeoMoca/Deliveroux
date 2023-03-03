<template>
  <v-card
    class="commandTechnical elevation-15"
    width="400"
    :title="userInfos.firstname + ' ' + userInfos.lastname"
  >
    <p class="type">Menus</p>
    <p class="content" v-for="menu in command.articles.menus" :key="menu">
      {{ catalog.menusList.find((a) => a._id == menu)?.name }}
    </p>
    <p class="type">Articles Seuls</p>
    <p class="content" v-for="item in command.articles.items" :key="item">
      {{ catalog.articlesList.find((a) => a._id == item)?.name }}
    </p>
    <v-btn
      v-if="enableButton"
      color="success"
      class="me-4 submit"
      @click="validate"
    >
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
      restorantId: String,
      customerId: String,
      type: Object,
      required: true,
      articles: { menus: Array, items: Array },
    },
    submitLink: {
      type: String,
      required: false,
    },
    enableButton: Boolean,
    buttonText: {
      type: String,
      required: false,
    },
  },

  data: (): {
    idRestaurant: string;
    userInfos: {
      id: string;
      firstname: string;
      lastname: string;
      phone: string;
    };
    catalog: {
      menusList: {
        _id: string;
        name: string;
        type: string;
      }[];
      articlesList: {
        _id: string;
        name: string;
        type: string;
      }[];
    };
  } => ({
    idRestaurant: "",
    catalog: { menusList: [], articlesList: [] },
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
    //---------------------------------------------------------------
    console.log(this.command.restorantId);
    this.$axios
      .get("http://localhost:8080/catalogs/" + this.command.restorantId, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
        this.catalog = rep.data;
        console.log("catalog", this.catalog);
      });
  },
  methods: {
    validate() {
      //request
      this.$axios
        .patch(
          "" + this.$props.submitLink,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then(() => {
          location.reload();
        });
    },
  },
});
</script>

<style scoped>
.type {
  text-decoration: underline;
}
.submit {
  margin-left: 15%;
}
.content {
  margin-left: 5%;
}
.commandTechnical {
  margin-top: 2%;
}
</style>
