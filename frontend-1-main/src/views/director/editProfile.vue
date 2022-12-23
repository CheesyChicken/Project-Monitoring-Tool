<template>
  <div id="app">
    <div>
      <Page4></Page4>
    </div>

    <v-container
      class="card card-container elevation-2"
      style="background-color: #f2f2f2; border: 0px"
    >
      <v-row>
        <v-col md="10" offset="1">
          <h3 style="text-align: center">EDIT DIRECTOR PROFILE</h3>

          <v-form ref="form" lazy-validation>
            <v-text-field
              :rules="usernameRules"
              label="Username"
              v-model="this.currentUser.username"
              outlined
              required
              prepend-inner-icon="mdi-account-circle"
            ></v-text-field>

            <v-text-field
              :rules="nameRules"
              label="Full Name"
              v-model="this.currentUser.FullName"
              outlined
              required
              prepend-inner-icon="mdi-account"
            ></v-text-field>

            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="this.currentUser.Mobile"
                    :rules="phoneRules"
                    label="Mobile Number"
                    type="number"
                    outlined
                    prepend-inner-icon="mdi-phone"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="this.currentUser.grno_EmpCode"
                    label="Employee Number"
                    outlined
                    prepend-inner-icon="mdi-badge-account-horizontal"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>

            <v-text-field
              v-model="this.currentUser.email"
              :rules="emailRules"
              label="Email"
              outlined
              prepend-inner-icon="mdi-email"
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="this.currentUser.department"
              label="Department"
              outlined
              prepend-inner-icon="mdi-school"
              required
            ></v-text-field> -->

            <v-btn
              color="success"
              class="d-flex justify-center"
              style="margin: auto"
            >
              Update Profile
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
// import * as d3 from "d3";
import Page4 from "../page4";
// import axios from "axios";
export default {
  data: () => {
    return {
      person_id: "",
      usernameRules: [
        (v) => !!v || "Username is required",
        (v) =>
          (v && v.length <= 15) || "Username must be less than 15 characters",
        (v) =>
          /^[a-zA-Z0-9]+[._]*[a-zA-Z0-9]*$/.test(v) ||
          "Username can consist of Alphabets, Numbers, _ and .  only",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 12 characters",
        (v) =>
          /^[a-zA-Z ]+$/.test(v) || "Name should consist of Alphabets only",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => {
          if (!isNaN(v) && v.length === 10) return true;
          return `Enter 10 digit phone number`;
        },
      ],
      //   grRules: [
      //     (v) => {
      //       if (v.length == 7) return true;
      //       return `Roll Number should have 8 digits maximum`;
      //     },
      //   ],
    };
  },
  mounted() {
    this.loggedin();
  },
  components: {
    Page4,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.mounted();
        this.person_id = this.$route.params.id;
      },
    },
  },

  created() {},
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (
        this.currentUser.roles == "ROLE_HOD" ||
        this.currentUser.roles == "ROLE_GUIDE" ||
        this.currentUser.roles == "ROLE_MANAGEMENT" ||
        this.currentUser.roles == "ROLE_LEADER"
      ) {
        this.logOut();
      }
    },
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style scoped>
.underNav {
  margin-top: 50px;
}
#box1 {
  width: auto;
  padding: 10px;
  margin: auto;
  margin-top: 10px;
  text-align: center;
  height: auto;
}
.ft {
  background-color: lightgrey;
}
#app {
  padding-top: 3%;
  padding-left: 3%;
  padding-right: 3%;
}
</style>
>
