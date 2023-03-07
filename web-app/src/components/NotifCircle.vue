<template>
  <v-menu transition="scroll-y-transition">
    <template v-slot:activator="{ props }">
      <div v-if="UnseenNotif > 0" class="notifs">
        <v-badge
          :value="UnseenNotif"
          :content="UnseenNotif"
          color="red lighten-1"
        >
          <v-btn
            v-on:click="seeNotifs"
            icon="mdi-bell-outline"
            class="notifsPop"
            v-bind="props"
          ></v-btn>
        </v-badge>
      </div>
      <div v-else class="notifs">
        <v-btn
          class="notifsPop"
          v-on:click="seeNotifs"
          icon="mdi-bell-outline"
          v-bind="props"
        ></v-btn>
      </div>
    </template>
    <v-list class="liste">
      <v-list-item v-if="getNotificationsNumber === 0" link>
        <v-list-item-title>Vous n'avez pas de notifications</v-list-item-title>
      </v-list-item>
      <v-list-item v-for="notif in notifications" :key="notif.message" link>
        <v-list-item-title
          class="singleNotif"
          v-on:click="redirect(notif.route)"
          v-text="notif.message"
        ></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotifCircle",

  data: (): {
    notifications: { message: string; seen: boolean; route: string }[];
    UnseenNotif: number;
  } => ({
    notifications: [],
    UnseenNotif: 0,
  }),

  props: {
    idUser: String,
  },

  async created() {
    await this.setNotifsByUserId();
  },
  methods: {
    async setNotifsByUserId() {
      console.log("c'est aberant poto");
      if (this.$props.idUser) {
        this.$axios
          .get("http://127.0.0.1:8080/notifications/" + this.$props.idUser, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          })
          .then((rep) => {
            rep.data.map((notification: never) => {
              this.notifications.push(notification);
            });
            console.log("coucou", this.notifications);
            this.UnseenNotif = this.computeUnseenNotif();
            console.log("le nombre de notifs pas vue", this.UnseenNotif);
            this.$forceUpdate();
          });
      }
    },
    computeUnseenNotif(): number {
      return this.notifications.filter((notif) => {
        return notif.seen === false;
      }).length;
    },
    seeNotifs() {
      var request =
        "http://127.0.0.1:8080/notifications/seen/" + this.$props.idUser;
      this.$axios
        .put(
          request,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then((rep) => {
          rep.data;
        });
    },
    redirect(location: string) {
      window.location.href = location;
    },
  },

  computed: {
    howMany_unseen() {
      return this.notifications.filter((notif) => {
        return notif.seen === false;
      }).length;
    },
    getNotificationsNumber() {
      console.log("notif number", this.notifications.length);
      return this.notifications.length;
    },
  },
});
</script>

<style scoped>
.notifs {
  position: fixed;
  bottom: 5%;
  right: 5%;
}
.notifsPop {
  background: var(--color-three);
}
.liste {
  background: var(--color-six);
}
.singleNotif {
  background-color: var(--color-six);
}
.v-list {
  background: var(--color-six) !important;
}
</style>
