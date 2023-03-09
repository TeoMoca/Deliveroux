<template>
  <div class="itemsBox">
    <ArticleCard v-for="item in dataList" :key="item.id" :item="item" />
    <CreationItemButton restaurant_id="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticleCard from "../components/ArticleCard.vue";
import CreationItemButton from "../components/CreationItemButton.vue";

export default defineComponent({
  name: "VueTest",
  composant: { ArticleCard, CreationItemButton },
  data: (): {
    requestUrl: string;
    dataList: Array<{
      id: string;
    }>;
  } => ({
    requestUrl: `http://${location.hostname}:8080/menus/1`,
    dataList: [],
  }),
  methods: {},
  created() {
    fetch(this.requestUrl, { method: "GET" }).then((rep) => {
      console.log("requrl", this.requestUrl);
      rep.json().then((data) => {
        this.dataList = data;
      });
    });
  },
  components: { ArticleCard, CreationItemButton },
});
</script>

<style scoped>
ArticleCard {
  width: 100%;
  display: flex;
}

.itemsBox {
  display: grid;
  grid-template-columns: repeat(v-bind("dataList.length"), 400px);
  overflow: auto;
  width: 100%;
  gap: 10px;
  padding: 10px 0;
}
</style>
