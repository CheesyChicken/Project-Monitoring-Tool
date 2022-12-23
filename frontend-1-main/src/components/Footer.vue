<template>
  <v-footer light padless class="text-center" style="background-color:#34495e;">
    <v-layout justify-center class="mb-0">
      <p class="white--text mb-0">
            &copy; Copyright Vishwakarma Institutes {{ new Date().getFullYear() }} . All Rights
            Reserved.</p
          >
    </v-layout>
  </v-footer>
</template>
<script>
export default {};
</script>
<style scoped>
.c-title {
  background: #34495e;
  /*background-image: linear-gradient(-90deg, #8edffd, #034c70);*/
  color: #fff;
  position: fixed;
  bottom: 0;
}
</style>