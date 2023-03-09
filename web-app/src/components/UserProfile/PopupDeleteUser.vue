<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card class="cardItem">
        <v-card-text>
          Vous êtes sur le point de supprimer votre compte. Cette action est
          irréversible.
        </v-card-text>
        <div class="cardActions">
          <div>
            <v-btn color="error" @click="dialog = false">Annuler</v-btn>
          </div>
          <div>
            <v-btn color="success" @click="DeleteUser"
              >Supprimer mon compte</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PopupDeleteUser",
  data: () => ({
    dialog: false,
  }),
  methods: {
    DeleteUser() {
      this.dialog = false;
      this.$emit("deleteUser");
    },
    openPopup() {
      this.dialog = true;
    },
  },
});
</script>

<style scoped>
.cardItem {
  background-color: var(--color-six);
}
.cardActions {
  padding: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
