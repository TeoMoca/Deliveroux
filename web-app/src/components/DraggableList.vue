<template>
  <div class="dragger">
    <div
      class="drop-zone"
      @drop="onDrop($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <div class="drag-el" white-bg v-for="item in listOne" :key="item.name">
        <p>{{ item.name }}</p>
        <p @click="removeFromList(item._id)" class="remove">x</p>
      </div>
    </div>
    <div class="drop-zone" @dragover.prevent @dragenter.prevent>
      <div
        class="drag-el"
        white-bg
        v-for="item in filteredList"
        :key="item.name"
        draggable="true"
        @dragstart="startDrag($event, item)"
      >
        {{ item.name }}
      </div>
      <div class="add-btn">
        <CreationItemButton v-if="id" :id="id" />
      </div>
    </div>
  </div>
  <button @click="sendData">Valider</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CreationItemButton from "../components/CreationItemButton.vue";

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
      .get(`http://${location.hostname}:8080/restaurants/${this.$props.id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
        console.log(rep.data.display);
        rep.data.display.map(
          (item: { _id: string; name: string; list: number }) => {
            this.listOne.push(item);
          }
        );
      });

    this.$axios
      .get(`http://${location.hostname}:8080/catalogs/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get("token")}`,
        },
      })
      .then((rep) => {
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
        .get(`http://${location.hostname}:8080/restaurants/${this.$props.id}`, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        })
        .then((rep) => {
          rep.data.display = Object.values(this.listOne);
          this.$axios
            .put(
              `http://${location.hostname}:8080/restaurants/modify`,
              rep.data,
              {
                headers: {
                  Authorization: `Bearer ${this.$cookies.get("token")}`,
                },
              }
            )
            .then((rep) => {
              console.log(rep.data);
            });
        });
    },
  },
  components: { CreationItemButton },
});
</script>

<style scoped>
.dragger {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  height: 100%;
}

.drop-zone {
  background-color: var(--color-four);
  margin-bottom: 10px;
  padding: 10px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  max-height: 160px;
  min-height: 160px;
  overflow: auto;
  position: relative;
}
.drag-el {
  margin-bottom: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drag-el[draggable] {
  cursor: grab;
}

.drag-el:not([draggable]) {
  margin-bottom: 10px;
  padding: 5px 50px;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr max-content;
}

.remove {
  cursor: pointer;
  padding: 0 10px;
  font-weight: 800;
  font-size: 20px;
}

button {
  background: var(--color-three) !important;
  display: flex;
  width: fit-content;
  padding: 5px 20px;
  border-radius: 10px;
  align-self: center;
}

.white-bg {
  background-color: var(--color-two);
}

.add-btn {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: var(--color-four);
}
</style>
