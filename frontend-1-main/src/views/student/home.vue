<template>
  <div id="app">
    <div>
      <Page1
        :showproj="this.projects.length > '0'"
        :groupid="`${this.groupid}`"
      ></Page1>
    </div>
    <!-- <p>{{this.groupid}}</p> -->
    <!-- <h5 class="font-weight-light text-center ">You have joined following group</h5> -->
    <v-container fluid class="ml-lg-5">
      <v-row id="box" v-if="this.projects.length == 0">
        <v-col md="12" class="text-center">
          <v-card class="pa-7 elevation-0" color="#f2f2f2">
            <h2 class="font-weight-light">You have not joined any group.</h2>
            <h3 class="font-weight-light">
              Please Join a group to start your project overflow.
            </h3>

            <v-btn class="success mr-5 mt-10" to="/student/createproject" tile
              ><v-icon>mdi-plus</v-icon> Create Group</v-btn
            >
            <v-btn class="info mt-10" tile v-show="!join" @click="join = !join"
              ><v-icon>mdi-account-multiple</v-icon> Join Group</v-btn
            >
            <v-btn class="error mt-10" v-show="join" tile @click="join = !join"
              ><v-icon>mdi-account-multiple</v-icon> Cancel</v-btn
            >

            <h5 class="mt-5 font-weight-light">
              Please note that you can only join one group for the project in
              this semester.
            </h5>
            <div v-show="join && this.projects.length == 0" class="mt-10">
              <v-text-field
                v-model="groupcode"
                label="Joining Code"
                outlined
                style="width: 30%"
                class="mt-5 mx-auto"
                hint="Enter six letter joining code"
                required
              ></v-text-field>

              <v-btn class="success" tile @click="joingroup">Join</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else class="mt-10">
        <v-col lg="3" md="4" xs="12">
          <div v-for="item in projects" v-bind:key="item.Group_Name">
            <!-- <h2 class="font-weight-light">Your have joined following group</h2> -->

            <v-card class="my-2 mx-5 mx-md-0">
              <div class="title" style="height:100px;">
                <v-card-title
                  class="white--text text-uppercase"
                  style="font-size:17px;"
                  >{{ item.Group_title.slice(0, 25) }}...
                  <v-spacer></v-spacer>
                  <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-btn dark icon v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list class="mt-10">
                      <v-list-item
                        v-if="item.creator == currentUser.Person_Id"
                        @click="deleteproject(item.Group_id)"
                        style="cursor: pointer;"
                      >
                        <v-list-item-title>Delete Group</v-list-item-title>
                      </v-list-item>

                      <v-list-item
                        v-else
                        @click="leaveproject(item.Group_id)"
                        style="cursor: pointer;"
                      >
                        <v-list-item-title>Leave Group</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-card-title>
                <h6 class="white--text ml-5">{{ item.guide }}</h6>
              </div>

              <v-card-text>
                <div class="my-1 text-subtitle-1 black--text">
                  <strong>{{ item.Group_Name }}</strong>
                </div>

                <div class="my-1 text-subtitle-1 black--text">
                  {{ item.Objective.slice(0, 100) }}..
                </div>
              </v-card-text>

              <!-- <v-divider class="mx-4"></v-divider> -->
              <div class="my-1 mx-4" style="color:#0000ff;">
                <div class="d-flex">
                  <h3 class="display-1">{{ item.code }}</h3>
                  <a @click="copyText(item.code)" class="mt-3 ml-2">Copy</a>
                </div>
                <h6 class="font-weight-light">
                  Joining Code. Applicable to 4 members
                </h6>
                <!-- <h6 class="font-weight-light">Maximum 4 members can join the group</h6> -->
              </div>
              <v-card-actions>
                <router-link
                  :to="{
                    name: 'Student My Project',
                  }"
                  style="text-decoration: none"
                  v-if="
                    item.startDatenum <= item.currentDate &&
                      item.endDatenum >= item.currentDate
                  "
                >
                  <v-btn color="blue white--text" tile>
                    <v-icon> mdi-arrow-top-right </v-icon>
                    Show Tasks
                  </v-btn>
                </router-link>
                <v-btn
                  color="purple"
                  tile
                  text
                  v-else-if="item.startDatenum >= item.currentDate"
                >
                  <v-icon> mdi-clock </v-icon>
                  Starting from {{ item.startDate }}
                </v-btn>
                <v-btn color="purple" tile text v-else>
                  <v-icon> mdi-clock </v-icon>
                  Ended on {{ item.endDate }}
                </v-btn>

                <!-- <v-btn color="error white--text ml-4" v-if="item.creator == currentUser.Person_Id" @click="deleteproject(item.Group_id)" tile>
                  <v-icon> mdi-arrow </v-icon>
                  Delete Project
              </v-btn> -->

                <!-- <v-btn color="error white--text ml-4"  @click="leaveproject(item.Group_id)" tile>
                  <v-icon> mdi-arrow </v-icon>
                  Leave Project
              </v-btn> -->
              </v-card-actions>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- <p>{{ this.currentUser }}</p> -->
  </div>
</template>

<script>
/* eslint-disable */
import dayjs from "dayjs";

import Page1 from "../page1";

export default {
  components: {
    Page1,
  },
  data() {
    return {
      projects: [],
      join: false,
      groupcode: "",
      groupid: "",
    };
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "Student | Home";
  },
  mounted() {
    this.getprojects();
  },
  methods: {
    currentDate(date) {
      return dayjs(date).format("YYYYMMDD");
    },

    getprojects() {
      this.$http.get(`/api/getproject/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          this.projects = result.data;
          this.groupid = result.data[0].Group_id;
          this.projects[0].startDatenum = this.currentDate(
            this.projects[0].startDate
          );
          this.projects[0].endDatenum = this.currentDate(
            this.projects[0].endDate
          );
          this.projects[0].currentDate = this.currentDate(new Date());
          this.projects[0].startDate = dayjs(this.projects[0].startDate).format(
            "DD MMMM YYYY"
          );
          this.projects[0].endDate = dayjs(this.projects[0].endDate).format(
            "DD MMMM YYYY"
          );
        },
        (error) => {
          console.error(error);
        }
      );
    },

    joingroup() {
      this.$http
        .post(`/api/joinproject`, {
          person_id: this.currentUser.Person_Id,
          code: this.groupcode,
        })
        .then(
          (response) => {
            alert(response.data);
            this.getprojects();
          },
          (error) => {
            console.error(error);
          }
        );
    },

    leaveproject(gi) {
      if (confirm("Are you sure you want to Leave the group ?")) {
        this.$http
          .post(`/api/leaveproject`, {
            person_id: this.currentUser.Person_Id,
            group_id: gi,
          })
          .then(
            (response) => {
              alert(response.data);
              this.getprojects();
            },
            (error) => {
              console.error(error);
            }
          );
      }
    },

    deleteproject(gi) {
      if (
        confirm(
          "Are you sure you want to Delete the group?. All the group members will be removed."
        )
      ) {
        this.$http
          .post(`/api/deleteproject`, {
            group_id: gi,
          })
          .then(
            (response) => {
              alert(response.data);
              this.getprojects();
            },
            (error) => {
              console.error(error);
            }
          );
      }
    },

    copyText(code) {
      navigator.clipboard.writeText(code);
    },
  },
};
</script>
<style scoped>
#box {
  padding-top: 10%;
  padding-right: 2%;
  padding-left: 2%;
}

.title {
  background-image: url("~@/assets/img_code.jpg");
  background-size: 100%;
}
</style>
