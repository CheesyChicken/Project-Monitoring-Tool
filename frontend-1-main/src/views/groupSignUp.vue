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
        style="text-decoration: none"
      >
        Need Help <v-icon>mdi-help</v-icon></v-btn
      >
      <div v-if="!loggedIn" class="navbar-nav ml-auto">
        <v-btn text rounded to="/login" style="text-decoration: none"
          >Login<v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn
        >
      </div>
    </v-app-bar>
    <v-row align="center" justify="center" v-show="!addmemshow">
      <v-col cols="12" sm="8" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row class="fill-height">
                <v-col cols="12" md="4" class="primary accent-3">
                  <v-card-text class="white--text mt-12">
                    <!-- <h1 class="text-center display-1">Group Sign Up</h1> -->
                    <h5 class="text-center font-weight-light">
                      Add Details about your team members to get started
                    </h5>
                  </v-card-text>
                  <div class="text-center">
                    <v-btn
                      tile
                      outlined
                      dark
                      class="px-7"
                      v-on:click="addmem(0)"
                      v-if="userarray.length < 1"
                      ><v-icon>mdi-plus</v-icon> Add Leader
                    </v-btn>
                    <v-alert
                      tile
                      outlined
                      color="white"
                      class="justify-center"
                      v-else
                      style="padding: 5px; margin: 0px 10% 5% 20%"
                      ><div class="white--text pa-0">
                        <p class="text-uppercase mb-0">Leader</p>
                        <v-icon class="white--text mr-2">mdi-account</v-icon
                        >{{ this.userObjarray[0].FullName }}
                      </div></v-alert
                    >

                    <v-btn
                      tile
                      outlined
                      dark
                      class="mt-5"
                      v-on:click="addmem(1)"
                      v-if="userarray.length < 2"
                      ><v-icon>mdi-plus</v-icon> Add Member 1</v-btn
                    >
                    <v-alert
                      tile
                      outlined
                      color="white ml-2"
                      v-else
                      style="padding: 5px; margin: 0px 10% 5% 20%"
                      ><div class="white--text pa-0">
                        <p class="text-uppercase mb-0">Member 1</p>
                        <v-icon class="white--text mr-2">mdi-account</v-icon
                        >{{ this.userObjarray[1].FullName }}
                      </div></v-alert
                    >

                    <v-btn
                      tile
                      outlined
                      dark
                      class="mt-5"
                      v-on:click="addmem(2)"
                      v-if="userarray.length < 3"
                      ><v-icon>mdi-plus</v-icon> Add Member 2</v-btn
                    >
                    <v-alert
                      tile
                      outlined
                      color="white ml-2"
                      v-else
                      style="padding: 5px; margin: 0px 10% 5% 20%"
                      ><div class="white--text pa-0">
                        <p class="text-uppercase mb-0">Member 2</p>
                        <v-icon class="white--text mr-2">mdi-account</v-icon
                        >{{ this.userObjarray[2].FullName }}
                      </div></v-alert
                    >
                    <v-btn
                      tile
                      outlined
                      dark
                      class="mt-5"
                      v-on:click="addmem(3)"
                      v-if="userarray.length < 4"
                      ><v-icon>mdi-plus</v-icon> Add Member 3</v-btn
                    >
                    <v-alert
                      tile
                      outlined
                      color="white ml-2"
                      v-else
                      style="padding: 5px; margin: 0px 10% 5% 20%"
                      ><div class="white--text pa-0">
                        <p class="text-uppercase mb-0">Member 3</p>
                        <v-icon class="white--text mr-2">mdi-account</v-icon
                        >{{ this.userObjarray[3].FullName }}
                      </div></v-alert
                    >
                  </div>
                </v-col>

                <v-col cols="12" md="8">
                  <v-card-text class="mt-12">
                    <h2
                      class="
                          text-center
                          display-1
                          primary--text
                          text--accent-3
                        "
                    >
                      Group Sign Up
                    </h2>

                    <h5 class="text-center mt-4 font-weight-light">
                      Select the faculty and industry guide assigned to you
                    </h5>
                    <v-form @submit.prevent="submitgroupdetail">
                      <div id="grpdet" class="">
                        <v-row>
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                            ><v-select
                              name="college_id"
                              label="College"
                              @change="onChange12()"
                              :items="colleges"
                              item-text="College_Name"
                              item-value="College_id"
                              v-model="collegeId"
                              v-validate="'required'"
                              prepend-icon="mdi-bank"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('college_id')"
                              color="red lighten-2"
                              dark
                            >
                              College Name Must be selected
                            </v-alert></v-col
                          >
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                            <v-select
                              name="department_id"
                              label="Department"
                              @change="getdomains()"
                              :items="departments"
                              item-text="Department_Name"
                              item-value="Department_id"
                              v-model="departmentId"
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
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                            ><v-select
                              name="year_id"
                              label="Year"
                              v-model="Year"
                              :items="Years"
                              item-value=""
                              item-text=""
                              v-validate="'required'"
                              prepend-icon="mdi-calendar"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('year_id')"
                              color="red lighten-2"
                              dark
                            >
                              Year Must be selected
                            </v-alert></v-col
                          >
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                            ><v-select
                              name="guideid"
                              label="Select Guide"
                              v-model="guide"
                              :items="allguides"
                              item-text="name"
                              item-value="Instructor_id"
                              v-validate="'required'"
                              prepend-icon="mdi-account"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('year_id')"
                              color="red lighten-2"
                              dark
                            >
                              Guide Must be selected
                            </v-alert></v-col
                          >
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                            ><v-select
                              name="projecttypesel"
                              label="Type of Project"
                              @input="onChange22"
                              v-model="protypes1"
                              :items="protypes"
                              item-value="id"
                              item-text="actualtype"
                              prepend-icon="mdi-pencil"
                              v-validate="'required'"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('projecttypesel')"
                              color="red lighten-2"
                              dark
                            >
                              Project Type Must be selected
                            </v-alert></v-col
                          >
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                            <v-select
                              name="projectdomain"
                              label="Domain of project"
                              @change="getindus()"
                              v-model="domain"
                              :items="domains"
                              item-text="name"
                              item-value="id"
                              v-validate="'required'"
                              prepend-icon="mdi-apps"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('projectdomain')"
                              color="red lighten-2"
                              dark
                            >
                              Project Domain Must be selected
                            </v-alert></v-col
                          >
                        </v-row>
                        <v-row v-if="issame">
                          <v-col cols="12" sm="12" lg="6" md="12" xl="6"
                            ><v-select
                              name="company_id"
                              label="Name of the Company"
                              @change="postCandC()"
                              v-model="companyId"
                              :items="allcompanies"
                              item-text="Company_name"
                              item-value="Company_id"
                              v-validate="'required'"
                              prepend-icon="mdi-home-modern"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('company_id')"
                              color="red lighten-2"
                              dark
                            >
                              Company Must be selected
                            </v-alert></v-col
                          ><v-col cols="12" sm="12" lg="6" md="12" xl="6">
                            <v-select
                              name="guideidIndus"
                              label="Industry Guide"
                              v-model="indusGuide"
                              :items="allguides"
                              item-value="Instructor_id"
                              item-text="name"
                              v-validate="'required'"
                              prepend-icon="mdi-account-plus"
                            >
                            </v-select>
                            <v-alert
                              v-if="submitted && errors.has('guideidIndus')"
                              color="red lighten-2"
                              dark
                            >
                              Industry Guide Must be selected
                            </v-alert></v-col
                          >
                        </v-row>

                        <v-card-actions class="px-10 mx-10">
                          <v-btn class="info" type="submit" tile dark outlined
                            >SUBMIT</v-btn
                          >
                          <v-spacer></v-spacer>
                          <router-link to="/login" class="nav-link">
                            <v-btn class="error" tile dark outlined
                              >cancel</v-btn
                            >
                          </router-link>
                        </v-card-actions>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
    <StudentSignup
      v-if="addmemshow"
      v-on:register="handleRegister"
      @changeMem="addmemshow = !addmemshow"
    ></StudentSignup>
  </v-container>
</template>

<script>
import User from "../models/user";
import StudentSignup from "./StudentSignup.vue";
export default {
  name: "Register",
  components: { StudentSignup },
  props: {
    source: String,
  },
  data() {
    return {
      object: {},
      user: new User("", "", ""),
      submitted: false,
      colleges: [],
      departments: [],
      typesproj: [],
      addmemshow: false,
      //userarray:['','','',''],
      userarray: [],
      userObjarray: [],
      leaderusername: "",
      member1username: "",
      member2username: "",
      member3username: "",
      currentuserid: "",
      groupname: "",
      typeProject: "",
      allguides: [],
      collegeId: "",
      departmentId: "",
      issame: false,
      clg: "",
      dep: "",
      guide: "",
      indusGuide: "2",
      domain: "",
      domains: [],
      protypes1: "",
      protypes: [],
      proid: "",
      allcompanies: [],
      finalindusid: "",
      cnfpassword: "",
      companyId: "1",
      Year: "",
      Years: ["FY", "SY", "TY", "Btech"],
      successful: false,
      message: "",
      collges: "",
      showPassword: false,
      cshowPassword: false,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    document.title = "Group Sign Up";
  },
  mounted() {
    this.getcolleges();
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
    this.$http.get(`/api/companies`).then(
      (response) => {
        this.allcompanies = response.data;
      },
      (error) => {
        this.allcompanies =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  },
  methods: {
    getindus() {
      this.$http.get(`/api/getindusid`).then(
        (response) => {
          this.finalindusid = response.data[0].industry_project_id;
        },
        (error) => {
          this.allcompanies =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    postCandC() {
      this.$http.post(`/api/postC&C/${this.companyId}/${this.collegeId}`);
    },
    submitgroupdetail() {
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          // this.object.projectname = this.groupname,
          // this.object.year = this.Year,
          // this.object.instructerid2 = 1,
          // this.object.instructerid1 = this.guide,
          // this.object.Instructor_id_industry = this.indusGuide,
          // this.object.Department_id = this.departmentId,
          // this.object.College_id = this.collegeId,
          // this.object.final_domain = this.domain,
          // this.object.Domain_Pref_1 = 9,
          // this.object.Domain_Pref_2 = 10,
          // this.object.Domain_Pref_3 = 11,
          // this.object.Status_id = 2,
          // this.object.Project_Type_id = this.proid,
          // this.object.Companyid = this.companyId,
          // this.object.finalindusid = this.finalindusid,
          // this.object.userarray = this.userarray

          this.$http
            .post(`/api/submitgrp`, {
              projectname: this.groupname,
              year: this.Year,
              instructerid2: 1,
              instructerid1: this.guide,
              Instructor_id_industry: this.indusGuide,
              Department_id: this.departmentId,
              College_id: this.collegeId,
              final_domain: this.domain,
              Domain_Pref_1: 9,
              Domain_Pref_2: 10,
              Domain_Pref_3: 11,
              Status_id: 2,
              Project_Type_id: this.proid,
              Companyid: this.companyId,
              finalindusid: this.finalindusid,
              userarray: this.userarray,
            })
            .then(
              (this.userarray = []),
              ((this.groupname = this.guide = this.indusGuide = this.departmentId = this.collegeId = this.domain = this.protypes1 = this.companyId = this.cnfpassword = this.Year =
                ""),
              (this.submitted = false)),
              alert("Group Details successfully Added. Proceed to Login"),
              document.documentElement.scrollTop()
              // this.$router.push("/login")
            );
        }
      });
    },
    addmem(CID) {
      this.addmemshow = true;
      this.currentuserid = CID;
    },
    handleRegister(obj) {
      console.log(obj);
      this.userarray.push(obj.grno);
      this.userObjarray.push(obj);
      this.addmemshow = false;
    },
    onChange12() {
      this.department = [];
      this.typeProject = [];
      this.clg = this.user.college || this.collegeId;
      this.getdepartments(this.clg);
      this.gettypes(this.clg);
    },
    onChange22() {
      if (this.protypes1 == "2") {
        this.issame = true;
      }
      this.proid = this.protypes1;
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
    getGuides() {
      this.$http.get(`/api/guide/${this.collegeId}/${this.departmentId}`).then(
        (response) => {
          this.allguides = response.data;
        },
        (error) => {
          this.allguides =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    gettypes(cl) {
      this.$http.get(`/api/types/${cl}`).then(
        (result) => {
          console.log(result.data);
          this.protypes = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getdomains() {
      this.getGuides();
      this.$http
        .get(`/api/getDomains/${this.collegeId}/${this.departmentId}`)
        .then(
          (result) => {
            console.log(result.data);
            this.domains = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
  },
};
</script>
