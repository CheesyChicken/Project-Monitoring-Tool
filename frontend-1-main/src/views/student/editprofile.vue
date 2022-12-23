<template>
  <div id="app">
    <div>
      <Page1></Page1>
    </div>

    <v-container
      class="card card-container elevation-2"
      style="background-color: #f2f2f2; border: 0px"
    >
      <v-row>
        <v-col md="8" offset="2">
          <h3 style="text-align: center">EDIT PROFILE</h3>

          <v-form ref="form" v-model="valid" lazy-validation>
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

            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="this.currentUser.Mobile"
                  :rules="phoneRules"
                  label="Mobile Number"
                  outlined
                  prepend-inner-icon="mdi-phone"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="this.currentUser.grno_EmpCode"
                  :rules="grRules"
                  label="GR Number"
                  outlined
                  prepend-inner-icon="mdi-badge-account-horizontal"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="this.currentUser.email"
              :rules="emailRules"
              label="Email"
              outlined
              prepend-inner-icon="mdi-email"
              required
            ></v-text-field>

            <!-- <v-text-field
              v-model="this.Department"
              label="Department"
              outlined
              prepend-inner-icon="mdi-school"
              required
            ></v-text-field> -->

            <v-text-field
              v-model="this.ProjectTitle"
              label="Project Title"
              outlined
              prepend-inner-icon="mdi-school"
              required
            ></v-text-field>

            <v-btn
              color="success"
              class="d-flex justify-center"
              style="margin: auto"
              @click="validate"
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
import Page1 from "../page1";
export default {
  data: () => {
    return {
      person_id: "",
      fullname: "",
      students: [],
      ProjectTitle: "",
      Department: "",
      profile: {},
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
      grRules: [
        (v) => {
          if (v.length == 7) return true;
          return `Roll Number should have 8 digits maximum`;
        },
      ],
    };
  },
  mounted() {
    this.loggedin();
    this.getform();
  },
  components: {
    Page1,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.mounted();
        this.person_id = this.$route.params.id;
      },
    },
  },

  created() {
    this.person_id = this.$route.params.id;
    this.fullname = this.currentUser.FullName;
  },

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
        this.currentUser.roles == "ROLE_DIRECTOR"
      ) {
        this.logOut();
      }
    },

    getprofile() {
      this.$http.get(`/api/profile/${this.groupid}`).then(
        (result) => {
          console.log("profile");
          console.log(result.data);
          var profile = result.data;
          this.profile = profile;
          this.ProjectTitle = profile[0].Group_title;
          // this.ProjectName = profile[0].Group_Name;
          // this.ProjectType = profile[0].type;
          // if (this.ProjectType == "Industrial") {
          //   this.isIndus = true;
          // }
          // this.ProjectGuide = profile[0].FaultyGuide;
          this.Department = profile[0].Department_Name;
          // this.College = profile[0].College_Name;
          // this.Industry_Guide = profile[0].IndustryFaultyGuide;
          // this.Industry_Guide_No = profile[0].IndustryFaultyGuideMo;
          // this.Company_name = profile[0].Company_name;
          // this.Company_ID = profile[0].Company_id;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    getform() {
      this.$http.get(`/api/getstartdate/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var tod = result.data;
          this.groupid = tod[0].Group_id;
          if (!tod[0].startDate) {
            this.$router.push("/Starting");
          }
          this.getprofile();
        },
        (error) => {
          console.error(error);
        }
      );
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
