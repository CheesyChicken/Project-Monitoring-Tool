<template>
  <div id="app">
    <div>
      <Page5></Page5>
    </div>

    <div id="box">
      <v-card>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="row mb-3">
                
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    to="/management/allProjects/3"
                  >
                    <div class="card text-white bg-success h-100">
                      <div class="card-body bg-success">
                        <div class="rotate">
                          <i class="fa fa-twitter fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Leading Projects</h6>
                        <h1 class="display-4">{{ ledding }}</h1>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    to="/management/allProjects/2"
                  >
                    <div class="card text-white bg-warning h-100">
                      <div class="card-body bg-warning">
                        <div class="rotate">
                          <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Ontime Projects</h6>
                        <h1 class="display-4">{{ ontime }}</h1>
                      </div>
                    </div>
                  </router-link>
                </div>

                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    to="/management/allProjects/1"
                  >
                    <div class="card bg-danger text-white h-100">
                      <div class="card-body bg-danger">
                        <div class="rotate">
                          <i class="fa fa-user fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Lagging Projects</h6>
                        <h1 class="display-4">{{ lagging }}</h1>
                      </div>
                    </div>
                  </router-link>
                </div>
                

                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    to="/management/allProjects/4"
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
                            <h1 class="display-4">{{ total }}</h1>
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
                      <th scope="col">College</th>
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
                    <tr>
                      <th scope="row">1</th>
                      <td>
                        <router-link
                          :to="{
                            name: 'Management Director',
                            params: { clg: 1, clgname: 'VIIT' },
                          }"
                          >VIIT</router-link
                        >
                      </td>
                      <td>{{ stds[0].viitlagind }}</td>
                      <td>{{ stds[0].viitinhlag }}</td>
                      <td>{{ stds[0].viitontind }}</td>
                      <td>{{ stds[0].viitinhont }}</td>
                      <td>{{ stds[0].viitledind }}</td>
                      <td>{{ stds[0].viitinhled }}</td>
                      <td>{{ stds[0].viit }}</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>
                        <router-link
                          :to="{
                            name: 'Management Director',
                            params: { clg: 2, clgname: 'VIT' },
                          }"
                          >VIT</router-link
                        >
                      </td>
                      <td>{{ stds[0].vitlagind }}</td>
                      <td>{{ stds[0].vitinhlag }}</td>
                      <td>{{ stds[0].vitontind }}</td>
                      <td>{{ stds[0].vitinhont }}</td>
                      <td>{{ stds[0].vitledind }}</td>
                      <td>{{ stds[0].vitinhled }}</td>
                      <td>{{ stds[0].vit }}</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>
                        <router-link
                          :to="{
                            name: 'Management Director',
                            params: { clg: 3, clgname: 'VU' },
                          }"
                          >VU</router-link
                        >
                      </td>
                      <td>{{ stds[0].vulagind }}</td>
                      <td>{{ stds[0].vuinhlag }}</td>
                      <td>{{ stds[0].vuontind }}</td>
                      <td>{{ stds[0].vuinhont }}</td>
                      <td>{{ stds[0].vuledind }}</td>
                      <td>{{ stds[0].vuinhled }}</td>
                      <td>{{ stds[0].vu }}</td>
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
  created() {
    document.title = "Home";
  },
  data() {
    return {
      dep: "",
      clg: "",
      std: [],
      stds: [],
      total: "",
      ledding: "",
      lagging: "",
      ontime: "",
      depa: "",
      vit: [],
      viit: [],
      vu: [],
      chartData: {},
    };
  },
  mounted() {
    this.loggedin();
    this.gethomedata();
    this.gethometable();
  },
  methods: {
    gethomedata() {
      this.$http.get(`/api/management`).then(
        (result) => {
          console.log(result.data);
          this.std = result.data;
          this.total = this.std[0].clg;
          this.lagging = this.std[0].lag;
          this.ledding = this.std[0].led;
          this.ontime = this.std[0].ont;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    gethometable() {
      this.$http.get(`/api/hometablemanagement`).then(
        (result) => {
          console.log(result.data);
          this.stds = result.data;
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
<style scoped>
.underNav {
  margin-top: 50px;
}
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
