<template>
  <div id="app">
    <Page4></Page4>

    <v-btn 
      :to="backroute"
      class="ml-5 mt-5"
      fab
      color="primary"
      style="text-decoration:none;"
      >
      <v-icon>mdi-arrow-left-bold</v-icon>
    </v-btn>
    <Table></Table>

  </div>
</template>

<script>
import Vue from "vue";
import Page4 from "../page4";
import Table from "../../components/allprojectstable";

Vue.prototype.$eventHub = new Vue();

export default {
  components: {
    Page4,
    Table
  },
  data: () => ({
    dep :"" ,
    backroute: "",
  }),
  created() {
    this.backroute = `/director/hods/${this.$route.params.depa}`;
    
    
  },

  
};
</script>
<style>

</style>