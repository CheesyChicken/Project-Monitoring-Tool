<template>
  <div id="app">
    <Page3></Page3>

    <div class="underNav"></div>

    <v-card style="margin: 30px 5% 30px 5%">
      <div>
        <br />
        <h1 style="text-align: center">ALL PROJECTS</h1>
        <hr />
        <!-- <div>
          <vue-good-table
            :columns="columns"
            :rows="students"
            :search-options="{
              enabled: true,
            }"
            :sort-options="{
              enabled: true,
            }"
            :pagination-options="{
              enabled: true,
              mode: 'pages',
              perPage: 5,
            }"
          />
        </div> -->
      </div>
    </v-card>
  </div>
</template>

<script>
/*eslint-disable*/
import Vue from "vue";
import Page3 from "../page3";
Vue.prototype.$eventHub = new Vue();

export default {
  components: {
    Page3,
  },
  data: () => {
    return {
      id: 0,
      students: [],
      columns: [
        { field: "FullName", label: "Student Name" },
        { field: "GroupId", label: "Group Id" },
        { field: "Group_title", label: "Project Title" },
        { field: "TpOfProject", label: "Type" },
        { field: "Status", label: "Status" },
        { field: "FullName", label: "Faculty" },
        { field: "Company_name", label: "Company" },
      ],
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "HOD | All Students";
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      this.$http
        .get(
          `/api/hodstudnets/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.students = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_HOD") {
        this.logOut();
      }
    },
  },
};
</script>
<style>
#box {
  padding-top: 5%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
