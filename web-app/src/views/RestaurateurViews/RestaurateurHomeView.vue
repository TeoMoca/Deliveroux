<template>
  <div class="main">
    <h1 class="title">Mon restaurant</h1>
    <div class="display">
      <h2>Organiser la page de mon restaurant</h2>
      <DraggableList v-if="restaurant._id" :id="restaurant._id" />
      <a :href="'/restaurants/' + restaurant._id">
        Voir la fiche de mon restaurant
      </a>
    </div>
    <div class="commands">
      <h2>Commandes à valider</h2>
    </div>
    <div class="informations">
      <p>Nom de votre restaurant: {{ restaurant.name }}</p>
      <p>Addresse de votre restaurant: {{ restaurant.address }}</p>
      <p>
        Horaires: ouvert de {{ restaurant.opening_time }} à
        {{ restaurant.closing_time }}
      </p>
      <p>Type de votre restaurant: {{ restaurant.type }}</p>
      <p>Note de votre restaurant: {{ restaurant.rate }} / 5</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DraggableList from "../../components/DraggableList.vue";

export default defineComponent({
  name: "RestaurateurHomeView",
  beforeCreate() {
    try {
      this.$axios
        .get(`http://localhost:8080/user/${this.$cookies.get("userId")}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((rep) => {
          this.$axios
            .get(
              `http://localhost:8080/restaurants/${
                rep.data.id_restaurant || "63fd2dd8eab9f0d6be1fc12e"
              }`,
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
        });
    } catch {
      console.log("error");
    }
  },
  data: (): {
    restaurant: {
      _id: string;
      name: string;
      address: string;
      opening_time: string;
      closing_time: string;
      rate: number;
      type: string;
    };
  } => {
    return {
      restaurant: {
        _id: "",
        name: "",
        address: "",
        opening_time: "",
        closing_time: "",
        rate: 0,
        type: "",
      },
    };
  },
  components: { DraggableList },
});
</script>

<style scoped>
.main {
  padding: 10px 30px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: max-content max-content 1fr;
  grid-template-areas: "title title" "display commands" "other1 other2";
  gap: 10px;
  height: 100%;
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
}

.commands {
  grid-area: commands;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.informations {
  grid-area: other1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
