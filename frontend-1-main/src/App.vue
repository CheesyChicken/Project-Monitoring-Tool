<template>
  <v-app>
    <v-main class="">
      <router-view :key="$route.fullPath"> </router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Footer },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      this.$http.defaults.headers.common["x-access-token"] = user.accessToken;
    }
  },
  data: () => ({
    //
  }),
};
</script>
