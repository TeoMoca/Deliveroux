<template>
  <div id="container">
    <div class="commandNumber">
      <h3>Commande n°: {{ this.commands.commandNumber }}</h3>
    </div>
    <div class="commandPrice">
      <div class="price">
        <h3>{{ this.commands.commandPrice }} €</h3>
      </div>
      <div class="iconHistory" @click="openPopupHistoryCommandView">
        <v-icon
          color="success"
          icon="mdi mdi-eye-outline"
          size="large"
        ></v-icon>
      </div>
    </div>
  </div>
  <PopupHistoryCommandView ref="popupHistoryCommand" :command="commands" />
</template>

<script>
import { defineComponent } from "vue";
import PopupHistoryCommandView from "@/components/UserProfile/HistoryCommand/PopupHistoryCommandView.vue";
export default defineComponent({
  name: "HistoryCommand",
  methods: {
    openPopupHistoryCommandView() {
      let popup = this.$refs.popupHistoryCommand;
      popup.openPopupHistoryCommandView();
    },
  },
  components: { PopupHistoryCommandView },
  props: {
    commands: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.commandNumber {
  padding: 3%;
}

.commandPrice {
  padding: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.price {
  width: 100px;
}

.iconHistory {
  padding-left: 3%;
}
</style>
