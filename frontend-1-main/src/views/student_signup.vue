<template>
  <div id="app">
    <v-app-bar app class="elevation-0 white">
      <router-link to="/home" @click.prevent>
        <v-img
          src="../assets/PIMS1.png"
          alt=""
          srcset=""
          width="130"
          height="35"
        />
      </router-link>
      <v-app-bar-title
        class="text-uppercase d-none d-md-flex"
        name="Project_Title"
      >
        <div class="primary--text">Project monitoring system</div>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        rounded
         href="https://drive.google.com/file/d/12H8L6mPigbpElxt-1r0Rk3r_Dy6i3Glz/view?usp=sharing"        
        target="_blank"
        style="text-decoration: none">
        Need Help <v-icon>mdi-help</v-icon></v-btn
      >
      <div v-if="!loggedIn" class="navbar-nav ml-auto">
        <v-btn text rounded to="/login" style="text-decoration: none"
          >Login<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn
        >
      </div>
    </v-app-bar>
    <v-form @submit.prevent="handleRegister">
      <v-card class="card card-container my-10 text-center">
        <h1 class="display-1 text-center primary--text">Student Sign Up</h1>
        <v-card-text>
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <v-row>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <v-text-field
                v-model="user.FullName"
                v-validate="'required|min:3|max:20|alpha_spaces'"
                type="text"
                name="fullName"
                label="Full Name"
                prepend-icon="mdi-account-circle"
              />
              <v-alert
                v-if="submitted && errors.has('fullName')"
                color="red lighten-2"
                dark
              >
                {{ errors.first("fullName") }}
              </v-alert>
            </v-col>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <!-- <v-text-field
              v-model="user.username"
              v-validate="'required|min:3|max:10'"
              type="text"
              name="username"
              label="Username"
              prepend-icon="mdi-account-circle"
            /> -->
              <v-text-field
                v-model="user.username"
                v-validate="{
                  required: true,
                  min: 3,
                  max: 15,
                  regex: /^[A-Za-z][a-zA-Z0-9._]*$/,
                }"
                type="text"
                name="username"
                label="Username"
                prepend-icon="mdi-account-circle"
              />
              <v-alert
                v-if="submitted && errors.has('username')"
                color="red lighten-2"
                dark
              >
                {{ errors.first("username") }}
              </v-alert>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <!-- <v-text-field
              v-model="user.email"
              v-validate="'required|email'"
              type="email"
              name="email"
              label="Email"
              prepend-icon="mdi-email"
            /> -->
              <v-text-field
                v-model="user.email"
                v-validate="{
                  required: true,
                  regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(viit.ac.in|vit.edu)\b/,
                }"
                type="email"
                name="email"
                label="Email"
                prepend-icon="mdi-email"
              />
              <!-- old email :regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|in|edu)\b/ -->
              <v-alert
                v-if="submitted && errors.has('email')"
                color="red lighten-2"
                dark
              >
                {{ errors.first("email") }}
              </v-alert>
            </v-col>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <v-text-field
                id="GRNUMBER"
                label="GR Number"
                v-model="user.grno_EmpCode"
                v-validate="{
                  required: true,
                  min: 3,
                  max: 10,
                  regex: /^[a-zA-Z0-9]*[0-9]$/,
                }"
                type="string"
                prepend-icon="mdi-badge-account-horizontal"
                name="grno_EmpCode"
              />
              <v-alert
                v-if="submitted && errors.has('grno_EmpCode')"
                color="red lighten-2"
                dark
              >
                {{ errors.first("grno_EmpCode") }}
              </v-alert>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <!-- <v-text-field
              v-model="user.Mobile"
              v-validate="'required|min:3|max:20'"
              type="string"
              name="mobile"
              label="Mobile Number"
              prepend-icon="mdi-cellphone"
            /> -->
              <v-text-field
                v-model="user.Mobile"
                v-validate="{
                  required: true,
                  regex: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                }"
                type="string"
                name="mobile"
                label="Mobile Number"
                prepend-icon="mdi-cellphone"
              />
              <v-alert
                v-if="submitted && errors.has('mobile')"
                color="red lighten-2"
                dark
              >
                {{ errors.first("mobile") }}
              </v-alert>
            </v-col>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <v-select
                label="College Name"
                name="college_id"
                :items="colleges"
                item-text="College_Name"
                item-value="College_id"
                @input="onChange12()"
                v-model="user.college"
                prepend-icon="mdi-school"
                v-validate="'required'"
              >
              </v-select>
              <v-alert
                v-if="submitted && errors.has('college_id')"
                color="red lighten-2"
                dark
              >
                College Name Must be selected
              </v-alert>
            </v-col>
          </v-row>

          <v-select
            :items="departments"
            item-text="Department_Name"
            item-value="Department_id"
            name="department_id"
            v-model="user.department"
            label="Department"
            prepend-icon="mdi-school"
            v-validate="'required'"
          >
          </v-select>
          <v-alert
            v-if="submitted && errors.has('department_id')"
            color="red lighten-2"
            dark
          >
            Department Must be selected
          </v-alert>

          <v-row>
            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <!-- <v-text-field
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            /> -->
              <v-text-field
                v-model="user.password"
                v-validate="{
                  required: true,
                  min: 8,
                  regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
                }"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Password"
                ref="password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
              <v-alert v-if="errors.has('password')" color="red lighten-2" dark>
                {{ errors.first("password") }}
              </v-alert>
            </v-col>

            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
              <!-- <v-text-field
              v-model="cnfpassword"
              v-validate="'required|min:6|max:40'"
              :type="cshowPassword ? 'text' : 'password'"
              name="cnfpassword"
              label="Confirm Password"
              prepend-icon="mdi-lock"
              :append-icon="cshowPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="cshowPassword = !cshowPassword"
            /> -->
              <v-text-field
                v-model="cnfpassword"
                v-validate="'confirmed:password'"
                data-vv-as="password"
                :type="cshowPassword ? 'text' : 'password'"
                name="cnfpassword"
                label="Confirm Password"
                prepend-icon="mdi-lock"
                :append-icon="cshowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="cshowPassword = !cshowPassword"
              />
              <v-alert
                v-if="errors.has('cnfpassword')"
                color="red lighten-2"
                dark
              >
                {{ errors.first("cnfpassword") }}
              </v-alert>
              <!-- <v-alert
              v-if="
                submitted &&
                (errors.has('password') || user.password != cnfpassword)
              "
              color="red lighten-2"
              dark
            >
              PASSWORD'S DOESN'T MATCH
            </v-alert> -->
            </v-col>
          </v-row>

          <v-btn type="submit" tile outlined class="info white--text mr-10"
            >Create Account</v-btn
          >
          <v-btn tile outlined class="error white--text" to="/login"
            >Cancel</v-btn
          >
        </v-card-text>
      </v-card>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allguides: [],
      colleges: [],
      departments: [],
      user: {},
      cnfpassword: "",
      cshowPassword: false,
      showPassword: false,
      submitted: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    this.getcolleges();
    // this.getdepartments();
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister() {
      this.user.roles = 1;
      this.message = "";
      this.submitted = true;
      this.user.email = this.user.email.trim().toLowerCase();
      this.user.username = this.user.username.trim();
      this.user.password = this.user.password.trim();
      this.$validator.validate().then((isValid) => {
        if (isValid && this.user.password == this.cnfpassword) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.message = data.message;
              alert(this.message);
              this.$router.push("/login");
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              console.log(this.message);
              console.log(error.response.data);
              console.log(error.response);
              alert("USER ALREADY REGISTERED ");
            }
          );
        }
      });
    },
    getcolleges() {
      this.$http.get(`/api/college`).then(
        (result) => {
          console.log(result.data);
          this.colleges = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getdepartments(cl) {
      this.$http.get(`/api/department/${cl}`).then(
        (result) => {
          console.log(result.data);
          this.departments = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    onChange12() {
      this.department = [];
      this.typeProject = [];
      this.clg = this.user.college;
      this.getdepartments(this.clg);
      this.gettypes(this.clg);
    },

    cancelMember() {
      this.$emit("changeMem");
    },
  },
};
</script>
<style scoped>
.navbar-brand > img {
  height: 40px;
}
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 800px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 10px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

#app {
  width: 100%;
}
</style>
