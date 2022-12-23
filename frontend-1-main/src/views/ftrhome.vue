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
    <!-- <p>{{ this.ftrmast }}</p> -->
    <div class="underNav"></div>
    <div>
      <!-- Schedule FTR Dialog -->
      <v-dialog v-model="dialogscheduleftr" width="500">
        <v-card>
          <v-card-title class="text-h5">Schedule FTR</v-card-title>

          <v-form ref="scheduleftrform">
            <v-card-text class="black--text">
              <v-text-field
                v-model="ftrn[0]"
                label="FTR Number"
                outlined
                dense
                filled
                readonly
              ></v-text-field>

              <!-- <label>FTR Name</label> -->
              <v-text-field
                v-model="ftrn[1]"
                label="FTR Name"
                placeholder="Enter FTR Name"
                outlined
                dense
              ></v-text-field>

              <v-text-field
                label="Academic Year"
                v-model="ay"
                outlined
                dense
                filled
                readonly
              ></v-text-field>

              <v-text-field
                label="Number of Questions"
                v-model="ftrn[3]"
                placeholder="For Example 2 3 5"
                type="number"
                outlined
                dense
              ></v-text-field>

              <v-select
                :items="semesteritems"
                item-text="semestername"
                item-value="no"
                label="Semester"
                v-model="sem"
                outlined
                dense
              ></v-select>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="EnableFTR">
                Schedule FTR
              </v-btn>
              <v-btn color="error" text @click="dialogscheduleftr = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>

      <!-- Enable FTR Dialog -->
      <v-dialog v-model="dialogenableftr" width="500">
        <v-card>
          <v-card-title class="text-h5">Enable FTR</v-card-title>

          <v-form ref="enableftrform">
            <v-card-text class="black--text">
              <v-select
                :items="ftrmst"
                :item-text="
                  (item) => `FTR ${item.ftr_number} -   ${item.ftr_name}`
                "
                item-value="ftr_number"
                label="Select FTR"
                @change="onChange122"
                outlined
                dense
              ></v-select>

              <div v-if="ftrnum">
                <v-text-field
                  :value="ftrnum"
                  label="FTR Number"
                  readonly
                  dense
                  outlined
                  filled
                ></v-text-field>

                <v-text-field
                  label="Academic Year"
                  v-model="ay"
                  :readonly="true"
                  outlined
                  dense
                  filled
                ></v-text-field>

                <v-text-field
                  v-model="semester"
                  label="Semester"
                  placeholder="Enter FTR Name"
                  readonly
                  outlined
                  dense
                  filled
                ></v-text-field>

                <h6 for="">Questions:</h6>
                <div v-for="(ftr, index) in ques" v-bind:key="ftr.id">
                  <v-textarea
                    placeholder="Yes/No Type Questions "
                    rows="2"
                    v-model="ftr.question"
                    :label="'Question' + ++index"
                    outlined
                    dense
                  ></v-textarea>
                </div>

                <v-menu v-model="menu1" max-width="290">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="enabledate"
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
                    v-model="enabledate"
                    :min="min"
                    :max="max"
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
                  >Due Date can of FTR can be till 15 days from
                  {{ minword }}</v-alert
                >
              </div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="postFTRques">
                Enable FTR
              </v-btn>
              <v-btn color="error" text @click="dialogenableftr = false">
                Cancel
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </div>
    <v-alert dense text v-if="ftr_enabled" type="info" color="red" class="mx-10"
      >Next FTR can be enabled after the ongoing FTR
      <strong> '{{ this.ongoingftr }}'</strong> is over by
      <strong>{{ this.ftrduedate }}</strong></v-alert
    >
    <div style="padding-left: 50px" class="d-flex">
      <v-btn
        class="primary white--text"
        id="show-btn"
        @click="dialogscheduleftr = true"
        >Schedule FTR</v-btn
      >

      <v-btn
        style=""
        class="success white--text ml-3"
        id="show-btn"
        @click="dialogenableftr = true"
        v-if="!ftr_enabled"
        >Enable FTR</v-btn
      >
    </div>
    <v-card class="mt-5" style="margin-left: 3%; margin-right: 3%">
      <div class="container">
        <div class="row">
          <div class="float-left">
            <select
              name="category_id"
              @change="onChange12($event)"
              class="form-control"
            >
              <option>--- Select FTR ---</option>
              <option
                v-for="(item, index) in ftrmast"
                v-bind:key="index"
                :value="item.ftr_master_id"
              >
                {{ item.ftr_number }}) {{ item.ftr_name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mb-3 mt-5">
        <div class="col-3"></div>
        <div class="col-md-3 col-sm-6 py-2">
          <div class="card bg-success text-white h-100">
            <div class="card-body bg-success">
              <div class="rotate">
                <i class="fa fa-user fa-4x"></i>
              </div>
              <h5 class="text-uppercase">Submited FTR</h5>
              <h1 class="display-4">{{ ftrm1 || "0" }}</h1>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 py-2">
          <div class="card text-white bg-danger h-100">
            <div class="card-body bg-danger">
              <div class="rotate">
                <i class="fa fa-list fa-4x"></i>
              </div>
              <h5 class="text-uppercase">Remaining FTR</h5>
              <h1 class="display-4">{{ ftrm2 || "0" }}</h1>
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title class="text-h5"> FTR Answers </v-card-title>

          <v-card-text>
            <h5 class="blue--text">{{ this.ftranswergroupname }}</h5>
            <h6>{{ this.ftranswergroupid }}</h6>
            <div :v-if="ftrAnswers.length > 0">
              <v-data-table
                :headers="columnsFtrAnswers"
                :items="ftrAnswers"
                :items-per-page="5"
                multi-sort
              >
              </v-data-table>
            </div>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          :items="datas"
          :search="search"
          :items-per-page="10"
          multi-sort
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="blue darken-1" text @click="showFtrAnswers(item)">
              Show
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
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
import Vue from "vue";
import Page3 from "./page3";
import dayjs from "dayjs";

Vue.prototype.$eventHub = new Vue();
export default {
  components: {
    Page3,
  },
  data() {
    const mindate = new Date();
    const maxdata = new Date();
    mindate.setDate(mindate.getDate() + 3);
    maxdata.setDate(maxdata.getDate() + 17);
    return {
      columns: [
        { value: "Group_title", text: "Group" },
        { value: "FullName", text: "Guide Name" },
        { value: "review", text: "Review" },
        { value: "Submit_Date", text: "Submit Date" },
        { value: "Approved_date", text: "Approved Date" },
        { text: "Answers", value: "actions", sortable: false },
      ],
      columnsFtrAnswers: [
        { value: "question_text", text: "Question" },
        { value: "Answer", text: "Answer" },
      ],
      search: "",
      dialog: false,
      ftrmast: [],
      ftrmaster: "",
      ftr_master: "",
      ftrmasterid: "",
      enabledate: mindate.toISOString().slice(0, 10),
      ftrm1: "",
      ftrm2: "",
      datas: [],
      ftrs: [],
      ftrn: [],
      ques: [],
      min: mindate.toISOString().slice(0, 10),
      max: maxdata.toISOString().slice(0, 10),
      minword: dayjs(mindate).format("DD MMMM YYYY"),
      values: "",
      ftrname: "",
      sem: "",
      college: "",
      semester: "",
      ay: "2020-2021",
      ftrnum: "",
      nqus: "",
      department: "",
      ftrmst: [],
      visible: false,
      enable: false,
      pageSettings: { pageSizes: true, pageSize: 5 },
      formatOptions: { type: "date", format: "dd/MM/yyyy" },
      customAttributes: { class: "customcss" },
      filterOptions: {
        ignoreAccent: true,
        type: "Menu",
      },
      ftrAnswers: [],
      ftr_enabled: false,
      semesteritems: [
        { semestername: "Semester 1", no: "1" },
        { semestername: "Semester 2", no: "2" },
      ],
      ftranswergroupname: "",
      ftranswergroupid: "",
      dialogscheduleftr: false,
      dialogenableftr: false,
      menu1: false,
      snackbar: false,
      snackbarmessage: "",
    };
  },
  created() {
    document.title = "FTR";
    this.$eventHub.$on("detail", (e) => {
      alert("passed value: " + e);
    });
  },
  mounted() {
    this.GetFTR();
    this.loggedin();
    this.GetFTR1();
    this.getcolleges();
    this.getdepartments();
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    showFtrAnswers(ftr) {
      this.dialog = true;
      this.getFtrAnswers(ftr);
    },
    getFtrAnswers(ftr) {
      this.ftrAnswers = [];
      this.ftranswergroupname = ftr.Group_title;
      this.ftranswergroupid = ftr.Group_Name;
      this.$http
        .get(`/api/ftranswer/${ftr.ftr_master_id}/${ftr.group_id}`)
        .then(
          (result) => {
            console.log(result.data);
            this.ftrAnswers = result.data;
          },
          (error) => {
            console.error(error);
          }
        );
    },
    GetFTR() {
      this.$http
        .get(
          `/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.ftrmast = result.data;
            for (let i = 0; i < this.ftrmast.length; i++) {
              if (this.ftrmast[i].Due_date) {
                if (
                  dayjs(new Date()).isBefore(dayjs(this.ftrmast[i].Due_date))
                ) {
                  this.ftr_enabled = true;
                  this.ftrduedate = dayjs(this.ftrmast[i].Due_date).format(
                    "DD MMMM YYYY"
                  );
                  this.ongoingftr = this.ftrmast[i].ftr_name;
                }
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    Getproject() {
      this.$http
        .get(
          `/api/ftrproject/${this.currentUser.college}/${this.currentUser.department}/${this.ftr_master}`
        )
        .then(
          (result) => {
            console.log(result.data);
            var ftrm = result.data;
            this.ftrm1 = ftrm[0][1];
            this.ftrm2 = ftrm[0][2];
            this.datas = ftrm[1];

            if (ftrm[1].Aproved_date) {
              this.enable = true;
              this.datas = ftrm[1];
              console.log("datas", this.datas);
            } else {
              this.enable = true;
            }
          },
          (error) => {
            console.error(error);
          }
        );
    },
    onChange12(event) {
      this.datas = [];
      this.ftrm1 = "";
      this.ftrm2 = "";
      this.ftr_master = event.target.value;
      console.log(this.ftr_master);
      this.Getproject();
    },

    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_HOD") {
        this.logOut();
      }
    },
    onChange1(event) {
      this.sem = event.target.value;
    },
    onChange122(value) {
      (this.semester = ""),
        (this.ay = ""),
        (this.ftrnum = ""),
        (this.ques = []);
      this.ftrname = parseInt(value);
      console.log("ftr value" + this.ftrname);
      this.ftrmasterid = this.ftrmast[this.ftrname - 1].ftr_master_id;
      this.semester = this.ftrmast[this.ftrname - 1].sem;
      this.ay = this.ftrmast[this.ftrname - 1].ay;
      this.ftrnum = this.ftrmast[this.ftrname - 1].ftr_number;
      this.nqus = this.ftrmast[this.ftrname - 1].No_of_Questions;
      this.GetFTR1();
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    showModal1() {
      this.$refs["my-modal1"].show();
    },
    hideModal() {
      (this.semester = ""),
        (this.ay = ""),
        (this.ftrnum = ""),
        (this.ques = []),
        //(this.values = ""),
        this.$refs["my-modal"].hide();
    },
    hideModal1() {
      this.ftrn = [];
      this.clg = "";
      this.sem = "";
      this.$refs["my-modal1"].hide();
    },

    GetFTR1() {
      this.$http
        .get(
          `/api/ftrmaster/${this.currentUser.college}/${this.currentUser.department}`
        )
        .then(
          (result) => {
            console.log(result.data);
            this.ftrmast = result.data;
            this.ftrn[0] = this.ftrmast.length + 1;
            for (let i = 0, j = 0; i < this.ftrmast.length; i++) {
              if (!this.ftrmast[i].Due_date) {
                this.ftrmst[j] = this.ftrmast[i];
                j++;
              }
            }
          },
          (error) => {
            console.error(error);
          }
        );

      for (let i = 0; i < this.nqus; i++) {
        var feed = { question: "" };
        this.ques.push(feed);
      }
    },

    EnableFTR() {
      this.dialogscheduleftr = false;
      this.$http
        .post(`/api/ftrmaster`, {
          FTRS: this.ftrn,
          ay: this.ay,
          college: this.currentUser.college,
          semester: this.sem,
          department: this.currentUser.department,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.ftrs = result.data;
            this.GetFTR1();
            this.toast("Success", "FTR Scheduled Successfully");
          },
          (error) => {
            console.error(error);
            this.toast("Failed", error);
          }
        );

      this.hideModal1();
      this.GetFTR();
      this.GetFTR1();
    },

    toast(type, message) {
      this.snackbarmessage = `${type} ! ${message}`;
      this.snackbar = true;
    },
    putFTR() {
      console.log(this.enabledate);
      this.$http
        .post(`/api/ftrmasters`, {
          date: this.enabledate,
          ft: this.ftrmasterid,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.ftrs = result.data;
            this.visible = true;
          },
          (error) => {
            console.error(error);
          }
        );
      this.$http
        .post(`/api/ftremail`, {
          dep: this.currentUser.Department_id,
        })
        .then(
          (result) => {
            console.log(result.data);
          },
          (error) => {
            console.error(error);
          }
        );
      this.hideModal1();
      this.GetFTR();
      this.GetFTR1();
    },

    postFTRques() {
      this.dialogenableftr = false;
      var count = Object.keys(this.ques).length;
      this.$http
        .post(`/api/ftrquestions`, {
          Ques: this.ques,
          ftno: this.ftrmasterid,
          cout: count,
        })
        .then(
          (result) => {
            console.log(result.data);
            this.ftrs = result.data;
            this.toast("Success", "FTR Enabled Successfully");
            this.GetFTR();
          },
          (error) => {
            console.error(error);
          }
        );
      this.putFTR();
      this.hideModal();
    },
    getcolleges() {
      this.$http.get(`/api/college`).then(
        (result) => {
          console.log(result.data);
          var colleges = result.data;
          colleges.forEach((element) => {
            if (element.College_id == this.currentUser.college) {
              this.college = element.College_Name;
            }
          });
        },

        (error) => {
          console.error(error);
        }
      );
    },
    getdepartments() {
      this.$http.get(`/api/department/${this.currentUser.college}`).then(
        (result) => {
          console.log(result.data);
          var departments = result.data;
          departments.forEach((element) => {
            if (element.Department_id == this.currentUser.department) {
              this.department = element.Department_Name;
            }
          });
        },
        (error) => {
          console.error(error);
        }
      );
    },
  },
};
</script>
<style scoped>
.underNav {
  margin-top: 50px;
}
</style>
<style></style>
