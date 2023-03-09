<template>
  <v-card
    class="commandTechnical elevation-15"
    :title="'Commande n° ' + command._id"
  >
    <!--DELIVERY VIEW-->
    <div v-if="cardType == 'delivery'">
      <p class="type">Restaurant</p>
      <p class="content">
        {{ restaurant.name }}
      </p>
      <p class="content">
        {{ restaurant.address }}
      </p>
      <p class="type">client</p>
      <p class="content">
        {{
          userAddress.adress +
          ", " +
          userAddress.city +
          ", " +
          userAddress.codePostal +
          ", " +
          userAddress.country
        }}
      </p>
    </div>
    <!--RESTORER VIEW-->
    <div v-if="cardType == 'restorer'">
      <p class="type">Menus</p>
      <p class="content" v-for="menu in command.articles.menus" :key="menu">
        {{ catalog.menusList.find((a) => a._id === menu.id)?.name }}
      </p>
      <p class="type">Articles Seuls</p>
      <p class="content" v-for="item in command.articles.items" :key="item">
        {{ catalog.articlesList.find((a) => a._id === item.id)?.name }}
      </p>
    </div>

    <v-btn
      v-if="enableButton"
      color="success"
      class="button-card me-4 submit"
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
    cardType: String,
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
    userInfos: {
      id: string;
      firstname: string;
      lastname: string;
      phone: string;
    };
    userAddress: {
      adress: string;
      codePostal: string;
      city: string;
      country: string;
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
    restaurant: {
      name: string;
      gps: Array<number>;
      address: string;
    };
  } => ({
    catalog: { menusList: [], articlesList: [] },
    userInfos: { id: "", firstname: "", lastname: "", phone: "" },
    restaurant: { name: "", gps: [], address: "" },
    userAddress: { adress: "", codePostal: "", city: "", country: "" },
  }),

  created() {
    console.log("xxxt", this.$props.command);
    this.$axios
      .get(`http://${location.hostname}:8080/user/` + this.command.customerId, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
        this.userInfos = rep.data;
        this.$axios
          .get(
            `http://${location.hostname}:8080/user/address/` +
              rep.data.addressId,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          )
          .then((addr) => {
            this.userAddress = addr.data;
            console.log("catalog", this.catalog);
          });
      });
    //catalogs_infos---------------------------------------------------------------
    console.log(this.command.restorantId);
    this.$axios
      .get(
        `http://${location.hostname}:8080/catalogs/` + this.command.restorantId,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        this.catalog = rep.data;
        console.log("catalog", this.catalog);
      });

    //restaurant_infos--------------------------------------------------------------------
    this.$axios
      .get(
        `http://${location.hostname}:8080/restaurants/` +
          this.command.restorantId,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        this.restaurant = rep.data;
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
  margin: 0;
  margin-bottom: 10px;
  width: fit-content;
  align-self: center;
}
.content {
  margin-left: 5%;
}
.commandTechnical {
  width: 100%;
  margin-top: 2%;
}
.button-card {
  background-color: var(--color-three) !important;
}
.v-card {
  background: var(--color-six);
  display: flex;
  flex-direction: column;
}

p {
  padding: 5px 10px;
}
</style>
