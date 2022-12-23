<template>
  <div>
    <!-- <nav class="navbar navbar-expand mt-0" style="background-color: #348cd4">
      <a href class="navbar-brand mr-0" @click.prevent>
        <v-img
          src="../assets/PIMS.png"
          alt=""
          srcset=""
          width="150"
          height="40"
        />
      </a>
      
    </nav> -->
    <v-app-bar app style="background-color: #348cd4" dark>
      <a href class="navbar-brand mr-0" @click.prevent>
        <div class="d-flex">
        <v-img
            src="../assets/PIMS_crop.png"
            alt=""
            srcset=""
            width="70"
            height="30"
          />

          <h4 class="font-weight-light mr-2 white--text">|</h4>
          <h6 class="mt-1 font-weight-light white--text text-uppercase ">Vishwakarma Institutes</h6>
        </div>
      </a>
    </v-app-bar>
    <!-- <div id="app pa-0 ma-0"> -->
    <v-container fluid class="ma-0 pa-0">
      <v-row align>
        <v-col
          id="panel-logo"
          class="justify-center d-flex flex-row col1"
          align="center"
          style="height: calc(100vh - 75px)"
        >
          <!-- <Header></Header> -->
          <div class="text-uppercase" style="margin: auto">
            <v-img
              src="../assets/viitlogo.png"
              height="250px"
              width="250px"
              alt="Vishwakarma Institute Of Information Technology"
              class="logo img-responsive"
            />
          </div>
        </v-col>
        <v-col
          align="center"
          style="height: calc(100vh - 75px); background-color: #cce6ff"
          class="elevation-10"
        >
          <div
            style="position: relative; top: 50%; transform: translateY(-50%)"
          >
            <div id="heading">
              <h3
                style="text-align: center"
                class="font-weight-medium mb-3 text-uppercase"
              >
                Project & Internship Monitoring System
              </h3>
              <!-- <p class="subheading font-weight-regular text-center">
                We are still backing features for you,
                <br />In mean time please Sign Up
              </p> -->
              
            </div>

            <!-- <v-card class="mx-auto" width="400">
              <v-card-text class="center">
                <router-link to="/login" class="nav-link">
                  <p class="ma-0"><v-icon class="blue--text">mdi-login</v-icon> Login</p>
                </router-link>
                
                <router-link to="/temp_signup" class="nav-link">
                  <p class="ma-0"><v-icon class="blue--text">mdi-account-multiple-plus</v-icon> GROUP Sign Up</p>
                </router-link>
                <router-link to="/facultyregister" class="nav-link">
                  <p class="ma-0"><v-icon class="blue--text">mdi-account-plus</v-icon> Faculty Sign Up</p>
                </router-link>
              </v-card-text>
            </v-card> -->
            <v-btn
              to="/login"
              color="green white--text"
              class="mt-5"
              tile
              x-large
              style="text-decoration:none;"
              ><v-icon class="white--text mr-2">mdi-arrow-right</v-icon
              >Get Started
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- </div> -->
  </div>
</template>

<script>
import UserService from "../services/user.service";
// import Header from "../components/Header.vue";
export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  created () { 
      document.title="Project Monitoring System";
    },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  components: {},
};
</script>
<style scoped>
#app {
  padding-top: 5%;
  padding-right: 5%;
  padding-left: 5%;
  width: 100%;
}

.col1 {
  background: rgb(229, 234, 235);
  background-size: cover;
}

@media (max-width: 767px) {
  #panel-logo {
    display: none !important;
  }
}
</style>