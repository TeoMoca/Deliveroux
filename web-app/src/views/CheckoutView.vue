<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1 v-if="isVoid">Vous n'avez pas d'articles !</h1>
          <ArticleSummary v-if="!isVoid" @parent-event="updateSummary" />
        </v-col>
        <v-col>
          <PaymentSummary ref="PaymentRef" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Item } from "../../Model/Item";
import { defineComponent } from "vue";
import PaymentSummary from "@/components/PaymentSummary.vue";
import ArticleSummary from "@/components/ArticleSummary.vue";
export default defineComponent({
  data: () => ({
    items: [] as Item[],
    subtotal: 0,
    tax: 0,
    total: 0,
    isVoid: false,
  }),
  methods: {
    updateSummary() {
      let a = this.$refs.PaymentRef as any;
      a.updateSummaryBill();
    },
  },
  mounted() {
    const storeItems = this.$store.getters.getCart as Item[];
    this.items = storeItems;
    console.log(this.items.length);
    this.subtotal = this.$store.getters.getSubCartTotal;
    this.tax = this.$store.getters.getTax;
    this.total = this.$store.getters.cartTotal;
    let paymentRef = this.$refs.PaymentRef as any;
    if (paymentRef.total > 0) this.isVoid = false;
    else this.isVoid = true;
  },
  components: { PaymentSummary, ArticleSummary },
});
</script>

<style></style>
