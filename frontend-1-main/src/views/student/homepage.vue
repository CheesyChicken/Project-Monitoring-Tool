<template>
  <div id="app">
    <div>
      <Page1 :showproj="true" :groupid="`${this.group_id}`"></Page1>
    </div>
    <!-- "/student/home" -->
    <v-btn
      style="text-decoration: none"
      to="/student"
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
        v-if="ftrstatus == 'notfilled'"
      >
        {{ message }}
      </v-alert>

      <v-alert dense text type="success" v-else-if="ftrstatus == 'filled'">
        {{ message }}
      </v-alert>

      <v-app-bar color="primary" dark flat class="pa-2 title1">
        <v-app-bar-title class="">
          <div>
            <div>{{ this.grouptitle }}</div>
            <div class="subtitle-1 font-weight-light">{{ this.groupname }}</div>
          </div></v-app-bar-title
        >
        <v-spacer></v-spacer>

        <!-- <v-btn
          text
          outlined
          class="mr-2"
          @click="showModal"
          v-b-tooltip.hover.topleft="'Click Here to create new task'"
        >
          <v-icon>mdi-plus</v-icon> Add New Task
        </v-btn> -->

        <v-btn
          text
          outlined
          v-if="visible"
          :disabled="submited"
          @click="dialogfillftr = true"
          v-b-tooltip.hover.topleft="'Fill FTR for your group'"
        >
          <v-icon>mdi-pencil</v-icon> Fill FTR
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
            <v-tab>Ongoing Tasks </v-tab>
            <v-tab>Rejected Tasks </v-tab>
            <v-tab>Completed Tasks </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-tabs-items v-model="currentItem">

        <!-- Current Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Alloted To</th>
                  <th>Due Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody v-for="(todo, index) in todos" v-bind:key="todo.Task_id">
                <tr v-if="todo.Start_date === `Not Started`">
                  <td>{{ ++index }}</td>
                  <td>{{ todo.Task_Name }}</td>
                  <td>{{ todo.FullName }}</td>
                  <td>{{ todo.Due_Date | formatDate }}</td>
                  <td>
                    <v-btn
                      class="error"
                      style="text-transform: none"
                      v-b-tooltip.hover.topleft="
                        'Click here to take up this task '
                      "
                      v-if="currentUser.Person_Id == todo.Alloted_To"
                      @click="deleteTask(todo.Task_id)"
                    >
                      Select
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody
                v-for="(pending, index) in pendings"
                v-bind:key="pending.Task_id"
              >
                <tr v-if="pending.Start_date === `Not Started`">
                  <td>{{ ++index }}</td>
                  <td>{{ pending.Task_Name }}</td>
                  <td>{{ pending.FullName }}</td>
                  <td>{{ pending.Due_Date | formatDate }}</td>
                  <td>
                    <v-btn
                      class="error"
                      style="text-transform: none"
                      v-b-tooltip.hover.topleft="
                        'Click here to take up this task '
                      "
                      v-if="currentUser.Person_Id == pending.Alloted_To"
                      @click="deleteTask(pending.Task_id)"
                    >
                      Select
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody
                v-for="(upcoming, index) in upcomings"
                v-bind:key="upcoming.Task_id"
              >
                <tr v-if="upcoming.Start_date === `Not Started`">
                  <td>{{ ++index }}</td>
                  <td>{{ upcoming.Task_Name }}</td>
                  <td>{{ upcoming.FullName }}</td>
                  <td>{{ upcoming.Due_Date | formatDate }}</td>
                  <td>
                    <v-btn
                      class="error"
                      style="text-transform: none"
                      v-b-tooltip.hover.topleft="
                        'Click here to take up this task '
                      "
                      v-if="currentUser.Person_Id == upcoming.Alloted_To"
                      @click="deleteTask(upcoming.Task_id)"
                    >
                      Select
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>

        <!-- Ongoing Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Alloted To</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(doing, index) in doings" v-bind:key="doing.Task_id">
                  <td>{{ ++index }}</td>
                  <td>{{ doing.Task_Name }}</td>
                  <td>{{ doing.FullName }}</td>
                  <td>{{ doing.Start_date }}</td>
                  <td>{{ doing.Due_Date }}</td>
                  <td>{{ doing.Status }}</td>
                  <td>
                    <!-- <b-button
                      id="show-btn"
                      variant="info"
                      v-b-tooltip.hover.bottom="
                        'Click here to add details of the task'
                      "
                      v-if="currentUser.Person_Id == doing.Alloted_To"
                      @click="showModal1(doing.Task_id)"
                      >Add Details</b-button
                    > -->
                    <v-btn
                      class="info"
                      style="text-transform: none"
                      v-b-tooltip.hover.left="
                        'Click here to add details of the task'
                      "
                      v-if="currentUser.Person_Id == doing.Alloted_To"
                      @click="
                        () => {
                          imp = doing.Task_id;
                          description =
                            doing.Task_Details == `NA`
                              ? ''
                              : doing.Task_Details;
                          difficulties =
                            doing.Challenges == 'NA' ? '' : doing.Challenges;
                          dialogsubmittask = true;
                        }
                      "
                      >Add Details</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>
        
        <!-- Rejected Tasks -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Alloted To</th>
                  <th>Start Date</th>
                  <th>New Due Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(reject, index) in rejects"
                  v-bind:key="reject.Task_id"
                >
                  <td>{{ ++index }}</td>
                  <td>{{ reject.Task_Name }}</td>
                  <td>{{ reject.FullName }}</td>
                  <td>{{ reject.Start_date }}</td>
                  <td>{{ reject.Due_Date }}</td>
                  <td>{{ reject.Reason }}</td>
                  <td>{{ reject.Status }}</td>
                  <td>
                    <!-- <b-button
                      id="show-btn"
                      v-b-tooltip.hover.bottomleft="
                        'Click here to add details of the task redone '
                      "
                      @click="showModal1(reject.Task_id)"
                      >Add Details</b-button
                    > -->

                    <v-btn
                      class="info"
                      style="text-transform: none"
                      v-b-tooltip.hover.left="
                        'Click here to add details of the task redone '
                      "
                      @click="
                        imp = reject.Task_id;
                        description =
                          reject.Task_Details == `NA`
                            ? ''
                            : reject.Task_Details;
                        difficulties =
                          reject.Challenges == 'NA' ? '' : reject.Challenges;
                        dialogsubmittask = true;
                      "
                      >Add Details</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </v-tab-item>

        <!-- Completed Tasks  -->
        <v-tab-item>
          <div class="scrolltable">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Task</th>
                  <th>Start Date</th>
                  <th>Approve Date</th>
                  <th>Status</th>
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
      </v-tabs-items>

      <!-- Fill FTR Dialog -->
      <v-dialog v-model="dialogfillftr" width="500">
        <v-card>
          <v-card-title class="text-h5"> {{ this.Ftrname }} </v-card-title>

          <v-form ref="fillftrform">
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

              <!-- <label>Remarks:</label>
              <v-textarea
                solo
                name="input-7-4"
                label="Remarks"
                rows="2"
                v-model="remark"
                required
              ></v-textarea> -->

              <div>
                <h6>
                  Project Guide -
                  <span class="font-weight-light">{{ GuideName }}</span>
                </h6>
              </div>
              <div>
                <h6>
                  Submitted On -
                  <span class="font-weight-light">{{
                    current_date | formatDate
                  }}</span>
                </h6>
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="submitFTR(ftrs)">
                Submit
              </v-btn>
              <v-btn color="error" text @click="dialogfillftr = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- Submit Task Dialog -->
      <v-dialog v-model="dialogsubmittask" width="500">
        <v-card>
          <v-card-title class="text-h5">Add Details</v-card-title>

          <v-form ref="submittaskForm">
            <v-card-text class="black--text">
              <h6>Description -</h6>
              <v-textarea
                solo
                name="input-7-4"
                label="What was the approach ?"
                rows="2"
                v-model="description"
                required
              ></v-textarea>

              <v-checkbox
                v-model="checked"
                label="Difficulties Faced"
                value="true"
              ></v-checkbox>

              <v-textarea
                solo
                v-if="checked"
                name="dif"
                v-model="difficulties"
                label="Mention difficulties faced"
                rows="2"
              ></v-textarea>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="addtask"> Submit </v-btn>
              <v-btn color="error" text @click="dialogsubmittask = false">
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
import Page1 from "../page1";
import dayjs from "dayjs";
import { BAlert } from "bootstrap-vue";
import Vue from "vue";
Vue.component("b-alert", BAlert);
export default {
  components: {
    Page1,
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "Student | Home";
  },
  data() {
    return {
      checked: false,
      valueDate: "",
      selected2: null,
      taskname: "",
      todos: [],
      doings: [],
      dones: [],
      rejects: [],
      pendings: [],
      upcomings: [],
      mins: "",
      maxs: "",
      imp: "",
      difficulties: "",
      description: "",
      def: "",
      gi: "",
      group_id: "",
      current_date: new Date(),
      Ftrno: "",
      dates: "",
      date1: "",
      message: "",
      ftr: [],
      ftr1: [],
      ftrs: [],
      date2: "",
      clg: 2,
      visible: false,
      sel: ["YES", "NO"],
      selr: [],
      submited: false,
      FullName: "",
      groupname: "",
      GuideName: "",
      checktask: false,
      groupname: "",
      grouptitle: "",
      currentItem: "tab-Web",
      ftrstatus: "noftr",
      dialogfillftr: false,
      dialogsubmittask: false,
      menu1: false,
      menu2: false,
      menu3: false,
      Ftrname: "",
      snackbar: false,
      snackbarmessage : "",
    };
  },
  mounted() {
    this.loggedin();
  },
  watch: {
    dialogfillftr() {
      this.$refs.fillftrform.reset();
    },
    dialogsubmittask() {
      this.$refs.submittaskform.reset();
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      this.getform(this.currentUser.Person_Id);
      /* if (this.currentUser.roles != "ROLE_M") {
        this.logOut();
      }*/
    },
    // toast(type, toaster, append = false) {
    //   console.log("Toast Called");
    //   this.$bvToast.toast(`${toaster}`, {
    //     title: `${type}`,
    //     toaster: "b-toaster-bottom-center",
    //     solid: true,
    //     appendToast: append,
    //   });
    // },
    toast(type, message) {
      this.snackbarmessage = `${type} ! ${message}`;
      this.snackbar = true;
      console.log("snackbar "+ this.snackbarmessage)
    },
    makeShow() {
      this.show = !this.show;
    },
    getFTR12(NO) {
      this.$http.get(`/api/ftrquestions/${NO}`).then(
        (result) => {
          console.log(result.data);
          this.ftrs = result.data;
          this.ftrs.forEach((element) => {
            element["Answer"];
          });
          this.date12 = dayjs(this.dates).format("DD-MM-YYYY");
          this.ftrstatus = "notfilled";
          this.message = `FTR ${this.Ftrno} is Enabled.Due Date of FTR is ${this.date12}.Please Fill FTR`;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    issubmitted(NO) {
      this.$http.get(`/api/ftrproject/${NO}/${this.group_id}`).then(
        (result) => {
          console.log("submitted");
          console.log(result.data);
          var submited = result.data;
          var date = dayjs(submited[0].Submit_Date).format("DD-MM-YYYY");
          if (submited.length > 0) {
            if (submited[0].Submit_Date) {
              this.visible = false;
              this.ftrstatus = "filled";
              this.message = `FTR ${this.Ftrno} is Submitted on ${date}.`;
            }
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
                this.Ftrname = this.ftr1[i].ftr_name;
                this.Ftrmasterid = this.ftr1[i].ftr_master_id;
                this.date1 = dayjs(this.dates).format("YYYYMMDD");
                this.date2 = dayjs(this.current_date).format("YYYYMMDD");
                console.log(this.date1 + " " + this.date2);
                if (Number(this.date1) >= Number(this.date2)) {
                  this.visible = true;
                  this.getFTR12(this.Ftrmasterid);
                  this.issubmitted(this.Ftrmasterid);
                  break;
                } else {
                  this.message = "No Message";
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
    getTasks() {
      this.FullName = this.currentUser.FullName;
      this.$http.get(`/api/task/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          this.todos = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getform(gi) {
      this.$http.get(`/api/getstartdate/${gi}`).then(
        (result) => {
          console.log(result.data);
          var tos = result.data;
          this.group_id = tos[0].Group_id;
          if (!tos[0].startDate) {
            this.$router.push("/Starting");
          }
          this.getTasks();
          this.getGroupData();
          this.getDoings();
          this.getRejects();
          this.getDones();
          this.getPendings();
          this.getUpcomings();
          this.getFTR();
          this.getTaskstatus();
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getTaskstatus() {
      this.$http.get(`/api/task_status/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          this.tod = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    
    getDoings() {
      this.$http.get(`/api/doing/${this.group_id}`).then(
        (result) => {
          console.log(this.group_id);
          console.log(result.data);
          this.doings = result.data;
          console.log("doings");
          console.log(this.doings);
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getGroupData() {
      this.$http.get(`/api/groups/${this.group_id}`).then(
        (result) => {
          console.log("groups");
          console.log(result.data);
          var groupid = result.data;
          var groupids = groupid[0];
          this.groupname = groupids[0].Group_Name;
          this.grouptitle = groupids[0].Group_title;
          this.GuideName = groupids[0].Guidename;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getRejects() {
      this.$http.get(`/api/reject/${this.group_id}`).then(
        (result) => {
          console.log(result.data);
          this.rejects = result.data;
        },
        (error) => {
          console.error(error);
        }
      );
    },
    getDones() {
      this.$http.get(`/api/done/${this.group_id}`).then(
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
      this.$http.get(`/api/pending/${this.group_id}`).then(
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
      this.$http.get(`/api/upcoming/${this.group_id}`).then(
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
      this.$http
        .post(`/api/task/${this.group_id}`, {
          taskname: this.taskname,
          allotedTo: this.currentUser.Person_Id,
          DueDate: this.valueDate,
        })
        .then((res) => {
          this.taskname = "";
          this.selected2 = "";
          this.valueDate = "";
          this.getTasks();
          this.getDones();
          this.getPendings();
          this.getUpcomings();

          this.hideModal();
          console.log(res);
          this.toast("Success", "Task Added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setSelected(tab) {
      this.selected = tab;
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    showModal2() {
      this.$refs["my-modal2"].show();
    },
    showModal5() {
      this.$refs["my-modal5"].show();
    },
    showModal1(SN) {
      this.$refs["my-modal1"].show();
      this.imp = SN;
    },
    hideModal() {
      (this.taskname = ""),
        (this.valueDate = ""),
        (this.selected2 = ""),
        this.$refs["my-modal"].hide();
    },
    hideModal1() {
      this.$refs["my-modal1"].hide();
    },
    hideModal2() {
      this.$refs["my-modal2"].hide();
    },
    hideModal5() {
      this.$refs["my-modal5"].hide();
    },
    deleteTask(SN) {
      this.$http
        .post(`/api/doing/${this.group_id}`, {
          SerialName: SN,
        })
        .then((res) => {
          this.getTasks();
          this.getDoings();
          this.getPendings();
          this.getUpcomings();
          this.hideModal();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitFTR(ftrs) {
      this.dialogfillftr = false;
      var count = Object.keys(ftrs).length;
      console.log(ftrs);
      this.$http
        .post(`/api/ftranswer`, {
          groupid: this.group_id,
          ftr: this.ftrs,
          cout: count,
        })
        .then((res) => {
          this.getFTR();
        });
      this.$http
        .post(`/api/ftrproject`, {
          groupid: this.group_id,
          ftrno: this.Ftrmasterid,
        })
        .then((res) => {
          this.getFTR();
        });

      this.toast("Success", "FTR Submitted Successfully");
    },
    addtask() {
      this.dialogsubmittask = false;
      this.$http
        .post(`/api/submit/${this.group_id}`, {
          SerialName: this.imp,
          TaskDetails: this.description,
          Challenges: this.difficulties,
        })
        .then((res) => {
          (this.description = ""), (this.difficulties = "");
          this.getDoings();
          this.getRejects();
          console.log(res);
          this.toast("Success", "Details Added Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModal1();
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

.scrolltable {
  overflow: scroll;
  max-height: 70vh;
}
</style>
