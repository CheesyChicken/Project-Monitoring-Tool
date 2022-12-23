<template>
  <div id="app" style="background-color:#f2f2f2; min-height: 100vh">
    <!-- <v-app-bar app style="background-color: white;width:" light class="elevation-0">
      <router-link to="/home" @click.prevent>
        <v-img
          src="../assets/PIMS1.png"
          alt=""
          srcset=""
          width="130"
          height="35"
        />
      </router-link>
    </v-app-bar> -->
    <v-btn
      to="/home"
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <!-- <p>user {{this.currentUser}}</p> -->

    <v-container class="mt-0">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-card class="elevation-6">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Login in to Your Account</h4>
                      <h6 class="text-center grey--text">
                        Log in to your account so you can continue monitoring
                        <br />projects assigned to you
                      </h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8">
                          <v-form name="form" @submit.prevent="handleLogin">
                            <div class="form-group">
                              <v-text-field
                                v-model="user.username"
                                v-validate="'required'"
                                label="Username"
                                type="text"
                                name="username"
                                outlined
                                dense
                                color="blue"
                                autocomplete="false"
                                class="mt-16"
                              />
                              <div
                                v-if="errors.has('username')"
                                class="alert alert-danger"
                                role="alert"
                              >
                                <span
                                  class="mdi mdi-alert-circle"
                                  aria-hidden="true"
                                ></span>
                                Username is required!
                              </div>
                            </div>
                            <div class="form-group">
                              <v-text-field
                                v-model="user.password"
                                v-validate="'required'"
                                name="password"
                                :type="showPassword ? 'text' : 'password'"
                                label="Password"
                                outlined
                                dense
                                color="blue"
                                :append-icon="
                                  showPassword ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                @click:append="showPassword = !showPassword"
                                autocomplete="false"
                              />
                              <div
                                v-if="errors.has('password')"
                                class="alert alert-danger"
                                role="alert"
                              >
                                <span
                                  class="mdi mdi-alert-circle"
                                  aria-hidden="true"
                                ></span>
                                Username or Password is Incorrect!
                              </div>
                            </div>

                            <v-btn
                              color="blue"
                              type="submit"
                              dark
                              block
                              tile
                              :disabled="loading"
                              ><span
                                v-show="loading"
                                class="spinner-border blue--text spinner-border-sm"
                              ></span
                              >Log in</v-btn
                            >
                            <br />
                            <router-link to="/forgotpassword" @click.prevent>
                              <v-btn color="blue" dark block tile
                                >Forgot Password</v-btn
                              >
                            </router-link>
                          </v-form>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                  <v-col cols="12" md="6" class="blue rounded-bl-xl">
                    <v-img
                      src="../assets/PIMS_crop.png"
                      alt=""
                      srcset=""
                      width="200"
                      height="50"
                      style="margin-top:50px"
                      class="mx-auto"
                    />
                    <h5 class="text-center white--text font-weight-light mt-5 text-uppercase">Vishwakarma Institutes</h5>
                    <div
                      style="text-align: center; margin-top: 40px;margin-bottom: 120px; padding: 20px 0px"
                    >
                      <v-card-text class="white--text">
                        <h3 class="text-center">Don't Have an Account Yet?</h3>
                        <h6 class="text-center">
                          Let's get you all set up so you can start creating
                          your your first<br />
                          onboarding experience
                        </h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row>
                  <v-col cols="12" md="6" class="blue rounded-br-xl">
                    <div style="text-align: center; padding: 180px 0">
                      <v-card-text class="white--text">
                        <h3 class="text-center">Already Signed up?</h3>
                        <h6 class="text-center">
                          Log in to your account so you can continue assigning
                          and<br />
                          completing your onboarding workflow
                        </h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">Log in</v-btn>
                      </div>
                    </div>
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-card-text class="mt-12">
                      <h4 class="text-center">Sign Up for an Account</h4>
                      <h6 class="text-center grey--text">
                        Let's get you all set up so you can start creatin your
                        <br />
                        first onboarding experiance
                      </h6>
                      <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" class="mt-5">
                          <h6 class="text-center font-weight-light">
                            Faculty ? Create your faculty account to start
                            monitoring projects
                          </h6>
                          <v-btn
                            to="/facultyregister"
                            color="primary"
                            class="mt-5"
                            block
                            outlined
                            tile
                            x-large
                            ><v-icon class="primary--text mr-2"
                              >mdi-account-plus</v-icon
                            >Faculty SignUp
                          </v-btn>
                          <h6 class="text-center mt-5 font-weight-light">
                            Student ? Complete the Group-SignUp with your group
                            to start with your project workflow
                          </h6>
                          <v-btn
                            to="/temp_signup"
                            color="primary"
                            class="mt-5"
                            block
                            outlined
                            tile
                            x-large
                            ><v-icon class="primary--text mr-2"
                              >mdi-account-multiple-plus</v-icon
                            >
                            Student SignUp
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import User from "../models/user";

export default {
  name: "Login",
  props: {
    source: String,
  },
  data() {
    return {
      drawer: false,
      user: new User("", ""),
      loading: false,
      message: "",
      showPassword: false,
      step: 1,
    };
  },
  created() {
    document.title = "Login";
  },
  computed: {
    loggedIn() {
      console.log(this.$store.state.auth.status.loggedIn);
      return this.$store.state.auth.status.loggedIn;
    },

    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },

  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$http.defaults.headers.common[
                "x-access-token"
              ] = this.currentUser.accessToken;
              if (this.currentUser.roles == "ROLE_MANAGEMENT") {
                this.$router.push("/management");
              }
              if (
                this.currentUser.roles == "ROLE_MEMBER" ||
                this.currentUser.roles == "ROLE_LEADER"
              ) {
                // this.getform(this.currentUser.Person_Id);
                this.$router.push("/student");
              }
              if (this.currentUser.roles == "ROLE_HOD") {
                this.$router.push("/hod");
              }
              if (this.currentUser.roles == "ROLE_GUIDE") {
                this.$router.push("/guide");
              }
              if (this.currentUser.roles == "ROLE_DIRECTOR") {
                this.$router.push("/director");
              }
            },
            (error) => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              /* if(this.message == " { "accessToken": null, "message": "Invalid Password!" } ")   */
              this.user.password = "";
            }
          );
        }
      });
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    getform(gi) {
      this.$http.get(`/api/getstartdate/${gi}`).then(
        (result) => {
          console.log(result.data);
          var tod = result.data;
          if (!tod[0].startDate) {
            this.$router.push("/Starting");
          } else {
            this.$router.push("/student");
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

<style scoped>
.v-application .rounded-bl-xl {
  border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
  border-bottom-right-radius: 300px !important;
}
a {
  text-decoration: none !important;
}
</style>
