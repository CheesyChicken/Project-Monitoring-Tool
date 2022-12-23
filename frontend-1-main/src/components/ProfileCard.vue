<template>
  <v-card class="mb-3">
    <v-col cols="12" align-self="centre">
      <!-- <v-avatar color="#348cd4" size="75">
        <span class="white--text text-h5">{{ initials }}</span>
      </v-avatar>
      <br /> -->
      <span class="title">{{ name }}</span>
      <br />
      <span>
        <v-icon class="mr-1" style="color: #4d4d4d">mdi-phone</v-icon>
        <span>{{ mobile }}</span>
        <br />
        <v-icon class="mr-1" style="color: #4d4d4d">mdi-email</v-icon>
        <span>{{ email }}</span>
      </span>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: "Profile Card",
  props: ["name", "mobile", "email"],
  //   computed: {
  //     initials() {
  //       let initials = [];
  //       let splitedName = this.name.split(" ");
  //       splitedName.forEach((e) => {
  //         initials.push(e[0]);
  //       });
  //       return initials.join("");
  //     },
  //   },
};
</script>