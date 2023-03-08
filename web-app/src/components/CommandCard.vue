<template>
  <v-container>
    <v-row justify="space-around">
      <v-card class="v-card-CommandCard" width="400">
        <v-img
          height="200"
          :src="restaurant.image_link"
          cover
          class="text-white"
        >
          <v-toolbar color="rgba(0, 0, 0, 0)" theme="dark">
            <v-toolbar-title class="text-h6">
              {{ restaurant.name }}
            </v-toolbar-title>
            <template v-slot:append>
              <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-toolbar>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ms-1 mb-2">@{{ command.date }}</div>
          <p>n° Commande : {{ command._id }}</p>
          <v-timeline density="compact" align="start">
            <v-timeline-item
              class="timeline-command"
              dot-color="green-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Commande Payée</strong>
                </div>
              </div>
            </v-timeline-item>

            <!--_________________________________________________________-->
            <v-timeline-item
              class="timeline-command"
              v-if="command.isAcceptedByRestaurateur == true"
              dot-color="green-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Commande Acceptée par le Restaurant</strong>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              class="timeline-command"
              v-else
              dot-color="red-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Commande Acceptée par le Restaurant</strong>
                </div>
              </div>
            </v-timeline-item>
            <!--_________________________________________________________-->
            <v-timeline-item
              class="timeline-command"
              v-if="command.isInDelivery == true"
              dot-color="green-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Commande en cours de livraison</strong>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              class="timeline-command"
              v-else
              dot-color="red-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Commande en cours de livraison</strong>
                </div>
              </div>
            </v-timeline-item>
            <!--_________________________________________________________-->
            <v-timeline-item
              class="timeline-command"
              v-if="command.isFinished == true"
              dot-color="green-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Terminée</strong>
                </div>
              </div>
            </v-timeline-item>
            <v-timeline-item
              class="timeline-command"
              v-else
              dot-color="red-darken-3"
              size="x-small"
            >
              <div class="mb-4">
                <div class="font-weight-normal">
                  <strong>Terminée</strong>
                </div>
              </div>
            </v-timeline-item>
            <!--_________________________________________________________-->
          </v-timeline>
        </v-card-text>
        <v-btn
          v-if="command.isInDelivery"
          color="success"
          class="me-4 submit"
          @click="validate"
        >
          Valider la récéption
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CommandCard",
  props: {
    command: { type: Object, required: true },
  },

  data: (): {
    restaurant: { name: string; image_link: string; _id: string };
  } => ({
    restaurant: { name: "", image_link: "", _id: "" },
  }),

  created() {
    this.$axios
      .get(
        `http://${location.hostname}:8080/restaurants/` +
          this.command.restorantId,
        {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("token")}`,
          },
        }
      )
      .then((rep) => {
        this.restaurant = rep.data;
      });
  },
  methods: {
    validate() {
      //request
      this.$axios
        .patch(
          `http://${location.hostname}:8080/commands/finish/` +
            this.command._id,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then(() => {
          location.reload();
        });
    },
  },
});
</script>

<style>
.v-card-actions {
  justify-content: space-between;
}

.v-card-CommandCard {
  width: 100%;
  height: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  background: var(--color-six);
}
.timeline-command .v-timeline-divider__before,
.timeline-command .v-timeline-divider__after {
  background: var(--color-three) !important;
}
</style>
