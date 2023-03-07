<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          Vous êtes sur le point de supprimer votre compte. Cette action est
          irréversible.
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" block @click="DeleteUser"
            >Supprimer mon compte</v-btn
          >
          <v-btn color="error" block @click="dialog = false">Annuler</v-btn>
        </v-card-actions>
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

<style scoped></style>
