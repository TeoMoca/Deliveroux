<template>
  <div>
    <v-card class="cardSummary" max-width="800">
      <v-card-title id="titleSummary">Résumé de la commande</v-card-title>
      <div id="summary">
        <h4>Articles</h4>
        <v-card-text>{{ subtotal }}</v-card-text>
        <h4>Taxes</h4>
        <v-card-text>{{ tax }}</v-card-text>
        <h4>Total</h4>
        <v-card-text>{{ total }}</v-card-text>
      </div>
      <div class="checkoutContainer">
        <v-btn
          id="buttonCheckout"
          :disabled="isDisabled"
          @click="startCommand"
          color="success"
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
          "http://localhost:8080/commands/send",
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
        "http://localhost:8080/user/" + this.$cookies.get("userId"),
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
        "http://localhost:8080/user/address/" + addressId,
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
        "http://localhost:8080/payments/createPayment",
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
  background-color: #e5e7eb;
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
