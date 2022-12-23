<template>
  <div id="app">
    <div class="row">
      <div class="col-xl-0 col-lg-1 col-md-1"></div>
      <div class="col-xl-4 col-lg-3 col-md-2">
        <v-card style="background-color: #e6e6e6">
          <div>
            <div class="author" align="center">
              <br />
              <v-avatar color="#348cd4" size="75">
                <span class="white--text text-h5">{{ initials }}</span>
              </v-avatar>
              <h4 class="title">
                {{ currentUser.FullName }}
                <br />
                <a href="#">
                  <small>{{ currentUser.username }}</small>
                </a>
              </h4>
            </div>
          </div>
        </v-card>

        <!-- <v-card
          v-if="designation == 'Faculty'"
          class="pa-3"
          style="background-color: #e6e6e6"
        >
          <div class="text-uppercase" align="center">
            <h6>
              <v-icon class="blue--text">mdi-bookmark</v-icon>Rejected Tasks :
              {{ rejectedTasks }}
            </h6>
          </div>
        </v-card> -->
      </div>
      <div class="col-xl-8 col-lg-7 col-md-8" style="padding-top: 1%">
        <v-card class="pa-5 mb-3" style="background-color: #e6e6e6">
          <h4 class="font-weight-light text-uppercase">
            {{ this.designation }} Profile
          </h4>

          <div class="row">
            <div class="col-6">
              <!-- <p><v-icon class="blue--text">mdi-bank</v-icon> College</p> -->
              <!-- <b-form-group class="mb-0" label="" label-for="input-formatter">
                <b-form-input disabled v-model="College"></b-form-input>
              </b-form-group> -->

              <v-text-field
                  v-model="College"
                  label="College"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-bank"
                ></v-text-field>
            </div>
            <div class="col-6">
              <!-- <p><v-icon class="blue--text">mdi-school</v-icon> Department</p>
              <b-form-group class="mb-0" label="" label-for="input-formatter">
                <b-form-input disabled v-model="Department"></b-form-input>
              </b-form-group> -->

              <v-text-field
                  v-model="Department"
                  label="Department"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-bank"
              ></v-text-field>


            </div>
          </div>

          <div class="row">
            <div class="col-5">
              <!-- <p><v-icon class="blue--text">mdi-account</v-icon> Full Name</p> -->
              <!-- <b-form-group class="mb-0" label="" label-for="input-formatter">
                <b-form-input
                  :disabled="editable"
                  name="fullname"
                  v-validate="'required|min:3|max:20|alpha_spaces'"
                  v-model="FullName"
                ></b-form-input> -->

                <v-text-field
                  v-model="FullName"
                  label="Full Name"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-account"
              ></v-text-field>

                <!-- <v-alert
                  v-if="submitted && errors.has('fullname')"
                  color="red lighten-2"
                  dark
                >
                  {{ errors.first("fullname") }}
                </v-alert>
              </b-form-group> -->
            </div>
            <div class="col-3">
              <!-- <p><v-icon class="blue--text">mdi-phone</v-icon> Mobile</p> -->
              <!-- <b-form-group class="mb-0" label="" label-for="input-formatter"> -->
                <!-- <b-form-input
                  :disabled="editable"
                  name="mobile"
                  v-validate="{
                    required: true,
                    min: 10,
                    max: 15,
                    regex: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                  }"
                  v-model="Mobile"
                ></b-form-input> -->
                <!-- new: ^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$
                        This will support the following formats:

                        8880344456
                        +918880344456
                        +91 8880344456
                        +91-8880344456
                        08880344456
                        918880344456 -->
                <!-- //old /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/ -->
                <!-- <v-alert
                  v-if="submitted && errors.has('mobile')"
                  color="red lighten-2"
                  dark
                >
                  {{ errors.first("mobile") }}
                </v-alert>
              </b-form-group> -->

              <v-text-field
                  v-model="Mobile"
                  label="Mobile"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-phone"
              ></v-text-field>

            </div>
            <div class="col-4">
              <!-- <p><v-icon class="blue--text">mdi-email</v-icon> Email</p>
              <b-form-group class="mb-0" label="" label-for="input-formatter">
                <b-form-input
                  :disabled="editable"
                  name="email"
                  v-validate="{
                    required: true,
                    regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(viit.ac.in|vit.edu)\b/,
                  }"
                  v-model="Email"
                ></b-form-input>

                <v-alert
                  v-if="submitted && errors.has('email')"
                  color="red lighten-2"
                  dark
                >
                  {{ errors.first("email") }}
                </v-alert>
              </b-form-group> -->

              <v-text-field
                  v-model="Email"
                  label="Email"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-email"
              ></v-text-field>
            </div>

            <div class="col-4">
              <!-- <p><v-icon class="blue--text">mdi-email</v-icon> Designation</p>
              <b-form-group class="mb-0" label="" label-for="input-formatter">
                <b-form-input disabled v-model="designation"></b-form-input>
              </b-form-group> -->

              <v-text-field
                  v-model="designation"
                  label="Designation"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-account-check"
              ></v-text-field>


            </div>

            <div class="col-4">
              <!-- <p><v-icon class="blue--text">mdi-email</v-icon> Employee Code</p>
              <b-form-group class="mb-0" label="" label-for="input-formatter">
                <b-form-input disabled v-model="empcode"></b-form-input>
              </b-form-group> -->

              <v-text-field
                  v-model="empcode"
                  label="Employee Code"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-apps"
              ></v-text-field>

            </div>

            <div class="col-4 mt-10 ml-auto">
              <!-- <v-btn class="primary mx-3" v-if="!editable" @click="editDetails"
                >Update</v-btn
              > -->
              <!-- <v-btn
                class="success"
                v-show="editable"
                @click="editable = !editable"
                >Edit Profile</v-btn
              > -->
              <!-- <v-btn class="error" v-show="!editable" @click="cancelEdit"
                >Cancel</v-btn
              > -->
            </div>
          </div>
          <div class="row">
                <v-btn
                  class="success ml-auto"
                  tile
                  @click="() => {
                    dialogeditprofile = !dialogeditprofile;
                    fullnamedialog = FullName;
                    emaildialog = Email;
                    mobiledialog = Mobile; }"
                  ><v-icon>mdi-pencil</v-icon>Edit Profile</v-btn
                >
            </div>
        </v-card>
      </div>
    </div>

    <div class="col-xl-0 col-lg-1 col-md-1"></div>

    <v-dialog v-model="dialogeditprofile" width="500">
        <v-card>
          <v-card-title class="text-h5">Edit Profile</v-card-title>

          <v-form ref="dialogeditprofile" @submit.prevent="editDetails">
            <v-card-text class="black--text">
              <v-text-field
                v-model="fullnamedialog"
                label="Full Name"
                outlined
                dense
                prepend-icon="mdi-account"
                name="fullname"
                v-validate="'required|min:3|max:20|alpha_spaces'"
              ></v-text-field>

              <v-alert
                    v-if="submitted && errors.has('fullname')"
                    color="red lighten-2"
                    dark
                  >
                    {{ errors.first("fullname") }}
              </v-alert>

              <v-text-field
                v-model="mobiledialog"
                label="Mobile"
                outlined
                dense
                prepend-icon="mdi-phone"
                name="mobile"
                v-validate="{
                      required: true,
                      min: 10,
                      max: 15,
                      regex: /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
                    }"
              ></v-text-field>
              <v-alert
                    v-if="submitted && errors.has('mobile')"
                    color="red lighten-2"
                    dark
                  >
                    {{ errors.first("mobile") }}
              </v-alert>

              <v-text-field
                v-model="emaildialog"
                label="Email"
                outlined
                dense
                prepend-icon="mdi-email"
                name="email"
                v-validate="{
                      required: true,
                      regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(viit.ac.in|vit.edu)\b/,
                    }"
              ></v-text-field>

              <v-alert
                    v-if="submitted && errors.has('email')"
                    color="red lighten-2"
                    dark
                  >
                    {{ errors.first("email") }}
                  </v-alert>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text type="submit" >
                Update Profile
              </v-btn>
              <v-btn color="error" text @click="cancelEdit">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    rejectedTasks: String,
  },
  components: {},
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    initials() {
      let initials = [];
      let splitedName = this.currentUser.FullName.split(" ");
      if (splitedName.length == 3) {
        let shortName = [];
        shortName.push(splitedName[0]);
        shortName.push(splitedName[2]);
        shortName.forEach((e) => {
          initials.push(e[0]);
        });
      } else {
        splitedName.forEach((e) => {
          initials.push(e[0]);
        });
      }
      return initials.join("");
    },
  },
  data: () => {
    return {
      FullName: "",
      Mobile: "",
      Email: "",
      empcode: "",
      College: "",
      Department: "",
      profile: [],
      designation: "",
      editable: true,
      submitted: false,
      dialogeditprofile: false,
      fullnamedialog: "",
      emaildialog: "",
      mobiledialog: "",
    };
  },
  mounted() {
    this.addData();
    this.getprofile();
  },
  methods: {
    addData() {
      this.FullName = this.currentUser.FullName;
      this.Mobile = this.currentUser.Mobile;
      this.Email = this.currentUser.email;
      this.empcode = this.currentUser.grno_EmpCode;
      if (this.currentUser.roles[0] == "ROLE_HOD") {
        this.designation = "Head of Department";
      } else if (this.currentUser.roles[0] == "ROLE_DIRECTOR") {
        this.designation = "Director";
      } else if (this.currentUser.roles[0] == "ROLE_GUIDE") {
        this.designation = "Faculty";
      }
    },

    getprofile() {
      this.$http.get(`/api/guideprofile/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var profile = result.data;
          this.Department = profile[0].Department_Name;
          this.College = profile[0].College_Name;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    editDetails() {
      this.submitted = true;

      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$http
            .post(`/api/student/updateprofile`, {
              personId: this.currentUser.Person_Id,
              fullName: this.fullnamedialog,
              mobile: this.mobiledialog,
              email: this.emaildialog,
              grno: this.empcode,
            })
            .then(
              (this.editable = !this.editable),
              (this.currentUser.FullName = this.FullName),
              (this.currentUser.Mobile = this.Mobile),
              (this.currentUser.Email = this.email),
              (this.currentUser.grno_EmpCode = this.empcode),
              (this.FullName = this.fullnamedialog),
              (this.Mobile = this.mobiledialog),
              (this.Email = this.emaildialog),
              (this.dialogeditprofile = !this.dialogeditprofile),
              this.$store.dispatch("auth/update", {
                FullName: this.FullName,
                Mobile: this.Mobile,
                email: this.email,
                grno_EmpCode: this.empcode,
              })
            );
        }
      });
    },

    cancelEdit() {
      // this.addData();
      this.dialogeditprofile = !this.dialogeditprofile;
    },
  },
};
</script>
<style scoped>
#box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
>
<style></style>
