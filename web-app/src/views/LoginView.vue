<template>
  <div class="main">
    <v-form ref="form" class="form" @submit="validate">
      <v-text-field
        required
        clearable
        @click:clear="clearmail"
        :rules="mailRules"
        v-model="mail"
        label="E-Mail"
      ></v-text-field>
      <v-text-field
        required
        clearable
        @click:clear="clearPassword"
        v-model="password"
        :type="'password'"
        label="Password"
      ></v-text-field>
      <v-btn class="submitButton" type="submit" :disabled="isDisabled"
        >Se connecter
      </v-btn>
      <p class="account-creation">
        Pas de compte ? <a :href="'/register'"> Créer un compte</a>
      </p>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// Components

export default defineComponent({
  name: "LoginView",

  components: {},

  data: () => ({
    mail: "",
    mailRules: [
      (v: string) => {
        return !!v || "L'email est requis";
      },
      (v: string) => {
        return /.+@.+\..+/.test(v) || "L'email doit être valide";
      },
    ],
    password: "",
  }),

  computed: {
    isDisabled() {
      return !(this.mail.length > 0) || !(this.password.length > 0);
    },
  },

  methods: {
    validate(e: Event) {
      e.preventDefault();
      this.$axios
        .post(
          "http://localhost:8080/auth/login",
          {
            mail: this.mail.toLowerCase(),
            password: this.password,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("token")}`,
            },
          }
        )
        .then((e) => {
          console.log(e);
          document.cookie = `token=${e.data.token};expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 2
          ).toUTCString()}`;
          document.cookie = `lastname=${
            e.data.data.lastname
          };expires=${new Date(Date.now() + 1000 * 60 * 60 * 2).toUTCString()}`;
          document.cookie = `firstname=${
            e.data.data.firstname
          };expires=${new Date(Date.now() + 1000 * 60 * 60 * 2).toUTCString()}`;
          document.cookie = `userId=${e.data.data.id};expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 2
          ).toUTCString()}`;

          window.location.href = "/home";
        })
        .catch((e) => {
          console.log(e);
          window.alert(e.response.data.message);
        });
    },
    clearmail() {
      this.mail = "";
    },
    clearPassword() {
      this.password = "";
    },
  },
});
</script>

<style scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.form {
  display: grid;
  align-items: center;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 20vw;
  gap: 20px;
}

.account-creation {
  display: flex;
  justify-self: center;
  gap: 10px;
  font-size: 13px;
}

.account-creation a {
  text-decoration: underline;
  color: blue;
}
.submitButton {
  background: var(--color-four);
}
</style>
