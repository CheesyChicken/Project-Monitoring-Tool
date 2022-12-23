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

        <!-- <router-link to="/director/profile" class="nav-link">
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
            <v-btn block tile class="pa-5 blue lighten-5" to="/director/profile"
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
        <v-list>
          <!-- <v-list-item @click.stop="drawer = !drawer">
            <v-list-item-action>
              <v-icon >mdi-chevron-left</v-icon>
            </v-list-item-action>
          </v-list-item> -->
          <v-list-item-group>
            <!-- Director Home -->
            <router-link
              :to="{ name: 'director' }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
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
                name: 'studcnt',
              }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
                <v-list-item-action>
                  <v-icon class="white--text">mdi-view-dashboard</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >Yearwise</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>

          <v-list-item-group>
            <router-link
              :to="{ name: 'Director allProjects' }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
                <v-list-item-action>
                  <v-icon class="white--text"
                    >mdi-file-document-multiple</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >All Projects</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>

          <v-list-item-group>
            <router-link
              :to="{ name: 'Director Yearwise Students' }"
              style="text-decoration: none; color: inherit"
            >
              <v-list-item>
                <v-list-item-action>
                  <v-icon class="white--text"
                    >mdi-account-multiple</v-icon
                  >
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="white--text"
                    >All Students</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </router-link>
          </v-list-item-group>

          <!-- <v-list-item-group>
            <router-link
              to="/director/PD"
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
          </v-list-item-group> -->

          <v-list-item-group>
            <router-link
              to="/director/profile"
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

    <!-- <div class="box3">
      <v-card>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </v-card>
    </div> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    active: "home",
    drawer: false,
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
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.btn-secondary {
  background-color: transparent;
}
/* .box3 {
  margin-top: 40px;
} */
.vs-sidebar {
  border-right: 2px solid lightsteelblue;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.v-list-item:hover {
  background-color: orange;
  transition: background-color 0.2s ease-out;
}
</style>
