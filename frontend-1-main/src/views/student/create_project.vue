<template>
  <div id="app">
    <div>
      <Page1></Page1>
    </div>
    <!-- "/student/home" -->
    <v-btn
      to="/student"
      class="ml-5 mt-5"
      fab
      color="primary"
      style="text-decoration: none"
    >
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window>
              <v-window-item>
                <v-row class="fill-height">
                  <v-col cols="12" md="12">
                    <v-card-text class="mt-12">
                      <h2
                        class="
                          text-center
                          display-1
                          primary--text
                          text--accent-3
                        "
                      >
                        Create Group
                      </h2>

                      <h5 class="text-center mt-4 font-weight-light">
                        Provide the Details of your Project
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
                              <v-text-field
                                name="guideidIndus"
                                label="Industry Guide Name"
                                v-model="indusGuide"
                                v-validate="'required'"
                                prepend-icon="mdi-account-plus"
                              >
                              </v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('guideidIndus')"
                                color="red lighten-2"
                                dark
                              >
                                Industry Guide Name is Required
                              </v-alert></v-col
                            >
                            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                              <v-text-field
                                name="guideidEmail"
                                label="Industry Guide Email"
                                v-model="indusGuideEmail"
                                v-validate="'required'"
                                prepend-icon="mdi-email"
                              >
                              </v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('guideidIndus')"
                                color="red lighten-2"
                                dark
                              >
                                Industry Guide Email is Required
                              </v-alert></v-col
                            >
                          </v-row>

                          <v-row>
                            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                              <v-text-field
                                name="Project_Title"
                                v-model="title"
                                label="Project Title"
                                prepend-icon="mdi-pencil"
                                v-validate="'required'"
                              ></v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('Project_Title')"
                                color="red lighten-2"
                                dark
                              >
                                Please Enter Project Title
                              </v-alert>
                            </v-col>
                            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                              <v-menu v-model="menu1" max-width="290">
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    :value="startdate"
                                    clearable
                                    name="Starting_Date"
                                    label="Starting Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    v-validate="'required'"
                                    @click:clear="date = null"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="startdate"
                                  @change="menu1 = false"
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="modal = false"
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(date)"
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-menu>
                              <v-alert
                                v-if="submitted && errors.has('Starting_Date')"
                                color="red lighten-2"
                                dark
                              >
                                Please Choose Starting Date
                              </v-alert>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                              <v-textarea
                                name="objective"
                                v-model="objective"
                                label="Objective"
                                hint="Objective of your project"
                                outlined
                                filled
                                auto-grow
                                prepend-icon="mdi-comment"
                              ></v-textarea>
                            </v-col>

                            <v-col cols="12" sm="12" lg="6" md="12" xl="6">
                              <v-textarea
                                name="input-7-1"
                                v-model="scope"
                                label="Scope"
                                hint="Scope of your project"
                                outlined
                                filled
                                auto-grow
                                prepend-icon="mdi-comment"
                              ></v-textarea>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="6" sm="6" lg="3" md="3" xl="3">
                              <v-text-field
                                v-model="phase1"
                                label="Phase 1 (Weeks)"
                                prepend-icon="mdi-clock"
                                hint="Planning"
                                name="phase1"
                                type="number"
                                min="1"
                                max="7"
                                v-validate="'required'"
                              ></v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('phase1')"
                                color="red lighten-2"
                                dark
                              >
                                Please Choose No. of weeks for Planning
                              </v-alert>
                            </v-col>

                            <v-col cols="6" sm="6" lg="3" md="3" xl="3">
                              <v-text-field
                                v-model="phase2"
                                label="Phase 2 (Weeks)"
                                prepend-icon="mdi-clock"
                                hint="Design"
                                type="number"
                                name="phase2"
                                min="1"
                                max="7"
                                v-validate="'required'"
                              ></v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('phase2')"
                                color="red lighten-2"
                                dark
                              >
                                Please Choose No. of weeks for Designing
                              </v-alert>
                            </v-col>

                            <v-col cols="6" sm="6" lg="3" md="3" xl="3">
                              <v-text-field
                                v-model="phase3"
                                label="Phase 3 (Weeks)"
                                prepend-icon="mdi-clock"
                                hint="Development"
                                type="number"
                                name="phase3"
                                min="1"
                                max="7"
                                v-validate="'required'"
                              ></v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('phase3')"
                                color="red lighten-2"
                                dark
                              >
                                Please Choose No. of weeks for Development
                              </v-alert>
                            </v-col>

                            <v-col cols="6" sm="6" lg="3" md="3" xl="3">
                              <v-text-field
                                v-model="phase4"
                                label="Phase 4 (Weeks)"
                                prepend-icon="mdi-clock"
                                hint="Testing"
                                type="number"
                                name="phase4"
                                min="1"
                                max="7"
                                v-validate="'required'"
                              ></v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('phase4')"
                                color="red lighten-2"
                                dark
                              >
                                Please Choose No. of weeks for Testing
                              </v-alert></v-col
                            >

                            <v-col cols="6" sm="6" lg="3" md="3" xl="3">
                              <v-text-field
                                v-model="phase5"
                                label="Phase 5 (Weeks)"
                                prepend-icon="mdi-clock"
                                hint="Deployment"
                                type="number"
                                name="phase5"
                                min="1"
                                max="7"
                                v-validate="'required'"
                              ></v-text-field>
                              <v-alert
                                v-if="submitted && errors.has('phase5')"
                                color="red lighten-2"
                                dark
                              >
                                Please Choose No. of weeks for Deployment
                              </v-alert>
                            </v-col>
                          </v-row>

                          <v-card-actions class="px-10 mx-10">
                            <v-btn class="info" type="submit" tile dark outlined
                              >Create Group</v-btn
                            >
                            <v-spacer></v-spacer>
                            <!-- "/student/home" -->
                            <router-link to="/student" class="nav-link">
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
    </v-container>
  </div>
</template>

<script>
import User from "../../models/user";
import Page1 from "../page1";
export default {
  name: "Register",
  components: { Page1 },
  data() {
    return {
      object: {},
      user: new User("", "", ""),
      submitted: false,
      colleges: [],
      departments: [],
      typesproj: [],
      groupname: "",
      typeProject: "",
      allguides: [],
      collegeId: "",
      departmentId: "",
      clg: "",
      dep: "",
      guide: "",
      indusGuide: "",
      indusGuideEmail: "",
      domain: "",
      domains: [],
      protypes1: "",
      protypes: [],
      proid: "",
      allcompanies: [],
      finalindusid: "1",
      companyId: "1",
      Year: "",
      Years: ["FY", "SY", "TY", "Btech"],
      message: "",
      collges: "",
      title: "",
      objective: "",
      scope: "",
      phase1: "",
      phase2: "",
      phase3: "",
      phase4: "",
      phase5: "",
      issame: false,
      startdate: "",
      menu: true,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    this.getcolleges();
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
    // getindus() {
    //   this.$http.get(`/api/getindusid`).then(
    //     response => {
    //       this.finalindusid = response.data[0].industry_project_id;
    //     },
    //     error => {
    //       this.allcompanies =
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString();
    //     }
    //   );
    // },
    // postCandC() {
    //   this.$http.post(`/api/postC&C/${this.companyId}/${this.collegeId}`).then(
    //     response => {
    //       this.finalindusid = response.data[0].industry_project_id;
    //     }
    //   );
    // },
    addweek(gid) {
      this.$http.post(`/api/addformweek/${gid}`).then(
        (result) => {
          console.log(result.data);
          this.$router.push("/student");
        },
        (error) => {
          console.error(error);
        }
      );
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
            .post(`/api/creategroup`, {
              projectname: this.groupname,
              year: this.Year,
              instructerid2: 1,
              instructerid1: this.guide,
              industryGuideName: this.indusGuide,
              industryGuideEmail: this.indusGuideEmail,
              Department_id: this.departmentId,
              College_id: this.collegeId,
              final_domain: this.domain,
              Domain_Pref_1: 9,
              Domain_Pref_2: 10,
              Domain_Pref_3: 11,
              Status_id: 2,
              Project_Type_id: this.proid,
              CompanyId: this.companyId,
              finalindusid: this.finalindusid,
              title: this.title,
              objective: this.objective,
              scope: this.scope,
              phase1: this.phase1,
              phase2: this.phase2,
              phase3: this.phase3,
              phase4: this.phase4,
              phase5: this.phase5,
              startdate: this.startdate,
              grno: this.currentUser.grno_EmpCode,
              person_id: this.currentUser.Person_Id,
            })
            .then((response) => {
              (this.groupname = this.guide = this.indusGuide = this.departmentId = this.collegeId = this.domain = this.protypes1 = this.companyId = this.cnfpassword = this.Year =
                ""),
                (this.submitted = false),
                console.log("response " + response.data);
              this.addweek(response.data),
                alert("Group Created Successfully! "),
                // "/student/home"
                this.$router.push("/student");
            });
        }
      });
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
        this.proid = this.protypes1;
      } else {
        this.issame = false;
        this.proid = this.protypes1;
      }
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

<style scoped>
.navbar-brand > img {
  height: 40px;
}
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 650px !important;
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
