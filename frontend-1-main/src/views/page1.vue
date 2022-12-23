<template>
  <div id="app">
    <nav>
      <v-app-bar app style="background-color: #348cd4" class="elevation-0">
        <!-- clipped-left add this prop in v-app-bar if you want only responsive in desktop or laptop like EasyPariksha portal  -->

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
        <!-- <v-btn @click="toggleTheme" color="primary" class="mr-2">{{
          buttonText
        }}</v-btn> -->
        <!-- <router-link to="/profile" class="nav-link">
          <v-btn text color="white" v-if="currentUser">
            <v-icon>mdi-account</v-icon>
            <span>{{ currentUser.FullName }}</span>
          </v-btn>
        </router-link>

        <v-btn text color="white" href @click.prevent="logOut">
          <span>LogOut <v-icon>mdi-login</v-icon></span>
        </v-btn> -->
        <v-btn text color="white" v-if="currentUser" class="ma-2" v-on="on"
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
            <v-btn block tile class="pa-5 blue lighten-5" to="/profile"
              ><v-icon class="">mdi-account</v-icon>Show Profile</v-btn
            >
            <v-btn
              block
              tile
              class="pa-5 blue lighten-5"
              href="https://drive.google.com/file/d/12H8L6mPigbpElxt-1r0Rk3r_Dy6i3Glz/view?usp=sharing"
              target="_blank"
              style="text-decoration: none"
              ><v-icon class="">mdi-book</v-icon>User Manual</v-btn
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
        <!-- add this props in v-navigation drawer if you want only responsive in desktop or laptop like EasyPariksha poratal
        app
        :temporary="mini"
        :permanent="(drawer) && (!mini)  "
        floating -->
        <v-list>
          <v-list-item-group>
            <!-- "/student/home" -->
            <router-link
              to="/student"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
                <v-list-item-action style="opacity: 100%">
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
              :to="{ name: 'Student Task' }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item v-if="this.showproj">
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

          <v-list-item-group v-if="this.showproj">
            <router-link
              :to="{ name: 'Project Details', params: { id: groupid } }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
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
              to="/profile"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
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
export default {
  props: {
    groupid: String,
    showproj: Boolean,
  },
  data: () => ({
    //for navigation drawer toggle button
    drawer: false,
    active: "home",
    projects: 0,
  }),
  mounted() {
    this.loggedin();
  },
  computed: {
    buttonText() {
      return !this.$vuetify.theme.dark ? "Go Dark" : "Go Light";
    },
    // mini() {
    //   return this.$vuetify.breakpoint.smAndDown;    // use this computed property if you want drawer like EasyPariksha
    // },
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    initials() {
      let initials = [];
      let splitedName = this.currentUser.FullName.split(" ");
      if (splitedName.length == 3) {
        let shortName = [];
        shortName.push(splitedName[0]);
        shortName.push(splitedName[2]);
        shortName.forEach((e) => {
          initials.push(e[0]);
        });
      } else {
        splitedName.forEach((e) => {
          initials.push(e[0]);
        });
      }
      return initials.join("");
    },
    showStudentBoard() {
      if (this.currentUser && this.currentUser.roles) {
        if (this.currentUser.roles === "ROLE_LEADER") {
          return this.currentUser.roles.includes("ROLE_LEADER");
        } else if (this.currentUser.roles === "ROLE_MEMBER") {
          return this.currentUser.roles.includes("ROLE_MEMBER");
        }
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
  methods: {
    // toggleTheme() {
    //   this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    //   this.$vuetify.theme.themes.dark.primary = "#4caf50";
    // },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      // this.getform(this.currentUser.Person_Id);
      if (
        this.currentUser.roles == "ROLE_HOD" ||
        this.currentUser.roles == "ROLE_GUIDE" ||
        this.currentUser.roles == "ROLE_MANAGEMENT" ||
        this.currentUser.roles == "ROLE_DIRECTOR"
      ) {
        this.logOut();
      }
    },
    getprojects() {
      this.$http.get(`/api/getproject/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          this.projects = result.data.length;
          if (this.projects > 0) {
            this.groupid = result.data[0].Group_id;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    // getform(gi) {
    //   this.$http.get(`/api/getstartdate/${gi}`).then(
    //     result => {
    //       console.log(result.data);
    //       var tod = result.data;
    //       this.groupid = tod[0].Group_id;
    //       if (!tod[0].startDate) {
    //         if (this.currentUser.roles == "ROLE_MEMBER") {
    //           this.$router.push("/startingmember");
    //         } else if (this.currentUser.roles == "ROLE_LEADER") {
    //           this.$router.push("/starting");
    //         }
    //       }
    //     },
    //     error => {
    //       console.error(error);
    //     }
    //   );
    // }
  },
};
</script>

<style>
.btn-secondary {
  background-color: transparent;
}
.vs-sidebar {
  border-right: 2px solid lightsteelblue;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.v-list-item:hover {
  background-color: orange;
  transition: background-color 0.2s ease-out;
}
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.theme--light.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--light.v-application ::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light.v-application ::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}

.theme--light.v-application ::-webkit-scrollbar-thumb:hover {
  background: black;
}

.theme--dark.v-application ::-webkit-scrollbar {
  width: 13px;
}

.theme--dark.v-application ::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 3px #202020;
  border-radius: 7px;
}

.theme--dark.v-application ::-webkit-scrollbar-thumb:hover {
  background: white;
}
</style>
