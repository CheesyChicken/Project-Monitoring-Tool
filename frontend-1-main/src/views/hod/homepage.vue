<template>
  <div id="app">
    <div>
      <Page3></Page3>
    </div>

    <div id="box">
      <div class="row">
        <div class="col-1"></div>
        <div class="col-10">
          <v-card class="pa-3">
            <h1 class="text-center display-1 my-3">{{ this.depa }}</h1>
            <div class="container">
              <div class="row mb-3">
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'HOD allTask',
                      params: { stat: '3', depa: this.dep },
                    }"
                  >
                    <div class="card text-white bg-primary h-100">
                      <div class="card-body bg-success">
                        <div class="rotate">
                          <i class="fa fa-twitter fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">Leading Projects</h6>
                        <h1 class="display-4">{{ leading }}</h1>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="col-md-3 col-sm-6 py-2">
                  <router-link
                    style="text-decoration: none; color: inherit"
                    :to="{
                      name: 'HOD allTask',
                      params: { stat: '2', depa: this.dep },
                    }"
                  >
                    <div class="card text-white bg-success h-100">
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
                    :to="{
                      name: 'HOD allTask',
                      params: { stat: '1', depa: this.dep },
                    }"
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
                    :to="{
                      name: 'HOD allTask',
                      params: { stat: '4', depa: this.dep },
                    }"
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
                  </router-link>
                </div>

                <div class="col-md-4 col-sm-6 py-2"></div>
                <div class="col-md-4 col-sm-6 py-2">
                  <div class="card text-white bg-dark h-100">
                    <div class="card-body">
                      <div class="rotate">
                        <i class="fa fa-share fa-4x"></i>
                      </div>
                      <h6 class="text-uppercase">Students in project module</h6>
                      <h1 class="display-4">{{ students }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page3 from "../page3";

export default {
  components: {
    Page3,
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "HOD | Home";
  },
  data() {
    return {
      dep: "",
      clg: "",
      std: [],
      total: "0",
      leading: "0",
      lagging: "0",
      ontime: "0",
      depa: "",
      students: "0",
      chartData: {},
    };
  },
  mounted() {
    this.clgdep();
    this.loggedin();
    this.getdata();
    this.getperson();
  },
  methods: {
    clgdep() {
      this.clg = this.currentUser.college;
      this.dep = this.currentUser.department;
      console.log(this.clg);
      console.log(this.dep);
    },
    getdata() {
      this.$http.get(`/api/hod/${this.clg}/${this.dep}`).then(
        (result) => {
          console.log(result.data);
          this.std = result.data;
          this.total = this.std[0].clg;
          this.lagging = this.std[0].lag;
          this.leading = this.std[0].led;
          this.ontime = this.std[0].ont;
          this.depa = this.std[0].department;
          this.cllg = this.std[0].collage;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getperson() {
      this.$http.get(`/api/hodgroups/${this.clg}/${this.dep}`).then(
        (result) => {
          console.log(result.data);
          var stds = result.data;
          this.students = stds[0].total;
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
      if (this.currentUser.roles != "ROLE_HOD") {
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
