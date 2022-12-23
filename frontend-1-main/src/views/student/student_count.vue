<template>
  <div id="app">
    <div>
      <Page4></Page4>
    </div>
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
    <h1 class="text-center display-1">{{this.currentUser.college == 1?'VIIT':this.currentUser.college == 2?'VIT':'VU'}} Yearwise College Projects</h1>
    <div id="box">
      <v-card>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="row mb-3">
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'Director Year table',
                      params: { sts: 'FY', year: 'First Year' },
                    }"
                  >
                    <v-hover v-slot="{ hover }" open-delay="100"
                      ><v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                        <div class="card text-white bg-danger h-100">
                          <div class="card-body">
                            <div class="rotate">
                              <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">FIRST YEAR</h6>
                            <h1 class="display-4">{{ fys }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'Director Year table',
                      params: { sts: 'SY', year: 'Second Year' },
                    }"
                  >
                    <v-hover v-slot="{ hover }" open-delay="100"
                      ><v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                        <div class="card text-white bg-success h-100">
                          <div class="card-body">
                            <div class="rotate">
                              <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">SECOND YEAR</h6>
                            <h1 class="display-4">{{ sys }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'Director Year table',
                      params: { sts: 'TY', year: 'Third Year' },
                    }"
                  >
                    <v-hover v-slot="{ hover }" open-delay="100"
                      ><v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                        <div class="card text-white bg-info h-100">
                          <div class="card-body">
                            <div class="rotate">
                              <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">THIRD YEAR</h6>
                            <h1 class="display-4">{{ tys }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>

                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'Director Year table',
                      params: { sts: 'Btech', year: 'BTech' },
                    }"
                  >
                    <v-hover v-slot="{ hover }" open-delay="100"
                      ><v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                        <div class="card text-white bg-warning h-100">
                          <div class="card-body">
                            <div class="rotate">
                              <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">BTECH</h6>
                            <h1 class="display-4">{{ btechs }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br /><br /><br /><br /><br /><br />
        <div
          id="down"
          style="left: 55%; transform: translate(-50%, -50%)"
          class="col-md-3 col-sm-6 py-2"
        >
          <download-csv :data="exportdata">
            <v-btn right dark color="primary"
              ><v-icon left>mdi-download</v-icon>Download report</v-btn
            >
          </download-csv>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import Page4 from "../page4";
import JsonCSV from "vue-json-csv";
import Vue from "vue";
Vue.component("downloadCsv", JsonCSV);
export default {
  components: {
    Page4,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => ({
    fys: 0,
    sys: 0,
    tys: 0,
    btechs: 0,
    totals: 0,
    totaldata: "",
    exportdata: "",
  }),
  mounted() {
    //this.getdata()
    this.loggedin();
    this.getdata();
    this.getdataexport();
  },
  methods: {
    getdata() {
      this.$http
        .get(`/api/getstud/${this.currentUser.college}`)
        .then((result) => {
          //console.log(result.data);
          this.totaldata = result.data;
          this.fys = this.totaldata.FY[0];
          this.sys = this.totaldata.SY[0];
          this.tys = this.totaldata.TY[0];
          this.btechs = this.totaldata.Btech[0];
        });
    },
    getdataexport() {
      this.$http.get(`/api/yearstableall/${this.currentUser.college}`).then(
        (result) => {
          console.log(result.data);
          this.exportdata = result.data;
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
      if (
        this.currentUser.roles == "ROLE_DIRECTOR" ||
        this.currentUser.roles == "ROLE_MANAGEMENT"
      ) {
        console.log();
      } else {
        this.logOut();
      }
    },
  },
};
</script>

<style scoped>
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
