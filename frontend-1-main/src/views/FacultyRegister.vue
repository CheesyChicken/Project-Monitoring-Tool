<template>
  <v-container fluid>
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
        
      >
      
        Need Help <v-icon>mdi-help</v-icon></v-btn
      >
      <div v-if="!loggedIn" class="navbar-nav ml-auto">
        <v-btn text rounded to="/login" style="text-decoration: none"
          >Login<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn
        >
      </div>
    </v-app-bar>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12" v-show="verified">
          <v-row class="fill-height">
            <v-col cols="12" md="4" class="primary accent-3">
              <v-card-text v-if="!successful" class="white--text mt-12">
                <!-- <h1 class="text-center display-1">Group Sign Up</h1> -->

                <h5 class="text-center font-weight-light">
                  PIMS makes it easier to monitor the progress of the projects
                  and assign tasks to the students.
                </h5>
                <h5 class="text-center font-weight-light mt-10">
                  Add your details to get started with your project monitoring
                  workflow.
                </h5>
              </v-card-text>
              <v-card-text v-else class="white--text mt-12">
                <!-- <h1 class="text-center display-1">Group Sign Up</h1> -->

                <h5 class="text-center font-weight-light">
                  Your Faculty registration was Successfull
                </h5>
                <h5 class="text-center font-weight-light mt-10">
                  Login to your Account to start your workflow
                </h5>
              </v-card-text>
            </v-col>

            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h2 class="text-center display-1 primary--text text--accent-3">
                  Faculty Sign Up
                </h2>

                <h5 class="text-center mt-4 font-weight-light">
                  Select your college and department along with your Employee
                  code to get started
                </h5>
                <v-form @submit.prevent="handleRegister">
                  <div v-if="!successful">
                    <v-row>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <div class="form-group">
                          <!-- <label for="username">Username</label> -->
                          <v-text-field
                            v-model="user.username"
                            v-validate="{
                              required: true,
                              min: 3,
                              max: 15,
                              regex: /^[a-z][a-zA-Z0-9._]*$/,
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
                        </div></v-col
                      >
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <div class="form-group">
                          <!-- <label for="fullName">FullName</label> -->
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
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                        ><div class="form-group">
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
                          <v-alert
                            v-if="submitted && errors.has('email')"
                            color="red lighten-2"
                            dark
                          >
                            {{ errors.first("email") }}
                          </v-alert>
                        </div></v-col
                      >
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                        ><div class="form-group">
                          <!-- <label for="grno_EmpCode">Employee Code</label> -->
                          <v-text-field
                            v-model="user.grno_EmpCode"
                            v-validate="{
                              required: true,
                              min: 3,
                              max: 10,
                              regex: /^[a-zA-Z0-9]*[0-9]$/,
                            }"
                            type="string"
                            name="grno_EmpCode"
                            label="Employee Code"
                            prepend-icon="mdi-badge-account-horizontal"
                          />
                          <v-alert
                            v-if="submitted && errors.has('grno_EmpCode')"
                            color="red lighten-2"
                            dark
                          >
                            {{ errors.first("grno_EmpCode") }}
                          </v-alert>
                        </div></v-col
                      >
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                        ><div class="form-group">
                          <v-text-field
                            v-model="user.Mobile"
                            v-validate="{
                              required: true,
                              min: 10,
                              max: 15,
                              regex: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                            }"
                            type="string"
                            name="mobile"
                            label="Mobile Number"
                            prepend-icon="mdi-cellphone"
                          />
                          <!-- new: ^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$
                        This will support the following formats:

                        8880344456
                        +918880344456
                        +91 8880344456
                        +91-8880344456
                        08880344456
                        918880344456 -->
                          <!-- //old /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/ -->
                          <v-alert
                            v-if="submitted && errors.has('mobile')"
                            color="red lighten-2"
                            dark
                          >
                            {{ errors.first("mobile") }}
                          </v-alert>
                        </div></v-col
                      >
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <v-select
                          label="College Name"
                          name="category_id"
                          :items="colleges"
                          item-text="College_Name"
                          item-value="College_id"
                          @input="onChange12()"
                          v-model="user.college"
                          prepend-icon="mdi-school"
                          v-validate="'required'"
                        >
                        </v-select
                      ></v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                        ><v-select
                          :items="departments"
                          item-text="Department_Name"
                          item-value="Department_id"
                          name="category_id"
                          v-model="user.department"
                          label="Department"
                          prepend-icon="mdi-school"
                          v-validate="'required'"
                        >
                        </v-select></v-col
                      ><v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <div class="form-group">
                          <v-text-field
                            v-model="user.password"
                            v-validate="{
                              required: true,
                              min: 10,
                              regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/,
                            }"
                            :type="showPassword ? 'text' : 'password'"
                            name="password"
                            label="Password"
                            ref="password"
                            prepend-icon="mdi-lock"
                            :append-icon="
                              showPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="showPassword = !showPassword"
                          />
                          <v-alert
                            v-if="submitted && errors.has('password')"
                            color="red lighten-2"
                            dark
                          >
                            {{ errors.first("password") }}
                          </v-alert>
                        </div></v-col
                      >
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <div class="form-group">
                          <v-text-field
                            v-model="cnfpassword"
                            v-validate="'confirmed:password'"
                            :type="cshowPassword ? 'text' : 'password'"
                            name="cnfpassword"
                            label="Confirm Password"
                            data-vv-as="password"
                            prepend-icon="mdi-lock"
                            :append-icon="
                              cshowPassword ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            @click:append="cshowPassword = !cshowPassword"
                          />
                          <v-alert
                            v-if="submitted && errors.has('cnfpassword')"
                            color="red lighten-2"
                            dark
                          >
                            {{ errors.first("cnfpassword") }}
                          </v-alert>
                        </div></v-col
                      ></v-row
                    >

                    <v-card-actions class="px-10 mx-10">
                      <v-btn
                        class="info"
                        @click="handleRegister"
                        tile
                        dark
                        outlined
                        >Sign Up</v-btn
                      >
                      <v-spacer></v-spacer>
                      <router-link to="/login" class="nav-link">
                        <v-btn class="error" tile dark outlined>cancel</v-btn>
                      </router-link>
                    </v-card-actions>
                  </div>
                </v-form>
                <div
                  v-if="message"
                  class="alert"
                  :class="successful ? 'alert-success' : 'alert-danger'"
                >
                  {{ message }}
                </div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="elevation-12 mt-10" v-show="!verified">
          <v-row class="fill-height">
            <v-col cols="12" md="4" class="primary accent-3">
              <v-card-text class="white--text mt-12">
                <h5 class="text-center font-weight-light">
                  Please make sure you enter the Faculty Name and Access Code as
                  it is provided by the department
                </h5>
                <h5 class="text-center font-weight-light mt-10">
                  Verify yourself to proceed to Faculty SignUp
                </h5>
              </v-card-text>
            </v-col>

            <v-col cols="12" md="8">
              <v-card-text class="mt-12">
                <h2 class="text-center display-1 primary--text text--accent-3">
                  Lets get you Verified!
                </h2>

                <h5 class="text-center mt-4 font-weight-light">
                  Enter the Faculty Name and Access Code as provided for Faculty
                  Verification
                </h5>
                <v-form @submit.prevent="handleRegister">
                  <div>
                    <v-row>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <div class="form-group">
                          <!-- <label for="username">Username</label> -->
                          <v-text-field
                            v-model="facultyName"
                            type="text"
                            name="accessname"
                            label="Faculty Name"
                            prepend-icon="mdi-account-circle"
                          /></div
                      ></v-col>
                      <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                        <div class="form-group">
                          <!-- <label for="fullName">FullName</label> -->
                          <v-text-field
                            v-model="accessCode"
                            type="text"
                            name="accesscode"
                            label="Access Code"
                            prepend-icon="mdi-key"
                          />
                        </div>
                      </v-col>
                    </v-row>

                    <v-card-actions class="px-10 mx-10">
                      <v-btn
                        class="info"
                        @click="verifyFaculty"
                        tile
                        dark
                        outlined
                        >Verify</v-btn
                      >
                      <v-spacer></v-spacer>
                      <router-link to="/login" class="nav-link">
                        <v-btn class="error" tile dark outlined>cancel</v-btn>
                      </router-link>
                    </v-card-actions>
                  </div>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "../models/user";
export default {
  name: "FacultyRegister",
  props: {
    source: String,
  },
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      colleges: [],
      departments: [],
      cnfpassword: "",
      successful: false,
      message: "",
      college: "",
      showPassword: false,
      cshowPassword: false,
      verified: false,
      facultyName: "",
      accessCode: "",
    };
  },
  created() {
    document.title = "Faculty Sign Up";
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    this.getcolleges();
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    accessCodeUsed() {
      this.$http
        .post(`/api/accesscodeused`, {
          accesscode: this.accessCode,
        })
        .then();
    },

    handleRegister() {
      this.user.roles = 3;
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid && this.user.password == this.cnfpassword) {
          console.log(this.user);
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              // console.log('USER');
              // console.log(this.user)
              // console.log('USERENDED ');
              this.message = data.message;
              this.accessCodeUsed();
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    },
    onChange12() {
      this.department = [];
      var clg = this.user.college;
      console.log(clg);
      this.getdepartments(clg);
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

    verifyFaculty() {
      this.$http.get(`/api/verify/${this.facultyName}/${this.accessCode}`).then(
        (result) => {
          console.log("Access ");
          console.log(result.data);
          if (result.data.length > 0 && result.data[0].used == 0) {
            this.verified = true;
          } else if (result.data.length == 0) {
            this.verified = false;
            alert(
              "Faculty Name or Access Code entered is incorrect. Please try again"
            );
          } else if (result.data[0].used == 1) {
            this.verified = false;
            alert(
              "This Access Code is already Used. Please contact the System Department to proceed"
            );
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>
