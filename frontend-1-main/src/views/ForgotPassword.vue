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
      to="/login"
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-card elevation="6" class="mx-auto mt-5" width="500px">
      <v-card-text class="mt-12">
        <h4 class="text-center">Forgot Password</h4>
        <h6 class="text-center grey--text">
          Enter Your Email ID
        </h6>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">
            <v-form name="form" @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                v-validate="{
                  required: true,
                  regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(viit.ac.in|vit.edu)\b/,
                }"
                label="Email ID"
                type="text"
                name="email"
                outlined
                dense
                color="blue"
                autocomplete="false"
                class="mt-16"
                @input="hideMessage"
              />
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
                >Send Password Reset Link</v-btn
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
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      loading: false,
      message: { text: "", type: "success" },
      showmsg: false,
    };
  },
  created() {
    document.title = "Forgot Password";
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
          .post(`/api/forgotpassword`, { email: this.email })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.message.text =
                "Password Reset Link is successfully sent to your Email Account";
              this.message.type = "success";
              this.email = "";
            } else if (res.status === 404) {
              this.message.text = "Email Does not exist";
              this.message.type = "error";
            } else {
              this.message.text = "Please try again later";
              this.message.type = "error  ";
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              this.message.text = "Email Does not exist";
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
