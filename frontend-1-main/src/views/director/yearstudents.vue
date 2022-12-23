<template>
  <div id="app">
    <div>
      <page4></page4>
    </div>
    <!-- /director/home -->
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
        <v-card>
          <v-card-title>
          <h2 style="text-align: center" class="font-weight-light">{{this.$route.params.year + '  Students'}}</h2>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="Search Students"
            single-line
            hide-details
          ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="columns"
            :items="data"
            :search="search"
            :items-per-page="10"
            multi-sort
          >
            <template v-slot:item.Group_Name="{ item }">
              <router-link
                :to="{
                  name: 'Director Project Details',
                  params: { id: item.Group_id },
                }"
              >
                {{ item.Group_Name }}</router-link
              >
            </template>

            <template v-slot:item.Status_Name="{item}">
          <div :class="item.Status_Name == 'Lagging'?'red--text':item.Status_Name == 'On Time'?'blue--text':'green--text'">{{item.Status_Name}}</div>
        </template>
          </v-data-table>
        </v-card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";

import page4 from "../page4";
Vue.prototype.$eventHub = new Vue();
export default {
  components: {
    page4,
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
      data: [],
      person: [],
      search: "",

      pageSettings: { pageSize: 10 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
      columns: [
        { value: "StudentName", text: "Student Name" },
        { value: "Group_Name", text: "Group Name" },
        { value: "Project_Type_Name", text: "Type" },
        { value: "Status_Name", text: "Status" },
        { value: "Domain_Name", text: "Domain" },
        { value: "guide", text: "Faculty" },
        { value: "Company_name", text: "Company" },
        { value: "Department_Name", text: "Department" },
      ],
    };
  },

  mounted() {
    this.loggedin();
    this.getdata();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = `${this.$route.params.year} Students`;
  },

  methods: {
    getdata() {
      this.$http.get(`/api/yearstudents/${this.currentUser.college}/${this.$route.params.year}`).then(
        (result) => {
          console.log(result.data);
          this.data = result.data;
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
      if (this.currentUser.roles == "ROLE_DIRECTOR") {
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
<style scoped></style>
>
<style>
#box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
