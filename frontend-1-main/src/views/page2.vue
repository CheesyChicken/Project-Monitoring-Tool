<template>
  <div id="app">
    <nav>
      <v-app-bar class="" app style="background-color: #348cd4">
        <v-app-bar-nav-icon
          class="white--text"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title class="text-uppercase white--text  pl-0">
          <div class="d-flex">
          <v-img
            src="../assets/PIMS_crop.png"
            alt=""
            srcset=""
            width="70"
            height="30"
          />
          <h4 class="font-weight-light mr-2" v-if="this.currentUser.college === 1">|</h4>
          <h6 class="mt-1 font-weight-light" v-if="this.currentUser.college === 1">Vishwakarma Institute of Information Technology</h6>
          <h6 class="mt-1 font-weight-light" v-else-if="this.currentUser.college === 2">| Vishwakarma Institute of Technology</h6>
          <h5 class="mt-1 font-weight-light" v-else-if="this.currentUser.college === 3">| Vishwakarma University</h5>
          </div>
        </v-app-bar-title>
        <v-spacer></v-spacer>

        <!-- <router-link :to="{ name: 'Guide Profile' }" class="nav-link">
           <v-btn text color="white" v-if="currentUser">
            <v-icon>mdi-account</v-icon>
            <span>{{ currentUser.FullName }}</span>
          </v-btn>
        </router-link>

        <v-btn text color="white" href @click.prevent="logOut">
          <span>LogOut <v-icon>mdi-login</v-icon></span>
        </v-btn> -->

        <v-btn text color="white" v-if="currentUser" class="ma-2"
          ><v-icon>mdi-account</v-icon
          ><span>{{ currentUser.FullName }}</span></v-btn
        >
        <v-menu bottom offset-y class="elevation-0">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-on="on" v-bind="attrs">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card class="text-center pt-4 elevation-0" style="min-width: 300px">
            <v-avatar color="#348cd4" size="75">
              <span class="white--text text-h5">{{
                this.currentUser.FullName[0]
              }}</span>
            </v-avatar>
            <h6 class="text-uppercase mt-2">{{ this.currentUser.FullName }}</h6>
            <p class="">{{ this.currentUser.email }}</p>
            <p class="mt-0">
              <v-icon class="mr-1">mdi-phone</v-icon>+91{{
                this.currentUser.Mobile
              }}
            </p>
            <!-- <v-divider></v-divider> -->
            <v-btn block tile class="pa-5 blue lighten-5" to="/guideprofile"
              ><v-icon class="">mdi-account</v-icon>Show Profile</v-btn
            >
            <v-btn
              block
              tile
              class="pa-5 blue lighten-5"
              href="https://drive.google.com/file/d/12H8L6mPigbpElxt-1r0Rk3r_Dy6i3Glz/view?usp=sharing"
              target="_blank"
              style="text-decoration: none"
            >
              <!-- <v-btn block tile class="pa-5 blue lighten-5"
            href="Manual.pdf"
                download="PIMS User Manual"
                style="text-decoration: none"
              > -->
              <v-icon class="">mdi-book</v-icon>User Manual</v-btn
            >
            <v-btn
              block
              tile
              class="pa-5 blue lighten-5"
              @click.prevent="logOut"
              ><v-icon class="">mdi-login</v-icon>Logout</v-btn
            >
          </v-card>
        </v-menu>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        fixed
        temporary
        hide-overlay
        class="mt-md-16 mt-14"
        style="background-color: #348cd4"
      >
        <v-list>
          <!-- <v-list-item @click.stop="drawer = !drawer">
            <v-list-item-action>
              <v-icon >mdi-chevron-left</v-icon>
            </v-list-item-action>
          </v-list-item> -->
          <v-list-item-group>
            <!-- Guide Home -->
            <router-link
              :to="{ name: 'guide' }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item class="list-item">
                <v-list-item-action>
                  <v-icon class="white--text">mdi-home</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >Home</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>

          <v-list-item-group>
            <router-link
              :to="{
                name: 'Guide allTask',
                params: { id: groupid },
              }"
              v-if="showproj"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item class="list-item">
                <v-list-item-action>
                  <v-icon class="white--text">mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >All tasks</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <!-- Guide Home -->
            <router-link
              :to="{ name: 'guide' }"
              v-else
              style="text-decoration: none; color: inherit"
            >
              <v-list-item class="list-item">
                <v-list-item-action>
                  <v-icon class="white--text">mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >All tasks</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>

          <v-list-item-group>
            <router-link
              :to="{
                name: 'Guide Project Details',
                params: { id: groupid },
              }"
              v-if="showproj"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item class="list-item">
                <v-list-item-action>
                  <v-icon class="white--text">mdi-file-edit</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >Project Details</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
            <!-- Guide Home -->
            <router-link
              :to="{ name: 'guide' }"
              v-else
              style="text-decoration: none; color: inherit"
            >
              <v-list-item class="list-item">
                <v-list-item-action>
                  <v-icon class="white--text">mdi-file-edit</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >Project Details</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>

          <v-list-item-group>
            <router-link
              to="/guideprofile"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item class="list-item">
                <v-list-item-action>
                  <v-icon class="white--text">mdi-account</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >Profile</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </nav>

    <div class="box3">
      <v-card>
        <div class="container-fluid">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
// import { API_BASE_URL } from "../config";

export default {
  props: {
    groupid: String,
    showproj: Boolean,
  },
  data: () => ({
    gi: "",
    active: "home",
    drawer: false,
    total: 0,
  }),

  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_STUDENT");
      }
      return false;
    },
    showGuideBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_GUIDE");
      }
      return false;
    },
    showHodBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_HOD");
      }
      return false;
    },
    showDirectorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_DIRECTOR");
      }
      return false;
    },
    showManagementBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_MANAGEMENT");
      }
      return false;
    },
  },
  mounted() {
    this.loggedin();
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      // this.getperson();
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
    // getform(gi) {
    //   console.log("abc" + gi);
    //   this.$http.get(`/api/groups/${gi}`).then(
    //     (result) => {
    //       console.log(gi + " " + result.data);
    //       var group = result.data;
    //       this.todos = group[0];
    //       console.log("getfor " + gi);
    //       console.log(this.todos[0].startDate);
    //       console.log("date");
    //       console.log(this.todos[0].startDate);
    //       if (!this.todos[0].startDate) {
    //         console.log("In If");
    //         this.$router.push("/Startingerror");
    //       }
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // },
    // getperson() {
    //   axios
    //     .get(`/api/person/${this.currentUser.Person_Id}`)
    //     .then(
    //       (result) => {
    //         console.log("person");
    //         console.log(result.data);
    //         this.person = result.data;
    //         console.log(this.person.length);
    //         for (let i = 0; i < this.person.length; i++) {
    //           console.log("startdate  " + !this.person[i].startDate);
    //           if (!this.person[i].startDate) {
    //             continue;
    //           }
    //           this.total++;
    //           this.getform(this.person[i].Group_id);
    //           console.log(this.person[i].Group_id);
    //           this.gi = this.person[i].Group_id;
    //         }
    //       },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    // },
  },
};
</script>

<style>
.btn-secondary {
  background-color: transparent;
}
/* .box3 {
  margin-top: 20px;
} */
.vs-sidebar {
  border-right: 2px solid lightsteelblue;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.list-item:hover {
  background-color: orange;
  transition: background-color 0.2s ease-out;
}
</style>
