<template>
  <div id="app">
    <div>
      <Page5></Page5>
      <!-- <page4></page4> -->
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
      <v-card>
        <br />
        <div>
          <div style="padding-left: 5px">
            <h1
              style="text-align: center"
              class="display-1 text-uppercase"
              v-if="this.stat == `1`"
            >
              Lagging Projects
            </h1>
            <h1
              style="text-align: center"
              class="display-1 text-uppercase"
              v-else-if="this.stat == `2`"
            >
              Ontime Projects
            </h1>
            <h1
              style="text-align: center"
              class="display-1 text-uppercase"
              v-else-if="this.stat == `3`"
            >
              Leading Projects
            </h1>
            <h1
              style="text-align: center"
              class="display-1 text-uppercase"
              v-else
            >
              All Projects
            </h1>
          </div>
        </div>
        <hr />

        <v-card>
          <v-card-title>
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
                :to="{
                  name: 'Management Project Details',
                  params: { id: item.Group_id },
                }"
              >
                {{ item.Group_Name }}</router-link
              >
            </template>
          </v-data-table>
        </v-card>
      </v-card>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Page5 from "../page5";
Vue.prototype.$eventHub = new Vue();
export default {
  components: {
    Page5,
  },

  data: () => {
    return {
      columns: [
        { value: "Group_Name", text: "GroupId" },
        { value: "Group_title", text: "Group Title" },
        { value: "TpOfProject", text: "Type" },
        { value: "Status", text: "Status" },
        { value: "dom1", text: "Domain" },
        { value: "FullName", text: "Faculty" },
        { value: "company", text: "Company" },
        { value: "Department_Name", text: "Department" },
        { value: "clg", text: "College" },
      ],
      data: [],
      person: [],
      data1: [],
      stat: "",
      pageSettings: { pageSizes: true, pageSize: 10 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
      search: "",
    };
  },
  watch: {
    "$route.params.stat": {
      handler() {
        this.mounted();
        this.stat = this.$route.params.stat;
      },
    },
  },
  created() {
    this.stat = this.$route.params.stat;
    document.title = "All Projects";
  },

  mounted() {
    // this.loggedin();
    this.getdata();
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    getdata() {
      this.$http.get(`/api/tablemanagement`).then(
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
      if (this.currentUser.roles == "ROLE_MANAGEMENT") {
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
#app {
  
}
</style>
