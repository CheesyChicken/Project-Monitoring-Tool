<template>
  <div id="app">
    <div>
      <Page5></Page5>
      <br /><br />
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
    </div>

    <div class="card card-container" id="box">
      <h2 style="text-align: center">Add Company</h2>
      <br />
      <div>
        <form name="form" @submit.prevent="addCompany()">
          <div class="form-group">
            <label for="CompanyName">Name of the Company</label>
            <input
              v-model="Company_Name"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="CompanyName"
            />
            <div
              v-if="errors.has('CompanyName')"
              class="alert alert-danger"
              role="alert"
            >
              Company Name is required!
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              <span>ADD COMPANY</span>
            </button>
          </div>
        </form>
      </div>
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
    document.title = "Add Company";
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
      Company_Name: "",
      loading: false,
    };
  },
  mounted() {
    this.loggedin();
  },
  methods: {
    addCompany: async function() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        if (this.Company_Name) {
          this.$http.post(`/api//addcmp/${this.Company_Name}`);
        }

        alert("ADDED SUCESSFULLY");
        this.Company_Name = "ADD MORE";
      });
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

.card-container.card {
  max-width: 500px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
#app {
  
}
</style>
