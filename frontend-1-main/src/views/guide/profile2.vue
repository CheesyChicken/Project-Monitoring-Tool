<template>
  <div id="app">
    <Page2 :groupid="this.groupid" :showproj="this.showprojectdetails"></Page2>
    <!-- <p>{{this.profile.length}}</p> -->
    
    <div id="box">
      <v-btn
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
      @click="
        () => {
          this.$router.go(-1);
        }
      "
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
      <Profile :rejectedTasks="rejected"></Profile>
      <!-- ------------------------------------------------------------------------------------ -->
      <h4 class="display-1 row justify-content-center mb-3">
        Projects Assigned
      </h4>
      <div class="row offset-md-2">
        <v-card
          v-for="(item, index) in profile"
          v-bind:key="item.gid"
          class="col-md-3 col-sm-6 col-11 mx-4 mx-md-2 mb-4"
          style="background-color: #f2f2f2;"
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">Project {{ ++index }}</div>
              <v-list-item-title class="text-h6 mb-1">
                {{ item.gti }}
              </v-list-item-title>
              <v-list-item class="pl-0">{{ item.gna }}</v-list-item>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-btn
              v-if="item.typname == `Research`"
              class="blue white--text"
              outlined
              rounded
              text
              >{{ item.typname }}
            </v-btn>
            <v-btn v-else class="deep-orange white--text" outlined rounded text
              >{{ item.typname }}
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- <v-card
            v-for="(item, index) in profile"
            v-bind:key="item.Group_id"
            class="pa-3 mb-3 mt-1 ml-2  col-md-4" style="background-color:#d6d6c2;"
          >
            <h4 class="font-weight-light">Project {{ ++index }}</h4>
            <div class="row">
              <div class="col-12">
                  <p><v-icon class="blue--text">mdi-file</v-icon><b> Project Title</b></p>
                  <b-form-input disabled v-model="item.gti"></b-form-input>
                  <h5 class="font-weight">{{item.gti}}</h5>
                
              </div>
            </div>

            <div class="row">
              <div class="col-7">
                <p><v-icon class="blue--text">mdi-file</v-icon><b> Project Title</b></p>
                <h6>{{item.gna}}</h6>
                  <b-form-input disabled v-model="item.gna"></b-form-input>
                
              </div>

              <div class="col-5">
                  <p><v-icon class="blue--text">mdi-home-modern</v-icon><b> Project Type</b></p>
                  <b-form-input disabled v-model="item.typname"></b-form-input>
                  <h6 >{{item.typname}}</h6>
                
              </div>

              <b-list-group
                v-for="(item, index) in std"
                v-bind:key="index"
                style="max-width: 300px"
              >
                <b-list-group-item
                  variant="light"
                  class="d-flex align-items-center"
                  
                >
                  <span class="mr-auto"
                    ><h6>{{ item.FullName }}</h6>
                    <small class="float-left">{{ item.username }}</small>
                  </span>
                </b-list-group-item>
              </b-list-group>
            </div>
          </v-card> -->

        <!-- ------------------------------------------------------------------------------------------------------- -->
      </div>

      <div class="col-xl-0 col-lg-1 col-md-1"></div>
    </div>
  </div>
</template>
<script>
import Page2 from "../page2";
import Profile from "../../components/Profile";

export default {
  components: {
    Page2,
    Profile,
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "Faculty | Profile";
  },
  data: () => {
    return {
      datas: [],
      tod: [],
      FullName: "",
      Mobile: "",
      Email: "",
      College: "",
      Department: "",
      profile: [],
      allstudent: [],
      std: [],
      rejected: 0,
      showprojectdetails: false,
      groupid: "",
    };
  },
  mounted() {
    this.addDate();
    this.getprofile();
    this.getgroups();
    this.getrejectedtasks();
  },
  methods: {
    addDate() {
      this.FullName = this.currentUser.FullName;
      this.Mobile = this.currentUser.Mobile;
      this.Email = this.currentUser.email;
    },

    getprofile() {
      this.$http.get(`/api/guideprofile/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var profile = result.data;
          this.Department = profile[0].Department_Name;
          this.College = profile[0].College_Name;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getgroups() {
      let i = 0;
      this.$http
        .get(`/api/guidegroupsprofile/${this.currentUser.Person_Id}`)
        .then(
          (result) => {
            console.log(result.data);
            var dt = result.data;
            var pro = [];
            for (i = 0; i < dt.length; i++) {
              pro[i] = dt[i][0];
            }
            while (Number(i) == Number(dt.length)) {
              this.profile = pro;
              console.log(this.profile);
              if (this.profile.length > 0) {
                this.showprojectdetails = true;
                this.groupid = this.profile[0].gid;
              }
              return;
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    getform() {
      this.$http.get(`/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          //console.log(result.data);
          this.tod = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getrejectedtasks() {
      let i = 0;
      this.$http.get(`/api/rejectedtask/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log("result");
          console.log(result.data);
          var rejs = result.data;
          var tr = 0;
          for (let j = 0; j < rejs.length; j++) {
            var ty = rejs[i][0].id;
            tr = Number(ty) + Number(tr);
            i++;
          }
          while (Number(i) == Number(rejs.length)) {
            this.rejected = tr;
            return;
          }
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
  },
};
</script>
<style scoped>
#box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
>
<style></style>
