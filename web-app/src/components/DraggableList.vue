<template>
  <div class="dragger">
    <div
      class="drop-zone"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        class="drag-el"
        v-for="item in listOne"
        :key="item.name"
        @click="removeFromList(item._id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="drop-zone" @dragover.prevent @dragenter.prevent>
      <div
        class="drag-el"
        v-for="item in filteredList"
        :key="item.name"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.name }}
      </div>
      <div class="drag-el">+</div>
    </div>
  </div>
  <button @click="sendData">Valider</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DraggableList",
  data: (): {
    listOne: Array<{ _id: string; name: string; list: number }>;
    listTwo: Array<{ _id: string; name: string; list: number }>;
  } => {
    return {
      listOne: [],
      listTwo: [],
    };
  },
  props: {
    id: String,
  },
  created() {
    this.$axios
      .get(
        `http://localhost:8080/restaurants/displayRestaurant/${this.$props.id}`
      )
      .then((rep) => {
        console.log(rep.data.display);
        rep.data.display.map(
          (item: { _id: string; name: string; list: number }) => {
            this.listOne.push(item);
          }
        );
      });

    console.log("props id", this.id, this.$props);
    this.$axios.get(`http://localhost:8080/catalog/${this.id}`).then((rep) => {
      console.log("draggableLIst", rep.data, Array.apply(rep.data));
      Object.values<Array<{ _id: string; name: string; list: number }>>(
        rep.data
      ).map((list: Array<{ _id: string; name: string; list: number }>) => {
        list.map((item) => {
          this.listTwo.push(item);
        });
      });
    });
  },
  computed: {
    filteredList() {
      return this.listTwo.filter((e) => {
        return !this.listOne.find((item) => item._id == e._id);
      });
    },
  },
  methods: {
    startDrag(evt, item) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("itemID", item._id);
    },
    onDrop(evt) {
      const itemID = evt.dataTransfer.getData("itemID");
      console.log(itemID);
      const item = this.listTwo.find((item) => item._id == itemID);
      console.log(this.listOne.find((item) => item._id == itemID));
      if (item && !this.listOne.find((item) => item._id == itemID)) {
        this.listOne.push(item);
      }

      console.log("lists", this.listOne, this.listTwo);
    },
    removeFromList(id) {
      const index = this.listOne.findIndex((item) => item._id == id);
      this.listOne.splice(index, 1);
    },
    sendData() {
      this.$axios
        .get(
          `http://localhost:8080/restaurants/displayRestaurant/${this.$props.id}`
        )
        .then((rep) => {
          console.log(rep.data);
          rep.data.display = Object.values(this.listOne);
          console.log(rep.data);
          this.$axios
            .put("http://localhost:8080/restaurants/modify", rep.data)
            .then((rep) => {
              console.log(rep.data);
            });
        });
    },
  },
});
</script>

<style>
.dragger {
  display: grid;
  grid-template-columns: 200px 200px;
  gap: 10px;
}

.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drag-el[draggable] {
  cursor: grab;
}
</style>
