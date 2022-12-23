<template>
  <div id="app">
    <div>
      <Page2 :groupid="`${this.$route.params.id}`" :showproj="true"></Page2>
    </div>
    <!-- <p>{{this.gi}}</p> -->
    <!-- /guide/home -->
    <v-btn
      style="text-decoration: none"
      to="/guide"
      class="ml-5 mt-3"
      fab
      color="primary"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-card class="mx-md-15 mx-1">
      <v-alert
        dense
        text
        type="info"
        color="red"
        v-if="ftrstatus == 'notfilled' || ftrstatus == 'notapproved'"
      >
        {{ message }}
      </v-alert>

      <v-alert dense text type="success" v-else-if="ftrstatus == 'submitted'">
        {{ message }}
      </v-alert>
      
      <v-app-bar
        color="primary"
        dark
        flat
        class="pa-2"
        :class="this.$route.params.title"
      >
        <v-app-bar-title>
          <div>
            <div class="text-uppercase">{{ this.grouptitle }}</div>
            <div class="subtitle-1 font-weight-light">{{ this.groupname }}</div>
          </div></v-app-bar-title
        >
        <v-spacer></v-spacer>

        <v-btn
          text
          outlined
          class="mr-2"
          @click="dialognewtask = true"
          v-b-tooltip.hover.topleft="'Click Here to create new task'"
        >
          <v-icon>mdi-plus</v-icon> Add New Task
        </v-btn>

        <v-btn
          text
          outlined
          v-if="visible"
          @click="dialogapproveftr = true"
          v-b-tooltip.hover.topleft="'Approve FTR filled by students'"
        >
          <v-icon>mdi-pencil</v-icon> Approve FTR
        </v-btn>

        <template v-slot:extension>
          <v-tabs
            v-model="currentItem"
            fixed-tabs
            slider-color="orange"
            slider-size="12"
          >
            <v-tab>Current Tasks </v-tab>
            <v-tab>Pending Tasks </v-tab>
            <v-tab>Upcoming Tasks </v-tab>
            <v-tab>Submitted Tasks </v-tab>
            <v-tab>Completed Tasks </v-tab>
            <v-tab>Deleted Tasks </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-tabs-items v-model="currentItem">

        <!-- Current Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped scrolltable">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Alloted To</th>
                  <th>Due Date</th>
                  <th>Started On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(todo, index) in todos" v-bind:key="todo.Task_id">
                  <td>{{ ++index }}</td>
                  <td>{{ todo.Task_Name }}</td>
                  <td>{{ todo.FullName }}</td>
                  <td>{{ todo.Due_Date | formatDate }}</td>
                  <td>
                    <p
                      class="red--text text-uppercase"
                      tile
                      text
                      v-if="todo.Start_date"
                      v-b-tooltip.hover.topleft="'Task Start Date'"
                    >
                      {{ todo.Start_date }}
                    </p>
                  </td>
                  <td>
                    <v-btn
                      class="success"
                      style="text-transform:none;"
                      @click="deleteT(todo.Task_id)"
                      v-b-tooltip.hover.topleft="'Here You Can Delete the Task'"
                    >
                      Delete
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>

        <!-- Pending Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Alloted To</th>
                  <th>Due Date</th>
                  <th>Started On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(todo, index) in pendings" v-bind:key="todo.Task_id">
                  <td>{{ ++index }}</td>
                  <td>{{ todo.Task_Name }}</td>
                  <td>{{ todo.FullName }}</td>
                  <td>{{ todo.Due_Date | formatDate }}</td>
                  <td>
                    <v-btn
                      class="red--text"
                      tile
                      text
                      v-b-tooltip.hover.topleft="'Task has been started'"
                    >
                      {{ todo.Start_date }}
                    </v-btn>
                  </td>
                  <td>
                    <v-btn
                      class="success"
                      style="text-transform:none;"
                      @click="deleteT(todo.Task_id)"
                      v-b-tooltip.hover.topleft="'Here You Can Delete the Task'"
                    >
                      Delete
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>

        <!-- Upcoming Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Alloted To</th>
                  <th>Due Date</th>
                  <th>Started</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(todo, index) in upcomings"
                  v-bind:key="todo.Task_id"
                >
                  <td>{{ ++index }}</td>
                  <td>{{ todo.Task_Name }}</td>
                  <td>{{ todo.FullName }}</td>
                  <td>{{ todo.Due_Date | formatDate }}</td>
                  <td>
                    <p
                      class="red--text text-uppercase"
                      tile
                      text
                      v-if="todo.Start_date"
                      v-b-tooltip.hover.topleft="'Task Start Date'"
                    >
                      {{ todo.Start_date }}
                    </p>
                  </td>
                  <td>
                    <v-btn
                      class="success"
                      style="text-transform:none;"
                      @click="deleteT(todo.Task_id)"
                      v-b-tooltip.hover.topleft="'Here You Can Delete the Task'"
                    >
                      Delete
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>


        <!-- Submitted Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>StudentName</th>
                  <th>DueDate</th>
                  <th>Task Details</th>
                  <th>Challenges</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(request, index) in requests"
                  v-bind:key="request.Task_id"
                >
                  <td>{{ ++index }}</td>
                  <td>{{ request.Task_Name }}</td>
                  <td>{{ request.FullName }}</td>
                  <td>{{ request.Due_Date | formatDate }}</td>
                  <td>{{ request.Task_Details }}</td>
                  <td>{{ request.Challenges }}</td>

                  <td>
                    <v-btn
                      class="success"
                      style="text-transform:none;"
                      @click="deleteTask(request.Task_id)"
                      v-b-tooltip.hover.topleft="
                        'click here to approve the task'
                      "
                    >
                      Approve
                    </v-btn>

                    <v-btn
                      class="error ml-2"
                      style="text-transform:none;"
                      @click="
                        ids = request.Task_id;
                        dialogrejecttask = true;
                      "
                      v-b-tooltip.hover.topleft="
                        ' click here to reject the task '
                      "
                    >
                      Reject
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>

        <!-- Completed Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Start Date</th>
                  <th>Approve Date</th>
                  <th colspan="2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(done, index) in dones" v-bind:key="done.Task_id">
                  <td>{{ ++index }}</td>
                  <td>{{ done.Task_Name }}</td>
                  <td>{{ done.Start_date | formatDate }}</td>
                  <td>{{ done.Approved_Date | formatDate }}</td>
                  <td>{{ done.Status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>

        <!-- Deleted Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Deleted Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(Delete, index) in deletes"
                  v-bind:key="Delete.Task_id"
                >
                  <td>{{ ++index }}</td>
                  <td>{{ Delete.Task_Name }}</td>
                  <td>{{ Delete.Due_Date | formatDate }}</td>
                  <td>{{ Delete.Deleted_Date | formatDate }}</td>
                  <td>{{ Delete.Status }}</td>
                  <td>
                    <v-btn
                      class="success"
                      style="text-transform: none"
                      @click="
                        imp = Delete.Task_id;
                        dialogretrivetask = true;
                      "
                      v-b-tooltip.hover.bottomleft="
                        'Click here to retrieve the deleted task'
                      "
                    >
                      Retrive
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>
      </v-tabs-items>
        
        <!-- New Task Dialog -->
        <v-dialog v-model="dialognewtask" width="500">
          <v-card>
            <v-card-title class="text-h5"> Add New task </v-card-title>

            <v-form ref="newtaskform">
              <v-card-text class="black--text">
                <label>Task:</label>
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Task Details"
                  rows="2"
                  v-model="taskname"
                  required
                ></v-textarea>
                <label>Allot To :</label>
                <v-select
                  :items="std"
                  item-value="Person_id"
                  item-text="FullName"
                  label="Select Student"
                  v-model="selected2"
                  outlined
                  required
                >
                </v-select>
                <v-menu v-model="menu1" max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="valueDate"
                      clearable
                      name="Due_Date"
                      label="Due Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="valueDate"
                    :min="startdate"
                    :max="enddate"
                    @change="menu1 = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <v-alert dense text type="info"
                  >Due Date can be from today till the end of project</v-alert
                >
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="newtask"> Submit </v-btn>
                <v-btn color="error" text @click="dialognewtask = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <!-- Approve FTR Dialog -->
        <v-dialog v-model="dialogapproveftr" width="500">
          <v-card>
            <v-card-title class="text-h5"> Approve FTR </v-card-title>

            <v-form ref="approveftrform">
              <v-card-text class="black--text">
                <h6>Due Date - {{ dates | formatDate }}</h6>

                <h6 class="mt-5">
                  Project -
                  <router-link
                    :to="{
                      name: 'Guide Project Details',
                      params: { id: gi },
                    }"
                    >{{ grouptitle }}</router-link
                  >
                </h6>

                <div v-for="(ftr, index) in ftrs" v-bind:key="ftr.id">
                  <v-card class="pa-2">
                    <p>{{ ++index }}.{{ ftr.question_text }}</p>

                    <v-select
                      :items="['YES', 'NO']"
                      v-model="ftr.Answer"
                      class="mt-0 pt-0"
                      outlined
                      dense
                    ></v-select>
                  </v-card>
                  <br />
                </div>

                <v-textarea
                  name="input-7-4"
                  label="Remarks"
                  rows="2"
                  v-model="remark"
                  outlined
                  dense
                  required
                ></v-textarea>

                <div>
                  <h6>
                    Approved By -
                    <span class="font-weight-light">{{ GuideName }}</span>
                  </h6>
                </div>
                <div>
                  <h6>
                    Approval Date -
                    <span class="font-weight-light">{{
                      current_date | formatDate
                    }}</span>
                  </h6>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="submitFTR(ftrs)">
                  Approve
                </v-btn>
                <v-btn color="error" text @click="dialogapproveftr = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <!-- Reject Task Dialog -->
        <v-dialog v-model="dialogrejecttask" width="500">
          <v-card>
            <v-card-title class="text-h5"> Add Details </v-card-title>

            <v-form ref="rejecttaskform">
              <v-card-text class="black--text">
                <h6>Reason -</h6>
                <v-textarea
                  solo
                  name="input-7-4"
                  label="What is the reason for rejection ?"
                  rows="2"
                  v-model="Reason"
                  required
                ></v-textarea>

                <v-menu v-model="menu2" max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newDueDate"
                      clearable
                      name="New_Due_Date"
                      label="New Due Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newDueDate"
                    :min="startdate"
                    :max="enddate"
                    @change="menu1 = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <v-alert dense text type="info"
                  >Due Date can be from today till the end of project</v-alert
                >
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="redoTask"> Reject </v-btn>
                <v-btn color="error" text @click="dialogrejecttask = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>

        <!-- Retrive Task Dialog -->
        <v-dialog v-model="dialogretrivetask" width="500">
          <v-card>
            <v-card-title class="text-h5"> Retrive Task </v-card-title>

            <v-form ref="retrivetaskform">
              <v-card-text class="black--text">
                <v-menu v-model="menu3" max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="Duedate"
                      clearable
                      name="New_Due_Date"
                      label="New Due Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      @click:clear="date = null"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="Duedate"
                    :min="startdate"
                    :max="enddate"
                    @change="menu1 = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
                <v-alert dense text type="info"
                  >Due Date can be from today till the end of project</v-alert
                >
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="readdTask"> Retrive </v-btn>
                <v-btn color="error" text @click="dialogretrivetask = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
    </v-card>

     <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarmessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>   

  </div>
</template>
<script>
/* eslint-disable */
import Page2 from "../page2";
import dayjs from "dayjs";
export default {
  name: "App",
  components: {
    Page2,
  },

  data() {
    return {
      selected: "TASK ",
      valueDate: "",
      mins: "",
      maxs: "",
      selected2: null,
      taskname: "",
      todos: [],
      doings: [],
      dones: [],
      deletes: [],
      pendings: [],
      upcomings: [],
      requests: [],
      def: "",
      imp: "",
      gi: "",
      visible: false,
      Duedate: "",
      ftr1: [],
      ftrs: [],
      date1: "",
      date2: "",
      date12: "",
      dates: "",
      Ftrno: "",
      message: "No Notifications",
      current_date: new Date(),
      ftrss: [],
      remark: "",
      fttr: [],
      clg: 2,
      Students: [],
      Suggestion: "",
      Reason: "",
      newDueDate: "",
      ids: "",
      person: "",
      grop: false,
      ftrmasterno: "",
      groupname: "",
      grouptitle: "",
      leader: "",
      GuideName: "",
      std: [],
      startdate: "",
      enddate: "",
      projectSelected: "",
      currentItem: "tab-Web",
      ftrstatus: "noftr",
      dialognewtask: false,
      dialogapproveftr: false,
      dialogrejecttask: false,
      dialogretrivetask: false,
      menu1: false,
      menu2: false,
      menu3: false,
      snackbar: false,
      snackbarmessage : "",
    };
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.mounted();
        this.gi = this.$route.params.id;
      },
    },

      dialognewtask() {
        this.$refs.newtaskform.reset();
      },
      
      dialogrejecttask() {
        this.$refs.rejecttaskform.reset();
      },
      dialogretrivetask() {
        this.$refs.retrivetaskform.reset();
      },
  },

  created() {
    this.gi = this.$route.params.id;
  },
  mounted() {
    this.getTasks();
    this.getSubmits();
    this.getDones();
    // this.getDoings();
    this.getDeletes();
    this.getPendings();
    this.getUpcomings();
    this.getFTR();
    this.getstd();
    this.getperson();
    this.getGroupData();
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  methods: {
    makeShow() {
      this.show = !this.show;
    },
    onChange21(event) {
      this.selected2 = event.target.value;
    },
    toast(type, message) {
      this.snackbarmessage = `${type} ! ${message}`;
      this.snackbar = true;
      console.log("snackbar "+ this.snackbarmessage)
    },
    getGroupData() {
      this.$http.get(`/api/groups/${this.gi}`).then(
        (result) => {
          console.log("groups");
          console.log(result.data);
          var groupid = result.data;
          var groupids = groupid[0];
          this.groupname = groupids[0].Group_Name;
          this.grouptitle = groupids[0].Group_title;
          this.GuideName = groupids[0].Guidename;
          (this.startdate = new Date().toISOString().slice(0, 10)),
            (this.enddate = new Date(groupids[0].endDate)
              .toISOString()
              .slice(0, 10));
          // this.startdate.setDate(this.startdate.getDate() - 1);
          // this.enddate.setDate(this.enddate.getDate() - 1);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getstd() {
      console.log(this.gi);
      let i = 0;
      this.$http.get(`/api/std/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var stds = result.data;
          var std;
          for (i = 0; i < stds.length; i++) {
            this.Students[i] = stds[i][0];
          }
          while (Number(i) == Number(stds.length)) {
            this.std = this.Students;
            return;
          }
        },
        (error) => {
          console.error(error);
        }
      );
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
    getFTR12(NO) {
      console.log("NO " + NO);
      this.$http.get(`/api/ftranswer/${NO}/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.ftrs = result.data;
          console.log("FTR");
          this.date12 = dayjs(this.dates).format("DD-MM-YYYY");
          this.message = `FTR ${this.Ftrno} is Enabled.Due Date of FTR is ${this.date12}. Please Aprove FTR  `;
          this.ftrstatus = "notapproved";
          this.issubmitted(NO);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    issubmitted(NO) {
      this.$http.get(`/api/ftrproject/${NO}/${this.gi}`).then(
        (result) => {
          console.log("submitted");
          console.log(result.data);
          var submited = result.data;
          if (submited.length > 0) {
            var date = dayjs(submited[0].Submit_Date).format("DD-MM-YYYY");
            if (!submited[0].Submit_Date) {
              console.log("first if");
              this.visible = false;
              this.ftrstatus = "notfilled";
              this.message = `FTR ${this.Ftrno} is Enabled. Due Date of FTR is ${this.date12}. Please Ask Group Members to fill FTR`;
            } else {
              if (submited[0].Approved_date) {
                console.log("first else if");
                this.visible = false;
                this.ftrstatus = "submitted";
                this.message = `FTR ${this.Ftrno} is Submitted on ${date}.`;
              } else {
                this.visible = true;
              }
            }
          } else {
            this.visible = false;
            this.ftrstatus = "notfilled";
            this.message = `FTR ${this.Ftrno} is Enabled. Due Date of FTR is ${this.date12}. Please Ask Group Members to fill FTR`;
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getFTR() {
      this.$http
        .get(
          `/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log("FTR");
            console.log(result.data);
            this.ftr1 = result.data;
            for (let i = 0; i < this.ftr1.length; i++) {
              if (this.ftr1[i].Due_date) {
                this.dates = this.ftr1[i].Due_date;
                this.Ftrno = this.ftr1[i].ftr_number;
                this.ftrmasterno = this.ftr1[i].ftr_master_id;
                this.date1 = dayjs(this.dates).format("YYYYMMDD");
                this.date2 = dayjs(this.current_date).format("YYYYMMDD");
                console.log("date " + this.date1 + " " + this.date2);
                if (Number(this.date1) >= Number(this.date2)) {
                  this.visible = true;
                  console.log("ftrnp" + this.ftrmasterno);
                  this.getFTR12(this.ftrmasterno);
                  break;
                } else {
                  this.message = "NO Message";
                  this.ftrstatus = "notftr";
                  this.visible = false;
                }
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    // getTasks() {
    //   console.log(this.gi);
    //   this.$http.get(`/api/task/${this.gi}`).then(
    //     (result) => {
    //       console.log(result.data);
    //       var toso = result.data;
    //       if (toso[0]) {
    //         this.showModal2();
    //       }
    //       this.todos = toso[1];
    //       this.mins = toso[2];
    //       this.maxs = toso[3];
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );

    //   this.$http.put(`/api/week/${this.gi}`).then(
    //     (result) => {
    //       console.log(result.data);
    //       this.tos = result.data;
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // },

    getTasks() {
      console.log(this.gi);
      this.$http.get(`/api/task/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.todos = result.data;
          // this.todos = toso[1];
          // this.mins = toso[2];
          // this.maxs = toso[3];
        },
        (error) => {
          console.error(error);
        }
      );

      // this.$http.put(`/api/week/${this.gi}`).then(
      //   (result) => {
      //     console.log(result.data);
      //     this.tos = result.data;
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
    },

    getDeletes() {
      this.$http.get(`/api/deletes/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.deletes = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDoings() {
      this.$http.get(`/api/doing/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var dos = result.data;
          this.doings = dos[1];
        },
        (error) => {
          console.error(error);
        }
      );
    },
    // getSubmits() {
    //   this.$http.get(`/api/submit/${this.gi}`).then(
    //     (result) => {
    //       console.log(result.data);
    //       var reqs = result.data;
    //       this.requests = reqs[1];
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
    // },

    getSubmits() {
      this.$http.get(`/api/submit/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.requests = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    getDones() {
      this.$http.get(`/api/done/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.dones = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getPendings() {
      this.$http.get(`/api/pending/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var pending = result.data;
          this.pendings = pending;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    getUpcomings() {
      this.$http.get(`/api/upcoming/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var upcoming = result.data;
          this.upcomings = upcoming;
        },
        (error) => {
          console.error(error);
        }
      );
    },

    newtask() {
      this.dialognewtask = false;
      console.log(this.taskname);
      console.log(this.selected2);
      console.log(this.velueDate);
      this.$http
        .post(`/api/task/${this.gi}`, {
          taskname: this.taskname,
          allotedTo: this.selected2,
          DueDate: this.valueDate,
        })
        .then((res) => {
          this.taskname = "";
          this.selected2 = "";
          this.valueDate = "";
          this.getTasks();
          // this.getPendings();
          this.getUpcomings();
          console.log(res);
          this.toast("Success", "Task Added Successfully ");
        })
        .catch((err) => {
          console.log(err);
        });
      // axios
      //   .post(`/api/week/${this.gi}`, {
      //     DueDate: this.valueDate,
      //   })
      //   .then(
      //     (result) => {
      //       console.log(result.data);
      //       this.week = result.data;
      //     },
      //     (error) => {
      //       console.error(error);
      //     }
      //   );
    },
    setSelected(tab) {
      this.selected = tab;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    ShowRejectedModal(id) {
      this.ids = id;
      this.$refs["rejectmodal"].show();
    },
    HideRejectModal() {
      this.Suggestion = "";
      this.Reason = "";
      this.newDueDate = "";
      this.$refs["rejectmodal"].hide();
    },

    showModal11(SN) {
      this.imp = SN;
      this.$refs["my-modal11"].show();
    },
    showModal5() {
      this.$refs["my-modal5"].show();
      this.getFTR();
    },

    hideModal11() {
      this.Duedate = "";
      this.$refs["my-modal11"].hide();
    },
    hideModal5() {
      this.fttr = [];
      this.remark = "";
      this.$refs["my-modal5"].hide();
    },
    hideModal() {
      (this.taskname = ""),
        (this.valueDate = ""),
        (this.selected2 = ""),
        this.$refs["my-modal"].hide();
    },
    deleteTask(SN) {
      this.$http
        .post(`/api/done`, {
          SerialName: SN,
          groupid: this.gi,
        })
        .then((res) => {
          this.getSubmits();
          this.getDones();
          this.hideModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$http
        .post(`/api/task_status`, {
          SerialName: SN,
        })
        .then((res) => {
          this.getSubmits();
          this.getDones();
          this.hideModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      this.$http.post(`/api/week/${this.gi}`, {}).then(
        (result) => {
          console.log(result.data);
          this.week = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    redoTask() {
      this.dialogrejecttask = false;
      this.$http
        .put(`this.$http/api/doing`, {
          Reason: this.Reason,
          SerialName: this.ids,
          Due_date: this.newDueDate,
        })
        .then((res) => {
          this.getSubmits();
          this.getTasks();
          this.getPendings();
          this.getUpcomings();
          this.hideModal();
          this.HideRejectModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteT(SN) {
      var result = confirm("Are you sure you want to delete the task ?");
      if(result)
      {
      this.$http
        .put(`/api/task`, {
          SerialName: SN,
        })
        .then((res) => {
          this.getTasks();
          this.getDeletes();
          this.getPendings();
          this.getPendings();
          this.getUpcomings();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    readdTask() {
      this.dialogretrivetask = false;
      this.$http
        .post(`/api/deletes`, {
          SerialName: this.imp,
          DueDate: this.Duedate,
        })
        .then((res) => {
          this.getDeletes();
          this.getTasks();
          this.getUpcomings();
          this.hideModal11();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitFTR(ftrs) {
      this.dialogapproveftr = false;
      this.$http
        .put(`/api/ftranswer`, {
          groupid: this.gi,
          ftr: ftrs,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.groupftr();
      this.hideModal5();
    },
    groupftr() {
      this.$http
        .put(`/api/ftrproject`, {
          groupid: this.gi,
          ftrmasterno: this.ftrmasterno,
          remark: this.remark,
          reviewid: this.currentUser.Person_Id,
        })
        .then((res) => {
          console.log(res);
          this.getFTR();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendToProject() {
      this.$router.push({
        name: "Guide HomePage",
        params: { id: this.projectSelected },
      });
    },
  },
};
</script>
<style scoped>
#box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}

.title1 {
  background-color: #566e7a !important;
}

.title2 {
  background-color: #397be9 !important;
}

.title3 {
  background-color: #009788 !important;
}
.title4 {
  background-color: #009788 !important;
}

.title5 {
  background-color: #397be9 !important;
}

.scrolltable {
  overflow: scroll;
  max-height: 70vh;
}
</style>

-----------------------
