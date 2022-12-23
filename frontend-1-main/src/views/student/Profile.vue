<template>
  <div id="app">
    <Page1 :groupid="`${this.groupid}`" :showproj="this.groupid != ''"></Page1>
    <div id="box">
      <div class="row">
        <v-btn
      class="ml-5"
      fab
      color="primary"
      style="text-decoration: none;"
      @click="
        () => {
          this.$router.go(-1);
        }
      "
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
        <div class="col-xl-0 col-lg-1 col-md-1"></div>
        <div class="col-xl-4 col-lg-3 col-md-3">
          <v-card
            style="background-color: #f2f2f2; border: 0px"
            class="elevation-0"
          >
            <div>
              <br />
              <div class="author" align="center">
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
            <div class="text-center">
              <div class="row">
                <div class="col-4">
                  Tasks
                  <br />
                  {{ Total }}
                </div>
                <div class="col-4">
                  Completed
                  <br />
                  {{ Completed }}
                </div>
                <div class="col-4">
                  Remaining
                  <br />
                  {{ Incompleted }}
                </div>
              </div>
            </div>
          </v-card>

          <br />
          <v-card
            class="text-center pa-5 elevation-0"
            title="Team Members"
            style="background-color: #f2f2f2; border: 0px"
          >
            <div class="row">
              <h5 class="mx-auto">Team Members</h5>
              <div class="col-12">
                <div
                  v-for="(item, index) in std"
                  v-bind:key="index"
                  style=""
                >
                  <v-list-item
                    class="d-flex align-items-center white mb-2 pa-2"
                  >
                    <v-avatar size="40" color="#348cd4" class="mr-3"
                      ><span class="white--text text-h6">{{
                        item.FullName[0]
                      }}</span></v-avatar
                    >
                    <span class="mr-auto"
                      ><h6>{{ item.FullName }}</h6>
                      <small class="float-left">{{ item.email }}</small>
                    </span>
                  </v-list-item>
                </div>
              </div>
            </div>
          </v-card>
        </div>
        <div class="col-xl-8 col-lg-7 col-md-8" style="">
          <v-card
            style="background-color: #f2f2f2; border: 0px"
            class="pa-5 elevation-0"
          >
          <div class="d-flex"> 
            <h3 class="font-weight-light">Student Profile</h3>
          </div>
            <div class="row">
              <div class="col-md-6">
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
              <div class="col-md-6">
                <v-text-field
                  v-model="Department"
                  label="Department"
                  readonly
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-school"
                ></v-text-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-5 col-sm-12">
                  <v-text-field
                  :readonly="editable"
                  v-model="FullName"
                  label="Full Name"
                  dense
                  outlined
                  filled
                  name="fullname"
                  prepend-icon="mdi-account"
                ></v-text-field>  

              </div>
              <div class="col-md-3 col-sm-6">
                <v-text-field
                  :readonly="editable"
                  v-model="Mobile"
                  label="Mobile"
                  dense
                  outlined
                  filled
                  name="mobile"
                  prepend-icon="mdi-account"
                ></v-text-field>

              </div>
              <div class="col-md-4 col-sm-6">
                <v-text-field
                  :readonly="editable"
                  v-model="Email"
                  label="Email"
                  dense
                  outlined
                  filled
                  name="email"
                  v-validate="{
                      required: true,
                      regex: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(viit.ac.in|vit.edu)\b/,
                    }"
                  prepend-icon="mdi-email"
                ></v-text-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4">
                  <v-text-field
                  :readonly="editable"
                  v-model="grno"
                  name="grno"
                  label="GR Number"
                  dense
                  outlined
                  filled
                  v-validate="{
                      required: true,
                      min: 3,
                      max: 10,
                      regex: /^[a-zA-Z0-9]*[0-9]$/,
                    }"
                  prepend-icon="mdi-file-multiple"
                ></v-text-field>

                  <v-alert
                    v-if="submitted && errors.has('grno')"
                    color="red lighten-2"
                    dark
                  >
                    {{ errors.first("grno") }}
                  </v-alert>
                
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
      <div class="row">
        <div class="col-xl-0 col-lg-1 col-md-1"></div>
        <div class="col-xl-10 col-lg-10 col-md-8 ml-lg-16">
          <v-card
            v-show="isIndus"
            style="background-color: #f2f2f2; border: 0px"
            class="pa-5 elevation-0"
          >
            <h4 class="font-weight-light">Group details</h4>
            <br />
            <div class="row">
              <div class="col-md-6" v-if="ProjectTitle">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-file-multiple</v-icon>
                    Project Title
                  </p>
                  <b-form-input disabled v-model="ProjectTitle"></b-form-input>
                </b-form-group> -->
                <v-text-field
                  readonly
                  v-model="ProjectTitle"
                  name="projecttitle"
                  label="Project Title"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-file-multiple"
                ></v-text-field>
              </div>
              <div class="col-md-6" v-if="ProjectName">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-pencil</v-icon> Project Id
                  </p>
                  <b-form-input disabled v-model="ProjectName"></b-form-input>
                </b-form-group> -->
                <v-text-field
                  readonly
                 v-model="ProjectName"
                  name="projectid"
                  label="Project Id"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-pencil"
                ></v-text-field>
              </div>

              <div class="col-md-4" v-if="ProjectGuide">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-account-check</v-icon>
                    Project Guide
                  </p>
                  <b-form-input disabled v-model="ProjectGuide"></b-form-input>
                </b-form-group> -->
                <v-text-field
                  readonly
                  v-model="ProjectGuide"
                  name="projectguide"
                  label="Project Guide"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-account-check"
                ></v-text-field>
              </div>

              <div class="col-md-3" v-if="ProjectType">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-home-modern</v-icon> Project
                    Type
                  </p>
                  <b-form-input disabled v-model="ProjectType"></b-form-input>
                </b-form-group> -->
                <v-text-field
                  readonly
                  v-model="ProjectType"
                  name="projecttype"
                  label="Project Type"
                  dense
                  outlined
                  filled
                ></v-text-field>
              </div>
              <div class="col-md-5">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-home-modern</v-icon>Company
                  </p>
                  <b-form-input disabled v-model="Company_name"></b-form-input>
                </b-form-group> -->

                <v-text-field
                  readonly
                  v-model="Company_name"
                  name="companyname"
                  label="Company Name"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-home-modern"
                ></v-text-field>
              </div>
            </div>

            <div class="row">
              <div class="col-md-3">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p><v-icon class="blue--text">mdi-alert</v-icon>Company Id</p>
                  <b-form-input disabled v-model="Company_ID"></b-form-input>
                </b-form-group> -->
              
              <v-text-field
                  readonly
                  v-model="Company_ID"
                  name=""
                  label="Project Type"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-home-modern"
                ></v-text-field>
              </div>

              <div class="col-md-5">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-account</v-icon> Industry
                    Guide
                  </p>
                  <b-form-input
                    disabled
                    v-model="Industry_Guide"
                  ></b-form-input>
                </b-form-group> -->

                <v-text-field
                  readonly
                  v-model="Industry_Guide"
                  name=""
                  label="Industry Guide"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-account"
                ></v-text-field>
              </div>

              <div class="col-md-4">
                <!-- <b-form-group class="mb-0" label-for="input-formatter">
                  <p>
                    <v-icon class="blue--text">mdi-phone</v-icon>Industry Guide
                    Contact
                  </p>
                  <b-form-input
                    disabled
                    v-model="Industry_Guide_No"
                  ></b-form-input>
                </b-form-group> -->

                <v-text-field
                  readonly
                  v-model="Industry_Guide_No"
                  name=""
                  label="Industry Guide Contact"
                  dense
                  outlined
                  filled
                  prepend-icon="mdi-phone"
                ></v-text-field>
              </div>
            </div>
          </v-card>
        </div>
        <div class="col-xl-0 col-lg-1 col-md-1"></div>
      </div>
    </div>

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
import Page1 from "../page1";

//import Footer from './Footer.vue';
export default {
  components: {
    Page1,
    // Footer
  },
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
  created() {
    document.title = "Student | Profile";
  },
  data: () => {
    return {
      datas: [],
      std: [],
      FullName: "",
      Mobile: "",
      Email: "",
      grno: "",
      ProjectTitle: "",
      ProjectGuide: "",
      ProjectType: "",
      ProjectName: "",
      College: "",
      Department: "",
      Total: "",
      Incompleted: "",
      Completed: "",
      groupid: "",
      Industry_Guide: "",
      Industry_Guide_No: "",
      Company_name: "",
      Company_ID: "",
      isIndus: false,
      editable: true,
      submitted: false,
      dialogeditprofile: false,
      fullnamedialog: "",
      emaildialog: "",
      mobiledialog: "",
    };
  },
  mounted() {
    this.getform();
    this.addData();
    this.gettask();
    this.getMe();
  },
  methods: {
    addData() {
      this.FullName = this.currentUser.FullName;
      this.Mobile = this.currentUser.Mobile;
      this.Email = this.currentUser.email;
      this.grno = this.currentUser.grno_EmpCode;
    },

    getMe() {
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
    getstudent() {
      let j = 0;
      this.$http.get(`/api/std/${this.groupid}}`).then(
        (result) => {
          console.log(result.data);
          var temp = result.data;
          var temp1 = [];
          var temp2 = [];
          for (let i = 0; i < temp.length; i++) {
            temp1[i] = temp[i][0];
          }
          temp1.forEach((element) => {
            if (element.Person_id != this.currentUser.Person_Id) {
              temp2[j] = element;
              j++;
            }
          });
          while (Number(j) == Number(temp2.length)) {
            this.std = temp2;
            return;
          }
          console.log(this.std);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    gettask() {
      this.$http.get(`/api/profiletask/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var task = result.data;
          this.Total = task[0].total;
          this.Completed = task[0].Completed;
          this.Incompleted = task[0].Remaining;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getprofile() {
      this.$http.get(`/api/profile/${this.groupid}`).then(
        (result) => {
          console.log(result.data);
          var profile = result.data;
          this.ProjectTitle = profile[0].Group_title;
          this.ProjectName = profile[0].Group_Name;
          this.ProjectType = profile[0].type;
          if (this.ProjectType == "Industrial") {
            this.isIndus = true;
          }
          this.ProjectGuide = profile[0].FaultyGuide;
          // this.Department = profile[0].Department_Name;
          // this.College = profile[0].College_Name;
          this.Industry_Guide = profile[0].IndustryFaultyGuide;
          this.Industry_Guide_No = profile[0].IndustryFaultyGuideMo;
          this.Company_name = profile[0].Company_name;
          this.Company_ID = profile[0].Company_id;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getform() {
      this.$http.get(`/api/getstartdate/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var tod = result.data;
          this.groupid = tod[0].Group_id;
          if (!tod[0].startDate) {
            this.$router.push("/Starting");
          }
          this.getstudent();
          this.getprofile();
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
          console.log(isValid);
          this.$http
            .post(`/api/student/updateprofile`, {
              personId: this.currentUser.Person_Id,
              fullName: this.fullnamedialog,
              mobile: this.mobiledialog,
              email: this.emaildialog,
              grno: this.grno,
            })
            .then(
              (this.editable = !this.editable),
              (this.currentUser.FullName = this.fullnamedialog),
              (this.currentUser.Mobile = this.mobiledialog),
              (this.currentUser.email = this.emaildialog),
              (this.currentUser.grno_EmpCode = this.grno),
              (this.FullName = this.fullnamedialog),
              (this.Mobile = this.mobiledialog),
              (this.Email = this.emaildialog),
              (this.dialogeditprofile = !this.dialogeditprofile),
              (this.$store.dispatch("auth/update", {
                FullName: this.FullName,
                Mobile: this.Mobile,
                email: this.Email,
                grno_EmpCode: this.grno,
              })),
              

            );
        }
      });
    },

    cancelEdit() {
      // this.addData();
      this.dialogeditprofile = !this.dialogeditprofile;
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
#box {
  padding-bottom: 2%;
  padding-right: 2%;
  padding-left: 2%;
  padding-top: 3%;
}
</style>
>
<style></style>
