<template>
  <div id="app">
    <div>
      <page4></page4>
    </div>
    <!-- /director/home -->
    <v-btn
      to="/director"
      class="ml-5 mt-5"
      fab
      color="primary"
      style="text-decoration: none"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <div id="box">
      <v-card>
        <v-card-title>
          <h1 class="display-1" v-if="this.$route.params.sts == '1'">
            Lagging Projects
          </h1>
          <h1 class="display-1" v-else-if="this.$route.params.sts == '2'">
            Ontime Projects
          </h1>
          <h1 class="display-1" v-else-if="this.$route.params.sts == '3'">
            Leading Projects
          </h1>
          <h1 class="display-1" v-else>All Projects</h1>
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
        { value: "Group_Name", text: "Project ID" },
        { value: "Group_title", text: "Project Title" },
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
        .get(`/api/alltabledir/${this.currentUser.college}/${this.sts}`)
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
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
