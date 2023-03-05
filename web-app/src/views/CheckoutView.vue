<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <ArticleSummary @parent-event="updateSummary" />
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
  },
  components: { PaymentSummary, ArticleSummary },
});
</script>

<style></style>
