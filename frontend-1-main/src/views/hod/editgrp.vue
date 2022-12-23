<template>
  <div id="app">
    <div>
      <Page3></Page3>
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
    <v-dialog v-model="dialog2" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">UPDATE GROUP DETAILS</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row cols="12" sm="6" md="4">
              <v-text-field
                v-model="editedItem.Group_Name"
                filled
                outlined
                disabled
                label="Group ID :"
              ></v-text-field>
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-autocomplete
                label="Domain"
                :items="domain"
                item-text="Domain_Name"
                item-value="Domain_id"
                v-model="editedItem.final_domain"
              ></v-autocomplete>
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-autocomplete
                v-model="editedItem.instructor1"
                label="Faculty :"
                :items="allguides"
                item-text="name"
                item-value="Instructor_id"
              >
              </v-autocomplete>
            </v-row>
            <v-row cols="12" sm="6" md="4">
              <v-autocomplete
                v-model="editedItem.instructor2"
                label="Industry Guide (if any) :"
                :items="allguides"
                item-text="name"
                item-value="Instructor_id"
              >
              </v-autocomplete>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="updateItem"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- GROUP TABLE  -->
    <!-- <h1 style="text-align: center" class="display-1">GROUPS</h1> -->
    <!-- <h1>{{content}}</h1> -->

    <v-card max-width="1200px" class="mx-auto mt-10">
      <v-card-title>
        <h1 style="" class="display-1">Edit Groups</h1>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          prepend-icon="mdi-magnify"
          label="Search Projects"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="columns"
        :items="data"
        :search="search"
        :items-per-page="10"
        multi-sort
      >
        <template v-slot:item.edit="{ item }">
          <v-btn
            color="success"
            :disabled="visible"
            v-on:click="editVisible(item)"
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn
            color="error"
            :disabled="visible"
            v-on:click="deleteEntry(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Page3 from "../page3";
/* import { mdiAccountEdit  } from '@mdi/js'; */
//import Vue from "vue";
export default {
  components: {
    Page3,
  },
  data: () => {
    return {
      columns: [
        { value: "Group_Name", text: "GroupId" },
        { value: "Group_title", text: "Group Title" },
        { value: "Department_Name", text: "Department" },
        { value: "FullName", text: "Faculty" },
        {
          value: "edit",
          text: "Edit",
        },
        {
          text: "Delete",
          value: "delete",
        },
      ],
      data: [],
      dialog2: false,
      domain: "",
      editedIndex: -1,
      editedItem: {
        Group_Name: null,
        final_domain: null,
        instructor1: null,
        instructor2: null,
        grno_EmpCode: null,
      },
      search: "",
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
    document.title = "HOD | Edit Groups";
  },
  methods: {
    getdata() {
      //${this.currentUser.college}/${this.currentUser.department}
      this.$http
        .get(
          `/api/hodg/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.data = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
      this.$http.get(`/api/domain/${this.currentUser.department}`).then(
        (result) => {
          this.domain = result.data;
        },
        (error) => {
          console.log(error);
        }
      );
      this.$http
        .get(
          `/api/guide/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (response) => {
            this.allguides = response.data;
          },
          (error) => {
            this.allguides =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          }
        );
    },
    deleteEntry(grpdata) {
      var id = grpdata.Group_id;
      console.log(id);
      this.$http.post(`/api/hod/delete/${id}`);
      this.getdata();
      //alert(grpdata.Group_Name)
    },
    editVisible(grpdata) {
      var id = grpdata.Group_id;
      this.editedItem.Group_Name = grpdata.Group_Name;
      this.editedItem.final_domain = grpdata.final_domain;
      this.editedItem.instructor1 = grpdata.Instructor_id1;
      this.editedItem.instructor2 = grpdata.Instructor_id2;

      this.dialog2 = true;
      console.log(id);
    },
    updateItem() {
      //console.log(this.editedItem.final_domain+this.editedItem.instructor1+this.editedItem.instructor2)
      this.$http.put(`/api/updategrp`, this.editedItem);
      alert("SUCCESSFUL");
      this.dialog2 = false;
      this.mounted();
    },
    close() {
      this.dialog2 = false;
      this.dialog = false;
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_HOD") {
        console.log("OKAYS");
        this.logOut();
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
