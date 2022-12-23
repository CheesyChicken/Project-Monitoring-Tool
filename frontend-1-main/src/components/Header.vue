<template>
  <div>
    <v-container class="d-flex flex-wrap">
      <v-row justify="center"  >
        <img
          src="../assets/viitlogo.png"
          alt="Vishwakarma Institute Of Information Technology"
          class="logo img-responsive"
        />
        <!-- <div class="navbar-brand">
          <span>
            Bansilal Ramnath Agarwal Charitable Trust's<br />
            <b>Vishwakarma Institute Of Information Technology</b>
          </span>
          <br />
          <span id="taglineId" class="tagline"
            >(An Autonomous Institute affiliated to Savitribai Phule Pune
            University)<br />
            <span id="taglineId-red" class="red-text"
              >An ISO 9001-2015 Certified Institute Accredited with 'A' Grade By
              NAAC</span
            ></span
          >
        </div> -->
        <v-app-bar-title class="text-uppercase mt-5 ml-5">
          <h2>
            <span class=""> Vishwakarma</span>
            <span class="red--text"> Institutes</span>
          </h2>
        </v-app-bar-title>
        <!-- </v-col> -->
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
span {
  white-space: pre-wrap;
}
.navbar-brand > span > b {
  font-size: 24px;
  font-weight: 400;
  border-bottom: 1px solid #d7d7d7;
  padding-bottom: 10px;
  margin-bottom: 5px;
  display: block;
}

@media (max-width: 1199px) {
  .navbar-brand {
    padding-left: 20px;
  }
}
@media (max-width: 1199px) {
  .navbar-brand > span > b {
    font-size: 18px;
  }
}
@media (max-width: 767px) {
  .navbar-brand > span {
    font-size: 10px;
    line-height: 20px;
    padding: 0px 0px 0px 6px;
    width: 75%;
  }
}
@media (max-width: 1199px) {
  .navbar-brand > span {
    font-size: 11px;
    line-height: 20px;
    padding: 0px 0px 0px 10px;
  }
}
.navbar-brand > span {
  vertical-align: top;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  color: #292b2c;
  line-height: 24px;
  vertical-align: bottom;
  padding: 0px 0px 0px 20px;
}
.navbar-brand > span > .tagline {
  color: #5d5f61;
  font-size: 14px;
  line-height: 18px;
  display: block;
}
@media (max-width: 767px) {
  .navbar-brand > span > .tagline {
    display: none;
  }
}
@media (max-width: 1199px) {
  .navbar-brand > span > .tagline {
    font-size: 11px;
    line-height: 15px;
  }
}

.red-text {
  color: red;
}
</style>