<template>
  <div id="app" v-show="this.persongroup.length > 0">
    <div></div>

    <div id="box">
      <b-card style="background-color:#f2f2f2;border: 0px;" class="col-12">
        <h3 class="font-weight-light">
          Following groups have Signed Up but not filled the Project Details
        </h3>
        <div class="row">
          <div
            v-for="(item, index) in persongroup"
            v-bind:key="index"
            margin="10px"
            class="col-12 col-md-5 col-sm-4"
          >
            <!-- <div class="col-1"></div> -->
            <div class="col-12">
              <v-card
                class="bg-info white--text"
                style="border: 0px; padding: 10px;"
              >
                <div>
                  <h5 class="card-title text-uppercase">Project ID</h5>
                  <h4 class="card-title font-weight-light">
                    {{ item.Group_Name }}
                  </h4>
                  <hr class="new1" />
                  <h6>
                    <v-icon class="white--text mr-2">mdi-account</v-icon
                    ><strong>Group Leader : </strong>{{ item.leadername }}
                  </h6>
                  <h6>
                    <v-icon class="white--text mr-2">mdi-phone</v-icon
                    ><strong>Mobile : </strong>{{ item.leadermobile }}
                  </h6>
                  <h6>
                    <v-icon class="white--text mr-2">mdi-email</v-icon
                    ><strong>Email : </strong>{{ item.leaderemail }}
                  </h6>
                </div>
              </v-card>
            </div>
          </div>

          <div class="ml-3 mt-5">
            <p>
              <strong>Please Note:</strong> Project Monitoring for a group can
              only be started after the group has filled up the
              <strong>"About Project"</strong> form. <br />The details of groups
              along with contact details of the
              <strong> Group Leader</strong> are displayed above.
            </p>
          </div>
        </div>
      </b-card>
    </div>
    <!-- <p>{{ this.persongroup }}</p>
    }}
    <p>{{ this.currentUser }}</p>  -->
  </div>
</template>
<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data: () => {
    return {
      datas: [],
      persongroup: [],
      persons: [],
      leader: [],
    };
  },
  components: {},

  mounted() {
    console.log("mounted");
    this.getperson();
    this.loggedin();
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    loggedin() {
      if (this.currentUser.roles != "ROLE_GUIDE") {
        this.logOut();
      }
    },
    getperson() {
      this.$http.get(`/api/person/${this.currentUser.Person_Id}`).then(
        (result) => {
          console.log("persons");
          console.log(result.data);
          this.persons = result.data;
          this.getform();
        },
        (error) => {
          console.error(error);
        }
      );
    },

    async getform() {
      console.log("length " + this.persons.length);
      let results = [];

      for (let element of this.persons) {
        console.log("element");
        console.log(element.Group_id);
        let result = await this.$http.get(`/api/groups/${element.Group_id}`);
        //  console.log(result.data)
        results.push(result);
      }
      console.log(results.length);

      for (let result of results) {
        console.log(result.data);
        var group = result.data[0];
        var leader = result.data[1];

        if (!group[0].startDate) {
          let person = {};
          person.Group_id = group[0].Group_id;
          person.Group_Name = group[0].Group_Name;
          person.Guid_name = group[0].Guide_name;

          person.leadername = leader[0].leadername;
          person.leaderemail = leader[0].leaderemail;
          person.leadermobile = leader[0].leadermobile;
          console.log("person");
          console.log(person);

          this.persongroup.push(person);
        }
      }
    },
  },
};
</script>
<style scoped>
#app {
  padding-top: 1%;
  /* padding-left: 3%; */
  padding-bottom: 3%;
  align-items: center;
}
hr.new1 {
  border-top: 2px solid black;
}
</style>
>
