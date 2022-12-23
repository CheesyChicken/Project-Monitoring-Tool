<template>
  <div id="app">
    <Page4></Page4>
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
      <Profile></Profile>
    </div>
    
  </div>
</template>

<script>
import Page4 from "../page4";
import Profile from "../../components/Profile";

export default {
  components: {
    Page4,
    Profile,
  },
  created () { 
      document.title="Director | Profile";
    },
};
</script>
<style scoped>
#box {
  padding-top: 2%;
  padding-right: 2%;
  padding-left: 2%;
}
</style>
>
<style></style>
