<template>
  <div id="app">
    <div>
      <!-- <p>{{this.std[0].gid}}</p> -->
      <Page2
        :groupid="this.std.length > 0 ? this.std[0].gid : 0"
        :showproj="this.std.length > 0"
      ></Page2>
    </div>
    <v-container fluid class="ml-lg-5">
      <v-row id="box" v-if="stds.length == 0">
        <v-col md="12" class="text-center">
          <v-card class="pa-7 elevation-0" color="#f2f2f2">
            <h1 class="display-1">
              <v-icon size="45" class="blue--text">mdi-account-remove</v-icon>
              No Projects Assigned
            </h1>
            <h5 class="font-weight-light">
              No Group has been assigned to you for project as of now
            </h5>
            <h5 class="font-weight-light">
              Ask the group members to create a group to start assigning tasks
            </h5>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else class="mt-10">
        <v-col
          v-for="(item, index) in stds"
          v-bind:key="index"
          lg="3"
          md="4"
          xs="12"
          class="d-flex"
          style="flex-direction:column;"
        >
          <v-card class="my-2 mx-5 mx-md-0 flex-grow-1">
            <div :class="item.title" style="height:120px;">
              <v-card-title
                class="white--text text-uppercase pb-0"
                style="font-size:17px;word-break: break-word"
                >{{ item.gti }}
              </v-card-title>
              <div class="ml-4">
                <h6 class="white--text font-weight-light">{{ item.leader }}</h6>
              </div>
            </div>

            <v-card-text>
              <div class="my-1 text-subtitle-1 black--text">
                <strong>{{ item.gna }}</strong>
              </div>

              <div
                class="my-1 text-subtitle-1 black--text"
                style="min-height:80px;"
              >
                {{ item.Objective.slice(0, 100) }}..
              </div>
            </v-card-text>

            <div class="ml-3">
              <v-chip-group column class="d-inline">
                <v-chip
                  v-if="item.started != 0"
                  class="white--text"
                  :class="
                    item.status == 'Lagging'
                      ? 'error'
                      : item.status == 'Leading'
                      ? 'brown'
                      : 'success'
                  "
                  >{{ item.status }}</v-chip
                >

                <v-chip v-else class="brown white--text">Not Started</v-chip>

                <v-chip class="orange white--text"
                  >{{ item.due || 0 }} Tasks Due this Week</v-chip
                >

                <v-chip class="blue white--text"
                  >{{ item.done || 0 }} Tasks Submitted and Approved</v-chip
                >

                <v-chip class="red lighten-1 white--text"
                  >{{ item.waiting || 0 }} Submission Requests Pending</v-chip
                >
              </v-chip-group>
            </div>
            <v-card-actions class="mt-auto">
              <router-link
                v-if="item.started == 2"
                :to="{
                  name: 'Guide HomePage',
                  params: { id: item.gid, title: item.title },
                }"
                style="text-decoration: none"
              >
                <v-btn color="blue white--text" tile>
                  <v-icon> mdi-arrow-top-right </v-icon>
                  Show Tasks
                </v-btn>
              </router-link>
              <h6 class="red--text" v-else-if="item.started == 0" text>
                <v-icon class="mr-2 red--text"> mdi-clock </v-icon> Starting
                from
                {{ item.startdate }}
              </h6>
              <v-btn color="grey" v-else text>
                <v-icon class="mr-2"> mdi-clock </v-icon> Ended on
                {{ item.duedate }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Page2 from "../page2";
// import StartingError from "../../components/Startingerror1"

export default {
  data() {
    return {
      std: [],
      stds: [],
      isMonday: "01",
    };
  },
  components: {
    Page2,
    // StartingError,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "Faculty | Home";
  },

  mounted() {
    this.loggedin();
    this.gethome();
  },
  methods: {
    gethome() {
      this.$http.get(`/api/home/${this.currentUser.grno_EmpCode}`).then(
        (result) => {
          console.log("home");
          console.log(result.data);
          var td = result.data;
          var tg = [];
          for (let i = 0; i < td.length; i++) {
            tg[i] = td[i][0];
          }
          this.std = tg;
          this.std.forEach((element) => {
            element["due"];
            element["waiting"];
            element["done"];
            element["started"];
            element["startdate"];
            element["duedate"];
            element["status"];
          });
          if (this.std.length > 0) {
            this.getweek();
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    // getweek() {
    //   axios
    //     .get(`/api/noweek/${this.currentUser.grno_EmpCode}`)
    //     .then(
    //       (result) => {
    //         console.log("result ");
    //         console.log(result.data);
    //         var datas = result.data;
    //         console.log("datas");
    //         console.log(datas);
    //         // if (datas[0] === "00") {
    //         //   // this.std[0]["isMonday"] = "00";
    //         //   this.isMonday = "00";
    //         // } else {
    //         // var i = 0;
    //         let p = 1;
    //         this.std.forEach((element) => {
    //           console.log(element.gid);
    //           element["title"] = "title"+p;
    //           p = p%2 + 1;
    //           if (datas[element["gid"]][0] === "00") {
    //             element["isMonday"] = "00";
    //             element["startweekdate"] = datas[element["gid"]][1];
    //           } else if (datas[element["gid"]][0] === "02") {
    //             element["isMonday"] = "02";
    //             element["dueweekdate"] = datas[element["gid"]][1];
    //           } else {
    //             element["week"] = datas[element["gid"]][0].week;
    //             element["waiting"] = datas[element["gid"]][0].waiting;
    //             element["done"] = datas[element["gid"]][0].done;
    //             element["isMonday"] = "01";
    //           }

    //           // i++;
    //         });
    //         this.stds = this.std;
    //         console.log("std");
    //         console.log(this.stds);
    //       },
    //       (error) => {
    //         console.error(error);
    //       }
    //     );
    // },

    getweek() {
      this.$http.get(`/api/noweek/${this.currentUser.grno_EmpCode}`).then(
        (result) => {
          console.log("result ");
          console.log(result.data);
          var datas = result.data;
          let p = 1;

          this.std.forEach((element) => {
            console.log(element.gid);
            element["title"] = "title" + p;
            p = (p % 5) + 1;

            element["due"] = datas[element.gid].duetasks;
            element["waiting"] = datas[element.gid].pending;
            element["done"] = datas[element.gid].approved;
            element["started"] = datas[element.gid].started;
            element["startdate"] = datas[element.gid].startDate;
            element["duedate"] = datas[element.gid].dueDate;
            element["status"] = datas[element.gid].status;

            // i++;
          });
          this.stds = this.std;
          console.log("std");
          console.log(this.stds);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
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
.underNav {
  margin-top: 50px;
}

.title1 {
  background-image: url("~@/assets/img_code.jpg");
  background-size: 100%;
}

.title2 {
  background-image: url("~@/assets/img_graduation.jpg");
  background-size: 100%;
}

.title3 {
  background-image: url("~@/assets/img_reachout.jpg");
  background-size: 100%;
}
.title4 {
  background-image: url("~@/assets/img_read.jpg");
  background-size: 100%;
}

.title5 {
  background-image: url("~@/assets/img_bookclub.jpg");
  background-size: 100%;
}
</style>
