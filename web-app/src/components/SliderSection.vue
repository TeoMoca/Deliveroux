<template>
  <div class="section">
    <h2>{{ $props.title }}</h2>
    <div class="slider">
      <a
        class="item"
        v-for="item in $props.items"
        v-bind:key="item"
        :href="'/restaurants/' + item.name"
      >
        <img :src="item.image" />
        <div class="informations">
          <p class="item-title">
            {{ item.name }}
          </p>
          <p>
            {{ item.address }} -
            {{ parseInt((Math.random() * 100).toString()) }} kms
          </p>
        </div>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SliderSection",
  data: () => ({}),
  props: {
    title: String,
    items: Object,
    "max-length": Int16Array,
  },
});
</script>
<style scoped>
.section {
  margin-bottom: 40px;
}
h2 {
  text-align: left;
  line-height: 30px;
  margin-bottom: 20px;
  border-bottom: 3px solid black;
}
.slider {
  display: grid;
  grid-template-columns: repeat(
    v-bind("$props.items?.length"),
    calc((100% - 3 * 10px) / 4)
  );
  width: 100%;
  overflow: auto;
  gap: 10px;
  padding-bottom: 20px;
}

.slider .item {
  display: grid;
  grid-template-rows: 1fr max-content max-content;
  grid-template-columns: 100%;
  max-height: 100%;
  gap: 10px;
  overflow: hidden;
  background: var(--light-mode-color-two);
  border-radius: 20px 20px 10px 10px;
}

.slider .item img {
  height: auto;
  width: 100%;
  max-width: 100%;
  max-height: 150px;
  object-fit: cover;
}

.slider .item .informations {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: left;
}

.slider .item .informations .item-title {
  font-size: 25px;
  text-align: left;
}

@media (max-width: 800px) {
  .slider {
    grid-template-columns: repeat(
      v-bind("$props.items?.length"),
      calc((100% - 10px) / 2)
    );
  }
}
</style>
