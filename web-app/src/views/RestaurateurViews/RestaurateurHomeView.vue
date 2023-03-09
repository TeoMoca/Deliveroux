<template>
  <div class="main" v-if="user.restaurantId != undefined">
    <h1 class="title">Mon restaurant</h1>
    <div class="informations">
      <div class="card">
        <img :src="restaurant.image_link" :alt="restaurant.name" />
        <div>
          <p>Nom de votre restaurant: {{ restaurant.name }}</p>
          <p>Addresse de votre restaurant: {{ restaurant.address }}</p>
          <p>
            Horaires: ouvert de {{ restaurant.opening_time }} à
            {{ restaurant.closing_time }}
          </p>
          <p>Type de votre restaurant: {{ restaurant.type }}</p>
          <p>
            Note de votre restaurant:
            {{ restaurant.rate.reduce((acc, b) => acc + b, 0) }} / 5
          </p>
        </div>
      </div>
    </div>
    <div class="display">
      <h2>Organiser la page de mon restaurant</h2>
      <DraggableList v-if="restaurant._id" :id="restaurant._id" />
      <a class="preview" :href="'/restaurants/' + restaurant._id">
        Voir la fiche de mon restaurant
      </a>
    </div>
    <div class="commands">
      <RestorerCommandDashboard />
    </div>
  </div>
  <div v-else>
    <RestaurantCreation />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DraggableList from "../../components/DraggableList.vue";
import RestaurantCreation from "../../components/RestaurantCreation.vue";
import RestorerCommandDashboard from "@/components/RestorerCommandDashboard.vue";

export default defineComponent({
  name: "RestaurateurHomeView",
  beforeCreate() {
    try {
      this.$axios
        .get(
          `http://${location.hostname}:8080/user/${this.$cookies.get(
            "userId"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then((rep) => {
          this.user = rep.data;
          console.log("WTF", this.user.restaurantId);
          if (this.user.restaurantId !== undefined) {
            this.$axios
              .get(
                `http://${location.hostname}:8080/restaurants/${rep.data.restaurantId}`,
                {
                  headers: {
                    Authorization: `Bearer ${this.$cookies.get("token")}`,
                  },
                }
              )
              .then((rep) => {
                this.restaurant = rep.data;
                console.log(rep.data);
              });
          }
        });
    } catch {
      console.log("error");
    }
  },
  data: (): {
    user: {
      restaurantId: string;
    };
    restaurant: {
      _id: string;
      name: string;
      address: string;
      opening_time: string;
      closing_time: string;
      rate: Array<number>;
      type: string;
      image_link: string;
    };
  } => {
    return {
      user: {
        restaurantId: "",
      },
      restaurant: {
        _id: "",
        name: "",
        address: "",
        opening_time: "",
        closing_time: "",
        rate: [],
        type: "",
        image_link: "",
      },
    };
  },
  components: { DraggableList, RestaurantCreation, RestorerCommandDashboard },
});
</script>

<style scoped>
.main {
  padding: 10px 30px;
  display: grid;
  grid-template-columns: repeat(2, calc((100vw - 60px) / 2));
  grid-template-rows: max-content max-content 1fr;
  grid-template-areas:
    "title title"
    "infos display"
    "commands commands";
  gap: 10px 0;
}

.title {
  grid-area: title;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.display {
  grid-area: display;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
}

.commands {
  grid-area: commands;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.informations {
  grid-area: infos;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.card {
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr;
  width: 100%;
  gap: 20px;
}

img {
  height: 120px;
  width: 120px;
  object-fit: cover;
  object-position: left;
  vertical-align: middle;
}

.preview {
  color: var(--color-two);
}
</style>
