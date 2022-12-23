<template>
  <div id="app">
    <div>
      <Page1
        v-if="isStudent === true"
        :groupid="this.$route.params.id"
        :showproj="true"
      ></Page1>
      <Page2
        v-else-if="isGuide === true"
        :groupid="this.$route.params.id"
        :showproj="true"
      ></Page2>
      <Page3 v-else-if="isHOD === true"></Page3>
      <Page4 v-else-if="isDirector === true"></Page4>
      <Page5 v-else></Page5>
      <!-- <Page2 v-if="isStudent === false"></Page2> -->
    </div>
    <br>
    <v-btn
      class="ml-5"
      fab
      color="primary"
      style="text-decoration: none"
      @click="
        () => {
          this.$router.go(-1);
        }
      "
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <v-container>
      <div class="text-center" v-if="students.length === 0">
        <v-progress-circular
          :size="70"
          :width="7"
          color="#348cd4"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-if="students.length > 0">
        <v-card class="pa-5 elevation-0" style="background-color: #f2f2f2">
          <v-row>
            <v-col md="6" cols="12">
              <p class="mt-3" style="font-size: 25px">
                {{ students[0].Group_title }}
              </p>
              <hr class="blue" />
            </v-col>
            <v-col md="6" cols="12">
              <v-select
                v-if="isGuide"
                :items="person"
                :item-text="
                  (item) => `${item.Group_title} - ${item.Group_Name}`
                "
                item-value="Group_id"
                @input="sendToProject"
                v-model="projectSelected"
                outlined
                :label="students[0].Group_title"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="6" lg="6">
              <v-card class="pa-4">
                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-calendar</v-icon>
                    <label><p>Academic Year :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label><p>2020-2021</p></label>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-book</v-icon>
                    <label><p>Project Id :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ students[0].Group_Name }}</p></label
                    >
                  </v-col>
                </v-row>
                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-bulletin-board</v-icon>
                    <label><p>Project Type :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ students[0].type }}</p></label
                    >
                  </v-col>
                </v-row>

                <v-row v-if="students[0].type == 'Industrial'">
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-home-modern</v-icon>
                    <label><p>Company :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ students[0].company }}</p></label
                    >
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-school</v-icon>
                    <label><p>Department :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ students[0].Department_Name }}</p></label
                    >
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-bank</v-icon>
                    <label><p>College :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ students[0].clg }}</p></label
                    >
                  </v-col>
                </v-row>

                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text">mdi-clock</v-icon>
                    <label><p>Project Duration :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ total }} Weeks</p></label
                    >
                  </v-col>
                </v-row>

                <!-- <div class="row">
                  <div class="col-12">
                    <div class="col-12" v-show="false">
                      <b-list-group horizontal="md">
                        <b-list-group-item>
                          <strong>Planning Phase </strong><br />
                          <hr />
                          {{ students[0].initial_Time }}Weeks</b-list-group-item
                        >
                        <b-list-group-item
                          ><strong>Design Phase</strong><br />
                          <hr />
                          {{ students[0].Design_Time }} Weeks</b-list-group-item
                        >
                        <b-list-group-item
                          ><strong>Devlopment Phase</strong><br />
                          <hr />
                          {{
                            students[0].Devlopment_Time
                          }}
                          Weeks</b-list-group-item
                        >
                        <b-list-group-item
                          ><strong>Testing Phase</strong><br />
                          <hr />
                          {{ students[0].Testing_Time }} Weeks
                        </b-list-group-item>
                        <b-list-group-item
                          ><strong>Deployment Phase</strong><br />
                          <hr />
                          {{
                            students[0].Deployment_Time
                          }}
                          Week</b-list-group-item
                        >
                      </b-list-group>
                    </div>
                  </div>
                </div> -->

                <v-row>
                  <v-col sm="4">
                    <v-icon class="mr-2 blue--text"
                      >mdi-arrange-bring-forward</v-icon
                    >
                    <label><p>Domain :</p></label>
                  </v-col>
                  <v-col sm="8">
                    <label
                      ><p>{{ students[0].dom4 }}</p></label
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col md="6" lg="6">
              <v-row>
                <v-col md="6" cols="12">
                  <v-card class="">
                    <v-card-text>
                      <div class="text--primary">Faculty Guide</div>
                      <p class="text-h6 text--primary">
                        {{ students[0].FullName }}
                      </p>
                      <div class="text--primary">
                        <v-icon>mdi-phone</v-icon>
                        {{ students[0].Mobile }}
                      </div>
                      <div class="text--primary">
                        <v-icon>mdi-email</v-icon>
                        {{ students[0].email }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col md="6" cols="12" v-if="students[0].type == 'Industrial'">
                  <v-card class="">
                    <v-card-text>
                      <div class="text--primary">Industry Guide</div>
                      <p class="text-h6 text--primary">
                        {{ students[0].guide2 }}
                      </p>
                      <div class="text--primary">
                        <!-- <v-icon>mdi-home-modern</v-icon> -->
                        {{ students[0].company }}
                      </div>
                      <div class="text--primary">
                        <v-icon>mdi-email</v-icon>
                        {{ students[0].guide2email }}
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-card class="mt-5">
                <v-card-text>
                  <div class="text--primary">Team Members</div>
                  <div v-for="(item, index) in stds" v-bind:key="index + 10">
                    <div class="d-flex mt-3">
                      <v-avatar color="blue white--text mr-3" size="30">{{
                        item.FullName[0]
                      }}</v-avatar>
                      <p class="font-weight-bold text--primary">
                        {{ item.FullName }}
                      </p>
                      <div class="text--primary ml-5">
                        <!-- <v-icon>mdi-email</v-icon> -->
                        {{ item.email }}
                      </div>
                    </div>
                    <div class="text--primary ml-9">
                      <v-icon>mdi-phone</v-icon>
                      {{ item.Mobile }}
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="6" lg="6" cols="12">
              <v-card class="pa-3">
                <v-card-title>Objective</v-card-title>
                <v-card-text>
                  <p>{{ students[0].Objective }}</p>
                </v-card-text>
              </v-card>
            </v-col>

            <v-col md="6" lg="6" cols="12">
              <v-card class="pa-3">
                <v-card-title>Scope</v-card-title>
                <v-card-text>
                  <p>{{ students[0].Scope }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="d-none d-md-flex">
            <v-col>
              <v-card class="text-center pa-3">
                <v-card-title>Tasks Completed per week</v-card-title>
                <svg id="svg1" width="900" height="500"></svg>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
  </div>
</template>
<script>
import * as d3 from "d3";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";

// import ProfileCard from "../components/ProfileCard.vue";

export default {
  data: () => {
    return {
      gi: "",
      students: [],
      total: "",
      gid: "",
      weeks: [],
      datas: [],
      cat: [],
      ind: false,
      stds: [],
      person: [],
      try: [
        { name: "computer Science", value: "20" },
        { name: "Information Tech", value: "30" },
        { name: "Science", value: "50" },
        { name: "Mechanical", value: "12" },
      ],
      grop: false,
      projectSelected: "",
    };
  },

  mounted() {
    this.verifyUser();
    this.getPDs();
    this.getperson();
    this.getweek();
    this.loggedin();
  },
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5,
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.mounted();
        this.gi = this.$route.params.id;
      },
    },
  },

  created() {
    this.gi = this.$route.params.id;
    document.title = "Project Details";
  },
  methods: {
    getPDs() {
      this.$http.get(`/api/pds/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.students = result.data;
          this.total =
            this.students[0].initial_Time +
            this.students[0].Design_Time +
            this.students[0].Devlopment_Time +
            this.students[0].Testing_Time +
            this.students[0].Deployment_Time;
          this.gid = this.students[0].Group_Name;
          if (this.students[0].Industry_guide) {
            this.ind = true;
          }
        },
        (error) => {
          console.error(error);
        }
      );
      let i = 0;
      this.$http.get(`/api/std/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          var std = result.data;
          var Students = [];
          for (i = 0; i < std.length; i++) {
            Students[i] = std[i][0];
          }
          while (Number(i) == Number(std.length)) {
            this.stds = Students;
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
    getweek() {
      this.$http.get(`/api/week/${this.gi}`).then(
        (result) => {
          console.log(result.data);
          this.weeks = result.data;
          let i = 0;
          this.weeks.forEach((element) => {
            this.datas[i] = element.name;
            this.cat[i] = element.value;
            i++;
          });
          this.getdata();
          //this.getdata1();
        },
        (error) => {
          console.error(error);
        }
      );
      return this.weeks;
    },
    sendToProject() {
      this.$router.push({
        name: "Guide Project Details",
        params: { id: this.projectSelected },
      });
    },

    getdata() {
      let marge = { top: 60, bottom: 60, left: 60, right: 60 };
      let svg1 = d3.select("#svg1");
      let width = svg1.attr("width");
      let height = svg1.attr("height");
      console.log(height);
      let g = svg1
        .append("g")
        .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

      var dataset = [];
      for (let i = 0; i < this.cat.length; i++) {
        dataset[i] = this.cat[i];
      }
      console.log(dataset);
      let xScale = d3
        .scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, width - marge.left - marge.right]);
      let xAxis = d3.axisBottom(xScale);
      let yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([height - marge.top - marge.bottom, 0]);
      let yAxis = d3.axisLeft(yScale);

      g.append("g")
        .attr(
          "transform",
          "translate(" + 0 + "," + (height - marge.top - marge.bottom) + ")"
        )
        .call(xAxis);
      /* let color = [
        "blue",
        "yellow",
        "green",
        "red",
        "orange",
        "violet",
        "lightblue",
        "pink",
        "gray",
        "purple",
        "#345678",
        "#af0fc0",
        "#abcdef",
        "#ff0ff0",
      ];*/
      g.append("g")
        .attr("transform", "translate(0, 0)")
        .call(yAxis);
      let gs = g
        .selectAll(".rect")
        .data(dataset)
        .enter()
        .append("g");
      let rectPadding = 20;
      gs.append("rect")
        .attr("x", function(d, i) {
          return xScale(i) + rectPadding / 2;
        })
        .attr("y", function() {
          let min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("width", function() {
          return xScale.step() - rectPadding;
        })
        .attr("height", function() {
          return 0;
        })
        .attr(
          "fill",
          "lightgreen" /*function (d, i) {
          return color[i];
        }*/
        )
        .transition()
        .duration(2000)
        .delay(function(d, i) {
          return i * 400;
        })
        // .ease(d3.easeElasticInout)
        .attr("y", function(d) {
          return yScale(d);
        })
        .attr("height", function(d) {
          return height - marge.top - marge.bottom - yScale(d);
        });
      gs.append("text")
        .attr("x", function(d, i) {
          return xScale(i) + rectPadding / 2;
        })
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .style("color", "white")
        .text("Value")
        .attr("y", function() {
          // return yScale(d)
          let min = yScale.domain()[0];
          return yScale(min);
        })
        .attr("dx", function() {
          (xScale.step() - rectPadding) / 2; // eslint-disable-line
        })
        .attr("dy", 20)
        .text(function(d) {
          return d;
        })
        .transition()
        .duration(2000)
        .delay(function(d, i) {
          return i * 400;
        })
        .attr("y", function(d) {
          return yScale(d);
        });

      g.append("text")
        .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
        .attr(
          "transform",
          "translate(" + width / 2 + "," + (height - marge.bottom) + ")"
        ) // centre below axis
        .text("Weeks")
        .style("font-size", "22px")
        .style("font-weight", "bold");
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - marge.left)
        .attr("x", 80 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("No of Tasks")
        .style("font-size", "22px")
        .style("font-weight", "bold");
    },
    /* getdata1() {
      var svg = d3.select("#svg2");
      var width = +svg.attr("width");
      var height = +svg.attr("height");
      var margin = { top: 20, left: 0, bottom: 30, right: 0 };
      var chartWidth = width - (margin.left + margin.right);
      var chartHeight = height - (margin.top + margin.bottom);
      this.chartLayer = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
      this.arc = d3
        .arc()
        .outerRadius(chartHeight / 2)
        .innerRadius(0)
        .padAngle(0.03)
        .cornerRadius(8);
      this.pieG = this.chartLayer
        .append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight / 2})`);

      this.drawChart(this.try);
    },
    drawChart: function (data) {
      let color = [
        "blue",
        "yellow",
        "green",
        "red",
        "orange",
        "violet",
        "lightblue",
        "pink",
        "gray",
        "purple",
        "#345678",
        "#af0fc0",
        "#abcdef",
        "#ff0ff0",
      ];
      var arcs = d3
        .pie()
        .sort(null)
        .value(function (d) {
          return d.value;
        })(data);
      var block = this.pieG.selectAll(".arc").data(arcs);
      block.select("path").attr("d", this.arc);
      var newBlock = block.enter().append("g").classed("arc", true);
      newBlock
        .append("path")
        .attr("d", this.arc)
        .attr("id", function (d, i) {
          return "arc-" + i;
        })
        .attr("stroke", "gray")
        .attr("fill", function (d, i) {
          return color[i];
        });

      newBlock
        .append("text")
        .attr("dx", 10)
        .attr("dy", -5)
        .append("textPath")
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .attr("xlink:href", function (d, i) {
          return "#arc-" + i;
        })
        .text(function (d) {
          return d.data.name;
        });
    },*/

    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      console.log("user", this.currentUser);
      // if (this.currentUser.roles == undefined) this.logOut();
    },

    verifyUser() {
      this.$http.get(`/api/verifyuser/${this.gi}`).then(
        (result) => {
          // console.log("verify")
          // console.log(result.data);
          if (this.isStudent) {
            let flag = false;
            for (let item of result.data.group) {
              // console.log("item "+item.Person_id+" "+this.currentUser.Person_Id)
              if (item.Person_id == this.currentUser.Person_Id) {
                flag = true;
              }
            }
            if (!flag) {
              alert("You are not a member of this group !");
              this.$router.go(-1);
            }
          } else if (this.isGuide) {
            if (result.data.guide != this.currentUser.Person_Id) {
              alert("This Project is not assigned to you !");
              this.$router.go(-1);
            }
          } else if (this.isHOD) {
            if (result.data.department != this.currentUser.department) {
              alert("This Project doesnot belong to your Department !");
              this.$router.go(-1);
            }
          }
        },
        (error) => {
          console.error(error);
        }
      );
    },
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
};
</script>
<style scoped>
.underNav {
  margin-top: 50px;
}
#box1 {
  width: auto;
  padding: 10px;
  margin: auto;
  margin-top: 2px;
  text-align: center;
  height: auto;
}
.ft {
  background-color: lightgrey;
}
#app {
  padding-top: 1%;
  padding-left: 3%;
  padding-right: 3%;
}

.blue-bg {
  background-color: #77773c;
  color: white;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
>
