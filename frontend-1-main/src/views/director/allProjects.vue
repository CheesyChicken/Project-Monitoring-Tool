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
        <div>
          <br />
          <div style="padding-left: 5px">
            <h1 style="text-align: center" class="display-1">ALL PROJECTS</h1>
          </div>
        </div>
        <hr />
        <v-card>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
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

            <template v-slot:item.Status="{item}">
          <div :class="item.Status == 'Lagging'?'red--text':item.Status == 'On Time'?'blue--text':'green--text'">{{item.Status}}</div>
        </template>
          </v-data-table>
        </v-card>
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
        { value: "Group_Name", text: "GroupId" },
        { value: "Group_title", text: "Group Title" },
        { value: "TpOfProject", text: "Type" },
        { value: "Status", text: "Status" },
        { value: "dom1", text: "Domain" },
        { value: "FullName", text: "Faculty" },
        { value: "Company_name", text: "Company" },
        { value: "Department_Name", text: "Department" },
        { value: "clg", text: "College" },
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
    document.title = " All Projects";
  },

  methods: {
    getdata() {
      this.$http.get(`/api/tabledir/${this.currentUser.college}`).then(
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
