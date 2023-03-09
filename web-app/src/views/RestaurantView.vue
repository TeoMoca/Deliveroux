<template>
  <img :src="restaurant.image_link" class="restaurant-image" />
  <div class="restaurant-container">
    <div class="restaurant-title">
      <p>{{ restaurant.name }}</p>
    </div>
    <div class="stars" :style="{ '--note': restaurant.rate }"></div>

    <div class="items-container">
      <div v-for="item in display" :key="item.componentTitle">
        <ArticleCard @updateBalance="updateBalance" :item="item.data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArticleCard from "../components/ArticleCard.vue";

export default defineComponent({
  name: "RestaurantView",
  data: (): {
    restaurant: {
      image_link: string;
      rate: number;
      name: string;
      _id: string;
    };
    menus: Array<{
      name: string;
    }>;
    articles: Array<{ name: string }>;
    display: Array<{
      componentTitle: string;
      data: { name: string };
    }>;
  } => ({
    restaurant: {
      image_link: "",
      rate: 0,
      _id: "",
      name: "",
    },
    menus: [],
    articles: [],
    display: [],
  }),
  beforeCreate() {
    this.$axios
      .get(
        `http://${location.hostname}:8080/restaurants/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        this.restaurant = rep.data;
        this.$axios
          .get(
            `http://${location.hostname}:8080/catalogs/${this.restaurant._id}`,
            {
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            }
          )
          .then((rep) => {
            console.log("catalog api", rep.data);
            rep.data.menusList?.map((menu: { name: string }) => {
              this.menus.push(menu);
            });
            rep.data.articlesList?.map((menu: { name: string }) => {
              this.articles.push(menu);
            });
          });
      });
    this.$axios
      .get(
        `http://${location.hostname}:8080/restaurants/${this.$route.params.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        console.log(rep.data);
        rep.data.display.map((item: { name: string }) => {
          this.display.push({ componentTitle: "", data: item });
        });
      });
  },
  computed: {},
  methods: {
    updateBalance() {
      this.$emit("updateBalance");
    },
    getComponent(
      componentTitle: string,
      item: { name: string; image_link: string }
    ) {
      switch (componentTitle) {
        case "article": {
          return "<div>article - ${item.name}</div>";
        }
        case "menu": {
          return "<div>menu - ${item.name}</div>";
        }
        case "articles": {
          return "<div>articles - ${item.name}</div>";
        }
        case "menus": {
          return "<div>menus - ${item.name}</div>";
        }
        default: {
          return "${item.name} <img src='${item.image_link}'/>";
        }
      }
    },
  },
  components: { ArticleCard },
});
</script>

<style scoped>
.restaurant-container {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.restaurant-title {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.restaurant-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: flex;
}

.restaurant-title p {
  font-size: 45px;
}

.stars {
  line-height: 1;
}

.stars::before {
  content: "★★★★★";
  letter-spacing: 3px;
  background: linear-gradient(
    90deg,
    #fc0 calc(var(--note) / 5 * 100%),
    grey calc(var(--note) / 5 * 100%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 25px;
}

.items-container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, calc((100% - 2 * 10px) / 4));
  grid-auto-flow: row;
}
</style>
