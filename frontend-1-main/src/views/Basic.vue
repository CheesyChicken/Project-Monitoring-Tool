<template>
<v-main>
<v-btn 
      to="/temp_signup"
      class="ml-5 mt-5"
      fab
      color="primary"
      style="text-decoration:none;"
      >
      <v-icon>mdi-arrow-left-bold</v-icon>
  </v-btn>
<div class="container"> 
  <!-- <vue-pdf-app pdf="/sample.pdf" @open="openHandler"  :page-number=pgNum></vue-pdf-app> -->
  
  </div> 
  </v-main>
</template>


<script>
// VuePdfApp component is registered in src/main.js
// import "vue-pdf-app/dist/icons/main.css";
// import VuePdfApp from "vue-pdf-app";
// import Loader from "../components/Loader.vue";
export default {
  name: "Basic",
  // components: {
  //   VuePdfApp,
  // },
  props:{
    pgNum:Number,
  },
  // components: {
  //   "vue-pdf-app": () => ({
  //     component: new Promise((res) => {
  //       return setTimeout(
  //         () => res(import(/* webpackChunkName: "pdf-viewer" */ "vue-pdf-app")),
  //         4000
  //       );
  //     }),
  //     loading: Loader
  //   })
  // },
 methods: {
     openHandler(pdfApp) {
       window._pdfApp = pdfApp;
     },
   },
};
</script>
 <style lang="css" scoped>
.container {
height: 90vh;
}

</style>
