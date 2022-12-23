<template>
  <div id="app">
    <Page1 :groupid="this.groupid" :showproj="true"></Page1>
    
    
    <div class="underNav"></div>
    
    <div id="box">
      <v-btn
      class="ml-5"
      fab
      color="primary"
      style="text-decoration: none"
      @click="
        () => {
          this.$router.go(-1);
        }
      "
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
      <v-card class="pa-3 elevation-0" style="">
        <div class="d-md-flex">
          <h2 style="" class="ml-2 font-weight-light">All Tasks</h2>
          <!-- <v-spacer></v-spacer> -->
          <div class="ml-auto mr-10">
            <v-btn class="ml-md-5 error "
              >Lagging {{ this.taskstatus.lagging }}</v-btn
            >
            <v-btn class="ml-5 info">Ontime {{ this.taskstatus.ontime }}</v-btn>
            <v-btn class="ml-5 success"
              >Leading {{ this.taskstatus.leading }}</v-btn
            >
          </div>
        </div>
        <v-divider></v-divider>
        <v-card class="mb-5" style="border: 1px solid #0099ff !important">
          <v-card-title>
            <h4
              class="font-weight-light"
              :class="{ 'subtitle-1': $vuetify.breakpoint.smAndDown }"
            >
              {{ this.grouptitle }}
            </h4>
            <v-text-field
              v-model="search"
              prepend-icon="mdi-magnify"
              class="ml-md-15 pa-0"
              label="Search Tasks"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="columns"
            :items="datas"
            :search="search"
            :items-per-page="10"
            multi-sort
          >
          </v-data-table>
        </v-card>
      </v-card>
    </div>
  </div>
</template>
<script>
import Page1 from "../page1";

export default {
  components: {
    Page1,
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "Student | All Tasks";
  },
  data: () => {
    return {
      columns: [
        { value: "Task_Name", text: "Task" },
        { value: "FullName", text: "Alloted To" },
        { value: "Due_Date", text: "Due Date" },
        { value: "Start_date", text: "Start Date" },
        { value: "Approved_Date", text: "Approved Date" },
        { value: "Task_status", text: "Status" },
      ],
      datas: [],
      groupid: "",
      pageSettings: { pageSizes: true, pageSize: 5 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        type: "Menu",
        operators: {
          stringOperator: [{ value: "startsWith", text: "starts with" }],
        },
      },
      search: "",
      taskstatus: "",
      grouptitle: "",
      groupname: "",
    };
  },

  mounted() {
    this.getgroup();
    this.loggedin();
  },
  methods: {
    getdata() {
      this.$http.get(`/api/tasks/${this.groupid}`).then(
        (result) => {
          console.log(result.data);
          this.datas = result.data.tasks;
          this.groupname = result.data.Group_Name;
          this.grouptitle = result.data.Group_title;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getgroup() {
      this.$http.get(`/api/getstartdate/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log(result.data);
          var tod = result.data;
          this.groupid = tod[0].Group_id;
          console.log(this.groupid);
          this.getdata();
          this.getTaskStatus();
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getTaskStatus() {
      this.$http.get(`/api/tasks/status/${this.groupid}`).then(
        (result) => {
          this.taskstatus = result.data;
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
      if (
        this.currentUser.roles == "ROLE_HOD" ||
        this.currentUser.roles == "ROLE_GUIDE" ||
        this.currentUser.roles == "ROLE_MANAGEMENT" ||
        this.currentUser.roles == "ROLE_DIRECTOR"
      ) {
        this.logOut();
      }
    },
  },
};
</script>
<style scoped>
#box {
  padding-top: 1%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
>
<style></style>
