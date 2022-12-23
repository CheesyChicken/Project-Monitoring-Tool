<template>
  <div id="app">
    <div class="underNav"></div>
    <v-card max-width="1200px" class="mx-auto">
      <v-card-title>
        <h1
          class="display-1"
          style="text-align: center"
          v-if="$route.params.stat == 1"
        >
          Lagging Projects
        </h1>
        <h1
          class="display-1"
          style="text-align: center"
          v-else-if="this.$route.params.stat == 2"
        >
          Ontime Projects
        </h1>
        <h1
          class="display-1"
          style="text-align: center"
          v-else-if="$route.params.stat == 3"
        >
          Leading Projects
        </h1>
        <h1
          class="display-1"
          style="text-align: center"
          v-else-if="$route.params.stat == 4"
        >
          Total Projects
        </h1>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="columns"
        :items="data1"
        :search="search"
        :items-per-page="10"
        multi-sort
      >
        <template v-slot:item.Group_Name="{ item }">
          <router-link
            v-if="isHOD === true"
            :to="{
              name: 'HOD Project Details',
              params: { id: item.Group_id },
            }"
          >
            {{ item.Group_Name }}</router-link
          >
          <router-link
            v-if="isDirector === true"
            :to="{
              name: 'Director Project Details',
              params: { id: item.Group_id },
            }"
          >
            {{ item.Group_Name }}</router-link
          >
        </template>

        <template v-slot:item.Status="{item}">
          <div :class="item.Status == 'Lagging'?'red--text':item.Status == 'On Time'?'blue--text':'green--text'">{{item.Status}}</div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
/*eslint-disable*/
import axios from "axios";
import Vue from "vue";
import { API_BASE_URL } from "../config";
Vue.prototype.$eventHub = new Vue();

export default {
  data: () => {
    return {
      id: 0,
      data: [],
      data1: [],
      clg: "2",
      dep: "",
      stat: "",
      k: 0,
      search: "",
      columns: [
        { value: "Group_Name", text: "GroupId" },
        { value: "Group_title", text: "Group Title" },
        { value: "TpOfProject", text: "Type" },
        { value: "Status", text: "Status" },
        { value: "FullName", text: "Faculty" },
        { value: "Company_name", text: "Company" },
      ],
    };
  },
  watch: {
    "$route.params.stat": {
      handler() {
        location.reload();
        this.stat = this.$route.params.stat;
      },
    },
    "$route.params.depa": {
      handler() {
        location.reload();
        this.dep = this.$route.params.depa;
      },
    },
  },
  created() {
    this.stat = this.$route.params.stat;
    this.dep = this.$route.params.depa;
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isStudent() {
      return (
        this.currentUser.roles.includes("ROLE_MEMBER") ||
        this.currentUser.roles.includes("ROLE_LEADER")
      );
    },
    isDirector() {
      return this.currentUser.roles.includes("ROLE_DIRECTOR");
    },
    isHOD() {
      return this.currentUser.roles.includes("ROLE_HOD");
    },
    isManagement() {
      return this.currentUser.roles.includes("ROLE_MANAGEMENT");
    },
    isGuide() {
      return this.currentUser.roles.includes("ROLE_GUIDE");
    },
  },
  mounted() {
    this.getdata();
    this.loggedin();
  },
  methods: {
    getdata() {
      console.log(this.currentUser.college);
      console.log(this.currentUser.department);
      this.$http.get(`/api/hodg/${this.currentUser.college}/${this.dep}`).then(
        (result) => {
          console.log(result.data);
          this.data = result.data;
          if (this.stat == 1) {
            for (this.k = 0; this.k < this.data.length; this.k++) {
              if (this.data[this.k].Status_id == 1) {
                this.data1.push(this.data[this.k]);
                console.log(this.data1);
              }
            }
          } else if (this.stat == 2) {
            for (this.k = 0; this.k < this.data.length; this.k++) {
              if (this.data[this.k].Status_id == 2) {
                this.data1.push(this.data[this.k]);
                console.log(this.data1);
              }
            }
          } else if (this.stat == 3) {
            for (this.k = 0; this.k < this.data.length; this.k++) {
              if (this.data[this.k].Status_id == 3) {
                this.data1.push(this.data[this.k]);
                console.log(this.data1);
              }
            }
          } else {
            this.data1 = this.data;
          }
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
      if (this.currentUser.roles == "ROLE_HOD") {
        this.dep = this.currentUser.department;
        console.log(this.currentUser.department);
      } else if (this.currentUser.roles == "ROLE_DIRECTOR") {
        console.log("director");
      } else if (this.currentUser.roles == "ROLE_MANAGEMENT") {
        console.log("management");
      } else {
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
