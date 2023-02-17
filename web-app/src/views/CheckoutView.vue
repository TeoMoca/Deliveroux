<template>
  <div>
    <h1>Votre commande</h1>
    <div v-if="items.length > 0" class="">
      <div class="container1">
        <div v-for="item in items" v-bind:key="item.id" class="py-6 flex gap-4">
          <img class="w-32 bg-beige rounded-md" :src="item.picture" />
          <div class="flex justify-between w-full">
            <div class="w-9">
              <div>{{ item.name }}</div>
              <div class="text-sm">${{ item.price / 100 }}</div>
            </div>
            <div>
              <select
                class="bg-white border border-gray-300 rounded px-2 py-1"
                v-model.number="item.quantity"
              >
                <option
                  v-for="i in item.quantity > 10 ? item.quantity : 10"
                  v-bind:key="i"
                >
                  {{ i }}
                </option>
              </select>
            </div>

            <div>
              <XMarkIcon
                class="w-5 h-5 text-gray-500 hover:text-black cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <h3 class="text-lg">Résumé de la commande</h3>

        <div class="divide-y divide-gray-300">
          <div class="py-3 flex justify-between">
            <div>Articles</div>
            <div>${{ subtotal / 100 }}</div>
          </div>
          <div class="py-3 flex justify-between">
            <div>Tax</div>
            <div>${{ (tax / 100).toFixed(2) }}</div>
          </div>

          <div class="py-3 flex justify-between font-bold">
            <div>Commande Total</div>
            <div>${{ (total / 100).toFixed(2) }}</div>
          </div>
        </div>

        <button
          class="flex justify-center bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-500 text-white rounded-md p-3 w-full"
        >
          Payer
        </button>
      </div>
    </div>

    <div v-else class="mt-10">Vous n'avez rien ajouté !</div>
  </div>
</template>

<script lang="ts">
import { Item } from "../../Model/Item";
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    items: [] as Item[],
    subtotal: 0,
    tax: 0,
    total: 0,
  }),
  mounted() {
    const storeItems = this.$store.getters.getCart as Item[];
    this.items = storeItems;
    console.log(this.items.length);
    this.subtotal = this.$store.getters.getSubCartTotal;
    this.tax = this.$store.getters.getTax;
    this.total = this.$store.getters.cartTotal;
  },
});
</script>

<style>
.container {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  line-height: inherit;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-radius: 0.375rem;
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
  padding: 1.5rem;
  width: 33.333333%;
}

.container1 {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-feature-settings: normal;
  line-height: inherit;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  width: 66.666667%;
}
</style>
