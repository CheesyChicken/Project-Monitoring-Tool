<template>
  <div id="app">
    <Page3></Page3>

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
    <Table></Table>

  </div>
</template>

<script>
import Vue from "vue";
import Page3 from "../page3";
import Table from "../../components/allprojectstable";

Vue.prototype.$eventHub = new Vue();

export default {
  components: {
    Page3,
    Table
  },
  created () { 
      document.title="HOD | All Projects";
    },
  
};
</script>
<style>

</style>