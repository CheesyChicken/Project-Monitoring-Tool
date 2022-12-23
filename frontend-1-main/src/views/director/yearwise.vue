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
    <div id="box">
        <h1 class="text-center display-1"> {{this.currentUser.college == 1?'VIIT':this.currentUser.college == 2?'VIT':'VU'}} Yearwise Student Count</h1>
      <v-card>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="row mb-3">
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'Year Students',
                      params: { year: 'FY' },
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
                            <h1 class="display-4">{{ fys || 0 }}</h1>
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
                      name: 'Year Students',
                      params: { year: 'SY' },
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
                            <h1 class="display-4">{{ sys || 0}}</h1>
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
                      name: 'Year Students',
                      params: { year: 'TY' },
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
                            <h1 class="display-4">{{ tys || 0}}</h1>
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
                      name: 'Year Students',
                      params: { year: 'Btech' },
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
                            <h1 class="display-4">{{ btechs || 0}}</h1>
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
  }),
  mounted() {
    //this.getdata()
    this.loggedin();
    this.getdata();
  },
  methods: {
    getdata() {
      this.$http
        .get(`/api/yearwisestudent/${this.currentUser.college}`)
        .then((result) => {
          //console.log(result.data);
          this.totaldata = result.data;
          this.fys = this.totaldata.FY;
          this.sys = this.totaldata.SY;
          this.tys = this.totaldata.TY;
          this.btechs = this.totaldata.Btech;
        });
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
