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
      to="/"
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-card elevation="6" class="mx-auto mt-5" width="500px">
      <v-card-text class="mt-12">
        <h4 class="text-center">Password Reset</h4>
        <h6 class="text-center grey--text">
          Enter Your Email ID
        </h6>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">
            <v-form name="form" @submit.prevent="handleSubmit">
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
                v-model="password"
                v-validate="{
                  required: true,
                  min: 7,
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

              <div
                v-if="errors.has('email')"
                class="alert alert-danger"
                role="alert"
              >
                Email ID is required!
              </div>
              <br />
              <v-alert :type="message.type" v-show="showmsg">{{
                message.text
              }}</v-alert>
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
                >Reset Password</v-btn
              >
              <br />
              <router-link to="/login" @click.prevent>
                <v-btn color="blue" dark block tile>Back to Login</v-btn>
              </router-link>
              <br />
              <br />
            </v-form>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "Passwordreset",
  data() {
    return {
      loading: false,
      message: { text: "", type: "success" },
      showmsg: false,
      cnfpassword: "",
      cshowPassword: false,
      showPassword: false,
      submitted: false,
      password: "",
    };
  },
  computed: {
    token() {
      return this.$route.query.token;
    },
  },
  created() {
    document.title = "Password Reset";
  },
  methods: {
    hideMessage() {
      if (this.showmsg) this.showmsg = false;
    },
    handleSubmit() {
      this.loading = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.loading = false;
          return;
        }
        this.$http
          .post(`/api/resetpassword`, {
            token: this.token,
            password: this.password,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.message.text = "Password Reset successfully";
              this.message.type = "success";
              this.password = "";
              this.cnfpassword = "";
            } else if (res.status === 404) {
              this.message.text = "User Does not exist or Token Expired";
              this.message.type = "error";
            } else {
              this.message.text = "Please try again later";
              this.message.type = "error  ";
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              this.message.text = "User Does not exist or Token Expired";
              this.message.type = "error";
            } else {
              this.message.text = "Please try again later";
              this.message.type = "error  ";
            }
          })
          .finally(() => ((this.showmsg = true), (this.loading = false)));
      });
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
