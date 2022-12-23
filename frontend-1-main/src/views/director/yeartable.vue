<template>
  <div id="app">
    <div>
      <page4></page4>
    </div>
    <v-btn
      @click="
        () => {
          this.$router.go(-1);
        }
      "
      style="text-decoration: none"
      class="ml-5 mt-5"
      fab
      color="primary"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <div id="box">
      <v-card>
        <v-card-title>
          <h1 class="display-1">{{ this.$route.params.year }} Projects</h1>
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
    </div>
  </div>
</template>
<script>
//import Vue from "vue";
import page4 from "../page4";

export default {
  components: {
    page4,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.mounted();
        this.sts = this.$route.params.sts;
      },
    },
  },
  created() {
    this.sts = this.$route.params.sts;
  },
  data: () => {
    return {
      data: [],
      person: [],
      sts: "",
      search: "",
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
  methods: {
    getdata() {
      this.$http
        .get(`/api/yearstable/${this.currentUser.college}/${this.sts}`)
        .then(
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
  padding-top: 1%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
