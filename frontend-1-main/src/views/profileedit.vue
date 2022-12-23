<template>
  <div id="app">
    <div class="col-md-12">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <form name="form" @submit.prevent="handleLogin">
          <div class="form-row">
            <div class="col-mx-6 col-md-6 col-sm-12">
              <label for="username">Username</label>
              <input
                v-validate="'required'"
                type="text"
                class="form-control"
                name="username"
              />
              <!-- <div  class="alert alert-danger" role="alert">
              Username is required!
            </div> -->
            </div>
            <div class="col-mx-6 col-md-6 col-sm-12">
              <label for="password">Password</label>
              <input
                v-validate="'required'"
                type="password"
                class="form-control"
                name="password"
              />
              <!-- <div  class="alert alert-danger" role="alert">
              Password is required!
            </div> -->
            </div>
          </div>
          <div class="form-row">
            <div class="col-mx-6 col-md-6 col-sm-12">
              <label for="email">Email</label>
              <input
                v-validate="'required'"
                type="email"
                class="form-control"
                name="email"
              />
            </div>
            <div class="col-mx-6 col-md-6 col-sm-12">
              <label for="phoneno">Phone Number</label>
              <input
                v-validate="'required'"
                type="phoneno"
                class="form-control"
                name="phoneno"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="col-mx-6 col-md-6 col-sm-12">
              <label for="grno">Gr/PRN No.</label>
              <input
                v-validate="'required'"
                type="grno"
                class="form-control"
                name="grno"
              />
            </div>
            <div class="col-mx-6 col-md-6 col-sm-12">
              <label for="rollno">Roll No.</label>
              <input
                v-validate="'required'"
                type="rollno"
                class="form-control"
                name="rollno"
              />
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <!-- <span  class="spinner-border spinner-border-sm"></span> -->
              <span>Update Profile</span>
            </button>
          </div>
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../models/user";
export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: "",
    };
  },
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 600px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
#app {
  height: 100%;
}
</style>



