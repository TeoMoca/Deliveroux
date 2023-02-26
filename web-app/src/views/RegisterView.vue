<template>
  <v-card width="1000" style="margin: auto">
    <v-row no-gutters>
      <v-col cols="5">
        <div
          style="
            display: flex;
            height: 33%;
            width: 100%;
            justify-content: center;
            align-items: center;
          "
          id="PersonalInformation"
          @click="ToPersonalInformation"
        >
          <v-icon
            icon="mdi-account-circle"
            size="25"
            id="PersonalInformationIcon"
            class="inactiveIcon"
          ></v-icon>
          <div class="titleCard">Informations Personnelles</div>
        </div>
        <div
          style="display: flex; height: 33%"
          @click="ToAddressInformation"
          id="AddressInformation"
        >
          <v-icon
            icon="mdi-home-account"
            size="25"
            id="AddressInformationIcon"
            class="inactiveIcon"
          ></v-icon>
          <div class="titleCard">Addresse</div>
        </div>
        <div
          style="display: flex; height: 33%"
          @click="ToRoleInformation"
          id="RoleInformation"
        >
          <v-icon
            icon="mdi-account-group-outline"
            size="25"
            id="RoleInformationIcon"
            class="inactiveIcon"
          ></v-icon>
          <div class="titleCard">Rôle</div>
        </div>
      </v-col>
      <v-col>
        <v-form
          ref="form"
          class="mb-2"
          v-model="valid"
          @submit.prevent="validate"
        >
          <div v-if="isPersonalInformation" style="text-align: center">
            <h1>Informations Personnelles</h1>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="firstname"
                    class="mb-2"
                    @change="nextPersonalInformation"
                    label="Prénom"
                    :rules="firstnamerules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="lastname"
                    @change="nextPersonalInformation"
                    class="mb-2"
                    label="Nom"
                    :rules="lastnamerules"
                    required
                /></v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="password"
                    class="mb-2"
                    label="Mot de passe"
                    @change="nextPersonalInformation"
                    :rules="passwordrules"
                    type="password"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    class="mb-2"
                    label="Confirmer le mot de passe"
                    type="password"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    v-model="email"
                    @change="nextPersonalInformation"
                    class="mb-2"
                    label="Email"
                    :rules="emailrules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="phone"
                    @change="nextPersonalInformation"
                    class="mb-2"
                    label="Téléphone"
                    :rules="phonerules"
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="isAddressInformation" style="text-align: center">
            <h1>Addresse</h1>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="adressname"
                    @change="nextAddressInformation"
                    class="mb-2"
                    label="Adresse"
                    :rules="addressnamerules"
                    required
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="city"
                    @change="nextAddressInformation"
                    class="mb-2"
                    label="Ville"
                    :rules="cityrules"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="codepostal"
                    @change="nextAddressInformation"
                    class="mb-2"
                    label="Code Postal"
                    :rules="codepostalrules"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="country"
                    @change="nextAddressInformation"
                    class="mb-2"
                    label="Pays"
                    :rules="countryrules"
                    required
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="refercode"
                    class="mb-2"
                    label="Parrainage (email)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="isRoleInformation" style="text-align: center">
            <h1>Vous êtes</h1>

            <v-row>
              <v-col>
                <v-radio-group inline>
                  <v-radio
                    v-for="role in checkRoles"
                    :key="role.value"
                    true-icon="role.trueIcon"
                    class="CheckRoleIcon"
                    @click="checkRole(role.value)"
                    :value="role.value"
                    :label="role.label"
                  >
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </div>
          <div id="ButtonForm">
            <v-btn
              v-if="!isNextTabButton"
              id="NextTabButton"
              color="var(--light-mode-color-five)"
              type="button"
              @click="changeCurrentTab"
              >Précédent</v-btn
            >
            <v-btn
              v-if="isNextTabButton"
              id="NextTabButton"
              color="var(--light-mode-color-five)"
              type="button"
              @click="changeCurrentTab"
              >Suivant</v-btn
            >
            <v-btn
              v-if="isNextTabButton"
              id="NextTabButton"
              color="success"
              type="submit"
              >S'enregistrer</v-btn
            >
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data: () => ({
    valid: false,
    isPersonalInformation: true,
    isAddressInformation: false,
    isRoleInformation: false,
    isNextTabButton: false,
    isPreviousButton: true,
    isNextPersonalButton: false,
    isAddressButton: false,
    firstname: "",
    firstnamerules: [(v: string) => !!v || "le prénom est requis"],
    lastname: "",
    lastnamerules: [(v: string) => !!v || "le nom est requis"],
    password: "",
    passwordrules: [(v) => !!v || "Le mot de passe est obligatoire"],
    email: "",
    emailrules: [
      (v) => /.+@.+\..+/.test(v) || "E-mail doit être valide",
      (v) => !!v || "Email est requis",
    ],
    phone: "",
    phonerules: [(v) => !!v || "Le numéro de téléphone est obligatoire"],
    adressname: "",
    addressnamerules: [(v) => !!v || "L adresse est obligatoire"],
    city: "",
    cityrules: [(v) => !!v || "La ville est obligatoire"],
    codepostal: "",
    codepostalrules: [
      (v) => !!v || "Le code postal est obligatoire",
      (v) =>
        /^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/.test(v) ||
        "Le code postal n est pas valide",
    ],
    country: "",
    countryrules: [(v) => !!v || "Le pays est obligatoire"],
    checkRoles: [
      {
        label: "Consommateur",
        value: 1,
      },
      { label: "Restaurateur", value: 2 },
      { label: "Livreur", value: 3 },
    ],
    selectedRole: 0,
  }),
  mounted() {
    this.changeCurrentTabStyle();
  },
  methods: {
    changeCurrentTab() {
      if (this.isPersonalInformation && !this.isAddressInformation) {
        this.ToAddressInformation();
      } else if (this.isAddressInformation && !this.isRoleInformation) {
        this.ToRoleInformation();
        this.isNextTabButton = true;
      }
    },
    previousTab() {
      if (this.isAddressInformation && !this.isPersonalInformation) {
        this.ToPersonalInformation();
      } else if (this.isRoleInformation && !this.isAddressInformation) {
        this.ToAddressInformation();
        this.isNextTabButton = false;
      }
    },

    nextPersonalInformation() {
      console.log(this.lastname);
      if (
        this.firstname != "" &&
        this.lastname != "" &&
        this.password != "" &&
        this.email != "" &&
        this.phone != ""
      ) {
        console.log("ok");
        this.isNextTabButton = true;
      }
      this.isNextTabButton = false;
    },

    nextAddressInformation() {
      if (
        this.adressname != "" &&
        this.city != "" &&
        this.codepostal != "" &&
        this.country != ""
      ) {
        this.isNextTabButton = true;
      }
      this.isNextTabButton = false;
    },

    ToAddressInformation() {
      this.isPersonalInformation = false;
      this.isAddressInformation = true;
      this.isRoleInformation = false;
      this.changeCurrentTabStyle();
    },
    ToPersonalInformation() {
      this.isPersonalInformation = true;
      this.isAddressInformation = false;
      this.isRoleInformation = false;
      this.changeCurrentTabStyle();
    },
    ToRoleInformation() {
      this.isPersonalInformation = false;
      this.isAddressInformation = false;
      this.isRoleInformation = true;
      this.changeCurrentTabStyle();
    },
    changeCurrentIconStyle() {
      const personalInformationIcon = document.getElementById(
        "PersonalInformationIcon"
      );
      const addressInformationIcon = document.getElementById(
        "AddressInformationIcon"
      );
      const roleInformationIcon = document.getElementById(
        "RoleInformationIcon"
      );

      if (this.isPersonalInformation) {
        personalInformationIcon?.classList.add("activeIcon");
        addressInformationIcon?.classList.remove("activeIcon");
        roleInformationIcon?.classList.remove("activeIcon");
      } else if (this.isAddressInformation) {
        personalInformationIcon?.classList.remove("activeIcon");
        addressInformationIcon?.classList.add("activeIcon");
        roleInformationIcon?.classList.remove("activeIcon");
      } else if (this.isRoleInformation) {
        personalInformationIcon?.classList.remove("activeIcon");
        addressInformationIcon?.classList.remove("activeIcon");
        roleInformationIcon?.classList.add("activeIcon");
      }
    },
    changeCurrentTabStyle() {
      const personalInformation = document.getElementById(
        "PersonalInformation"
      );
      const addressInformation = document.getElementById("AddressInformation");
      const roleInformation = document.getElementById("RoleInformation");

      if (this.isPersonalInformation) {
        personalInformation?.classList.add("active");
        addressInformation?.classList.remove("active");
        roleInformation?.classList.remove("active");
      } else if (this.isAddressInformation) {
        personalInformation?.classList.remove("active");
        addressInformation?.classList.add("active");
        roleInformation?.classList.remove("active");
      } else if (this.isRoleInformation) {
        personalInformation?.classList.remove("active");
        addressInformation?.classList.remove("active");
        roleInformation?.classList.add("active");
      }
      this.changeCurrentIconStyle();
    },
    checkRole(roleId) {
      this.selectedRole = roleId;
    },
  },
});
</script>

<style>
h2 {
  text-align: center;
}
.container {
  align-items: center;
}

.circle {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  border-color: var(--light-mode-color-five);
  border-style: solid;
}

.active {
  background-color: var(--light-mode-color-five);
  color: white;
}

#PersonalInformation {
  border-bottom: solid 2px var(--light-mode-color-five);
  text-align: center;
}

#AddressInformation {
  border-bottom: solid 2px var(--light-mode-color-five);
  text-align: center;
}

#RoleInformation {
  text-align: center;
}

.titleCard {
  justify-content: center;
  align-items: center;
  width: 100%;
}

.inactiveIcon {
  color: var(--light-mode-color-five);
}

#NextTabButton {
  color: white;
}

#ButtonForm {
  float: right;
  padding-right: 5%;
  padding-bottom: 5%;
}

.activeIcon {
  color: white;
}
</style>
