<template>
  <div id="app">
    <div>
      <Page5></Page5>
    </div>
    <v-btn
      to="/management"
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <div id="box">
      <h1 class="text-center display-1" v-if="this.$route.params.clg == '1'">
        Vishwakarma Institute of Information Technology
      </h1>
      <h1
        class="text-center display-1"
        v-else-if="this.$route.params.clg == '2'"
      >
        Vishwakarma Institute of Technology
      </h1>
      <h1
        class="text-center display-1"
        v-else-if="this.$route.params.clg == '3'"
      >
        Vishwakarma University
      </h1>

      <v-card>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="row mb-3">
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'Director table', params: { sts: 3 } }"
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
                            <h6 class="text-uppercase">LEADING Projects</h6>
                            <h1 class="display-4">{{ leading || 0 }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'Director table', params: { sts: 2 } }"
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
                            <h6 class="text-uppercase">ONTIME Projects</h6>
                            <h1 class="display-4">{{ ontime || 0 }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'Director table', params: { sts: 1 } }"
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
                            <h6 class="text-uppercase">LAGGING Projects</h6>
                            <h1 class="display-4">{{ lagging || 0 }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>

                
                

                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{ name: 'Director allProjects' }"
                  >
                    <v-hover v-slot="{ hover }" open-delay="100"
                      ><v-card
                        :elevation="hover ? 16 : 2"
                        :class="{ 'on-hover': hover }"
                      >
                        <div class="card text-white bg-primary h-100">
                          <div class="card-body">
                            <div class="rotate">
                              <i class="fa fa-share fa-4x"></i>
                            </div>
                            <h6 class="text-uppercase">Total Projects</h6>
                            <h1 class="display-4">{{ total || 0 }}</h1>
                          </div>
                        </div>
                      </v-card>
                    </v-hover>
                  </router-link>
                </div>
              </div>
            </div>

            <div class="container-fluid">
              <div style="border: 1px solid black margin">
                <table class="table">
                  <thead>
                    <tr scope="row" rowspan="2">
                      <th scope="col">Sr.No</th>
                      <th scope="col">Department</th>
                      <th scope="col2" colspan="2">Lagging</th>
                      <th scope="col2" colspan="2">OnTime</th>
                      <th scope="col2" colspan="2">Leading</th>
                      <th scope="col">Total</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      <th scope="col">Industrial</th>
                      <th scope="col">Research</th>
                      <th scope="col">Industrial</th>
                      <th scope="col">Research</th>
                      <th scope="col">Industrial</th>
                      <th scope="col">Research</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in stgs" v-bind:key="index">
                      <th scope="row">{{ ++index }}</th>
                      <td>
                        <router-link
                          :to="{
                            name: 'Management HOD',
                            params: {
                              dep: item.Department_id,
                              depname: item.Department_Name,
                            },
                          }"
                          >{{ item.Department_Name }}</router-link
                        >
                      </td>
                      <td>{{ item.lagind }}</td>
                      <td>{{ item.laginh }}</td>
                      <td>{{ item.ontind }}</td>
                      <td>{{ item.ontinh }}</td>
                      <td>{{ item.ledind }}</td>
                      <td>{{ item.ledinh }}</td>
                      <td>{{ item.totaldep }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import Page5 from "../page5";

export default {
  components: {
    Page5,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      dep: "",
      clg: "",
      total: "",
      lagging: "",
      ontime: "",
      leading: "",
      std: [],
      stgs: [],
      chartData: {},
      college: "",
    };
  },
  created() {
    this.college = this.$route.params.clg;
    document.title = this.$route.params.clgname + "  |   Projects";
  },
  mounted() {
    this.getdata();
    this.gettable();
    this.loggedin();
  },
  watch: {
    "$route.params.clg": {
      handler() {
        this.college = this.$route.params.clg;
        this.mounted();
      },
    },
  },
  methods: {
    getdata() {
      this.$http.get(`/api/homedir/${this.college}`).then(
        (result) => {
          console.log(result.data);
          this.std = result.data;
          this.total = this.std[0].clg;
          this.lagging = this.std[0].lag;
          this.leading = this.std[0].led;
          this.ontime = this.std[0].ont;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    gettable() {
      this.$http.get(`/api/hometabledir/${this.college}`).then(
        (result) => {
          console.log(result.data);
          var stds = result.data;
          var stg = [];
          for (let i = 0; i < stds.length; i++) {
            stg[i] = stds[i][0];
          }

          this.stgs = stg;
          this.depa = this.stgs[0].department;
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
      if (this.currentUser.roles != "ROLE_MANAGEMENT") {
        this.logOut();
      }
    },
  },
};
</script>
<style>
.underNav {
  margin-top: 50px;
}
#box {
  padding-top: 0%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
