<template>
  <h1>Votre commande a bien été passée !</h1>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  async mounted() {
    const commandIds = this.$store.getters.getCommands;
    console.log(commandIds);
    for (const commandId of commandIds) {
      await this.setCommandPayed(commandId);
    }
    this.$store.commit("deleteArticle");
    this.$store.commit("deleteCommandIds");
    setTimeout(function () {
      console.log("j'attends");
    }, 5000000);
    this.$router.push("/home");
  },
  name: "PayedCheckView",
  data: (): {
    customer_id: string;
  } => ({
    customer_id: "",
  }),
  methods: {
    async setCommandPayed(commandId) {
      await this.$axios
        .patch(
          "http://localhost:8080/commands/pay/" + commandId,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then(() => {
          this.$axios
            .get("http://localhost:8080/commands/one/" + commandId, {
              //a changer pour l'id du resto
              headers: {
                Authorization: `Bearer ${this.$cookies.get("token")}`,
              },
            })
            .then((cmd) => {
              this.customer_id = cmd.data.customerId;
              this.$axios
                .post(
                  "http://127.0.0.1:8080/notifications/send",
                  {
                    id_user: this.customer_id,
                    message: "commande " + commandId + " Confirmée!",
                    date: Date.now(),
                    route: "/livraison/" + this.customer_id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${this.$cookies.get("token")}`,
                    },
                  }
                )
                .then(() => {
                  console.log("notif pushed!");
                  this.$emit("updateNotifications");
                  console.log(commandId);
                  console.log(this.$cookies.get("userId"));
                });
            });
        });
    },
  },
});
</script>

<style scoped></style>
