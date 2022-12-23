<template>
  <div id="app">
    <Page1></Page1>

    <div class="underNav"></div>
    <div id="box">
      <form name="form" @submit.prevent="">
        <b-card bg-variant="light">
          <h1 style="text-align: center">ABOUT PROJECT</h1>
          <hr />
          <b-form-group
            label-cols-lg="3"
            label="Project Details"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label="Project Id"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input disabled v-model="Project_id"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Faculty Guide"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input disabled v-model="Faculty_Guide"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Students"
              label-align-sm="right"
              label-for="nested-street"
            >
              <div style="padding-left: 10px" class="row">
                <div v-for="(item, index) in std" v-bind:key="index">
                  <b-form-input disabled v-model="item.FullName">
                  </b-form-input>
                  <b-form-input disabled v-model="item.grno_EmpCode">
                  </b-form-input>
                </div>
              </div>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Project Title"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input v-model="ProjectTitle"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Objectives"
              label-align-sm="right"
              label-for="nested-state"
            >
              <b-form-textarea
                id="textarea-rows"
                placeholder="Minimum 4 Objective Point"
                rows="4"
                v-model="Objective"
              ></b-form-textarea>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Scope"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-textarea
                id="textarea-rowss"
                placeholder=""
                rows="2"
                v-model="Scope"
              ></b-form-textarea>
            </b-form-group>
          </b-form-group>
        </b-card>

        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="Phase 1"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="3"
              label=" Phase I (Weeks)"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                v-model="Planing"
                placeholder="No Of Weeks "
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Phase II (Weeks)"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                v-model="Design"
                placeholder="No Of Weeks "
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Phase III (Weeks)"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                v-model="Devlopment"
                placeholder="No Of Weeks "
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Phase IV (Weeks)"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                v-model="Testing"
                placeholder="No Of Weeks "
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Phase V (Weeks)"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input
                v-model="Deployment"
                placeholder="No Of Weeks "
              ></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>

        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label=" "
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <label></label>
            <br />
            <!-- <b-form-file v-model="file2" class="mt-3" plain></b-form-file>
            <div class="mt-3">Selected file: {{ file2 ? file2.name : "" }}</div> -->
          </b-form-group>
          <b-button
            class="float-right"
            type="submit"
            @click="postProjectDetails"
            variant="primary"
            >Submit</b-button
          >
        </b-card>
      </form>
    </div>
  </div>
</template>
<script>
import Page1 from "../page1";

export default {
  components: {
    Page1,
  },
  mounted() {
    this.getgroups();
    // this.getstd();
    // this.getproject();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => {
    return {
      datas: [],
      file1: null,
      file2: null,
      Deployment: "",
      Testing: "",
      Devlopment: "",
      Design: "",
      Planing: "",
      Scope: "",
      Objective: "",
      ProjectTitle: "",
      std: [],
      Faculty_Guide: "",
      Project_id: "",
    };
  },
  methods: {
    getgroups() {
      this.$http.get(`/api/getstartdate/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var tod = result.data;
          this.gi = tod[0].Group_id;
          this.Project_id = tod[0].Group_Name;
          this.Faculty_Guide = tod[0].FullName;
          this.getstd(this.gi);
          // this.getproject();
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getstd() {
      let i = 0;
      this.$http.get(`/api/std/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var stds = result.data;
          var Students = [];
          for (i = 0; i < stds.length; i++) {
            Students[i] = stds[i][0];
          }
          while (Number(i) == Number(stds.length)) {
            this.std = Students;
            return;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },

    postProjectDetails() {
      this.$http
        .post(`/api/startingformpd/${this.gi}`, {
          projecttitle: this.ProjectTitle,
          objectives: this.Objective,
          scopes: this.Scope,
          planing: this.Planing,
          design: this.Design,
          devlopment: this.Devlopment,
          testing: this.Testing,
          deployment: this.Deployment,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.addweek();
          },
          (error) => {
            console.error(error);
          }
        );
    },
    addweek() {
      this.$http.get(`/api/addformweek/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.$router.push("/student");
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
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
