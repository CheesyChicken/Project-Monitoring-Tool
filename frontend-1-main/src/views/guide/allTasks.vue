<template>
  <div id="app">
    <div>
      <Page2 :groupid="this.$route.params.id" :showproj="true"></Page2>
    </div>
    <v-btn
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
      @click="
        () => {
          this.$router.go(-1);
        }
      "
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <div id="box">
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
          <v-card-title class="pa-0">
            <v-select
              class="col-md-5 mb-0 "
              :items="person"
              :item-text="(item) => `${item.Group_title} - ${item.Group_Name}`"
              item-value="Group_id"
              @input="sendToProject"
              v-model="projectSelected"
              :label="grouptitle"
            ></v-select>
            <!-- <v-spacer></v-spacer> -->
            <v-text-field
              v-model="search"
              class="ml-md-10 pa-0"
              prepend-icon="mdi-magnify"
              label="Search Task"
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
import Vue from "vue";
import Page2 from "../page2";
Vue.prototype.$eventHub = new Vue();

export default {
  components: {
    Page2,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.gi = this.$route.params.id;
        this.mounted();
      },
    },
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
      person: [],
      grop: false,
      projectSelected: "",
      search: "",
      grouptitle: "",
      groupname: "",
      taskstatus: "",
    };
  },
  mounted() {
    this.loggedin();
    this.getdata();
    this.getperson();
    this.getTaskStatus();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.gi = this.$route.params.id;
    document.title = "Faculty | All Tasks";
  },
  methods: {
    getdata() {
      console.log(this.gi);
      this.$http.get(`/api/tasks/${this.gi}`).then(
        (result) => {
          console.log("result");
          console.log(result.data);
          if (result.data.person_id != this.currentUser.Person_Id) {
            // alert(result.data.person_id+" "+this.currentUser.Person_Id);
            alert("This Project is Not Assigned to you.");
            this.$router.go(-1);
          }
          this.datas = result.data.tasks;
          this.groupname = result.data.Group_Name;
          this.grouptitle = result.data.Group_title;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    sendToProject() {
      this.$router.push({
        name: "Guide allTask",
        params: { id: this.projectSelected },
      });
    },

    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
    getperson() {
      this.$http.get(`/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log("person");
          console.log(result.data);
          this.person = result.data;
          if (this.person.length > 1) {
            this.grop = true;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getTaskStatus() {
      this.$http.get(`/api/tasks/status/${this.gi}`).then(
        (result) => {
          this.taskstatus = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>
<style scoped></style>
>
<style>
#box {
  padding-top: 1%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
