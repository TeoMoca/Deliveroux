<template>
  <div>
    <v-card class="cardSummary" max-width="500">
      <v-card-title id="titleSummary">Résumé de la commande</v-card-title>
      <div id="summary">
        <div class="articles">
          <div>
            <h2>Articles</h2>
          </div>
          <div class="price">
            <h3>{{ subtotal.toFixed(2) }} €</h3>
          </div>
        </div>
        <v-divider
          :thickness="2"
          class="border-opacity-100"
          color="white"
        ></v-divider>
        <div class="articles">
          <div>
            <h2>Taxes</h2>
          </div>
          <div class="price">
            <h3>{{ tax.toFixed(2) }} €</h3>
          </div>
        </div>
        <v-divider
          :thickness="2"
          class="border-opacity-100"
          color="white"
        ></v-divider>
        <div class="articles">
          <div>
            <h2>Total</h2>
          </div>
          <div class="price">
            <h3>{{ total.toFixed(2) }} €</h3>
          </div>
        </div>
      </div>
      <div class="checkoutContainer">
        <v-btn
          id="buttonCheckout"
          :disabled="isDisabled"
          @click="startCommand"
          color="var(--color-one)"
          >Payer la commande</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    subtotal: 0,
    tax: 0,
    total: 0,
    isDisabled: true,
  }),
  methods: {
    updateSummaryBill() {
      this.subtotal = this.$store.getters.getSubCartTotal;
      this.tax = this.$store.getters.getTax;
      this.total = this.$store.getters.cartTotal;
      if (this.total > 0) this.isDisabled = false;
      else this.isDisabled = true;
    },
    async startCommand() {
      const restaurantIds = this.$store.getters.getAllRestaurantId;
      const user = await this.getUserInformation();
      const adress = await this.getAdressUserById(user.data.addressId);

      for (const restaurantId of restaurantIds) {
        const articles = this.getArticleByRestaurantId(restaurantId);
        console.log(adress);
        const commandId = await this.$axios.post(
          `http://${location.hostname}:8080/commands/send`,
          {
            customerId: user.data.id,
            restorantId: restaurantId,
            date: new Date().toDateString(),
            articles: { items: articles },
            price: this.getTotalBillByRestaurantId(restaurantId),
            adress: adress.data.adress,
            city: adress.data.city,
            codePostal: adress.data.codePostal,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        );
        this.$store.commit("setNewCommand", commandId.data.commandid);
      }
      await this.CreateCheckoutSession(user);
    },
    async getUserInformation() {
      const user = await this.$axios.get(
        `http://${location.hostname}:8080/user/` + this.$cookies.get("userId"),
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      );

      return user;
    },
    async getAdressUserById(addressId) {
      const user = await this.$axios.get(
        `http://${location.hostname}:8080/user/address/` + addressId,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      );

      return user;
    },
    async CreateCheckoutSession(user) {
      const session = await this.$axios.post(
        `http://${location.hostname}:8080/payments/createPayment`,
        {
          userStripeId: user.data.stripeId,
          userId: user.data.id,
          items: this.$store.getters.getCart,
        },
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      );

      window.location.href = session.data.url;
    },
    getArticleByRestaurantId(restaurantId) {
      const articles = this.$store.getters.getCart;
      const articlesByRestaurant = articles.filter(
        (article) => article.id_restaurant === restaurantId
      );
      return articlesByRestaurant;
    },
    getTotalBillByRestaurantId(restaurantId) {
      const articles = this.$store.getters.getCart;
      const articlesByRestaurant = articles.filter(
        (article) => article.id_restaurant === restaurantId
      );
      let total = 0;
      for (const article of articlesByRestaurant) {
        total += article.price * article.quantity;
      }
      return total + total * 0.1;
    },
  },
  mounted() {
    this.subtotal = this.$store.getters.getSubCartTotal;
    this.tax = this.$store.getters.getTax;
    this.total = this.$store.getters.cartTotal;
    if (this.total > 0) this.isDisabled = false;
  },
  name: "PaymentSummary",
});
</script>

<style scoped>
.cardSummary {
  background-color: var(--color-four);
}
.articles {
  padding: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.taxes {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.price {
  padding-right: 3%;
}
.total {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.checkoutContainer {
  display: flex;
  justify-content: center;
  padding-bottom: 5%;
}
#titleSummary {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
}
#buttonCheckout {
  margin: auto;
}
</style>
