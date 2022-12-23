import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import temp_signup from "./views/student_signup.vue";
//import Basic from "@/views/Basic.vue";
Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      //name: "home",
      component: Home,
    },
    {
      path: "/forgotpassword",
      name: "Forgot Password",
      component: () => import("./views/ForgotPassword.vue"),
    },
    {
      path: "/reset-password",
      name: "Password Reset",
      component: () => import("./views/PasswordReset.vue"),
    },
    {
      path: "/login",
      component: Login,
    },
    
    {
      path: "/facultyregister",
      name: "FacultyRegister1",
      component: () => import("./views/FacultyRegister.vue"),
    },
    {
      path: "/temp_signup",
      component: temp_signup,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./views/student/Profile.vue"),
    },
    {
      path: "/student",
      name: "student",
      component: () => import("./views/student/home.vue"),
    },
 
    {
      path: "/student/myproject",
      name: "Student My Project",
      component: () => import("./views/student/homepage.vue"),
    },
    
    {
      path: "/student/createproject",
      name: "Student Create Project",
      component: () => import("./views/student/create_project.vue"),
    },
    {
      path: "/student/alltask",
      name: "Student Task",
      component: () => import("./views/student/allTasks.vue"),
    },
    {
      path: "/student/PD/:id",
      name: "Project Details",
      component: () => import("./views/projectDetails.vue"),
    },
    {
      path: "/guide",
      name: "guide",
      component: () => import("./views/guide/home.vue"),
    },

    {
      path: "/guide/homepage/:id",
      name: "Guide HomePage",
      component: () => import("./views/guide/homepage.vue"),
    },
    
    {
      path: "/guide/alltask/:id",
      name: "Guide allTask",
      component: () => import("./views/guide/allTasks.vue"),
    },
    {
      path: "/guide/PD/:id",
      name: "Guide Project Details",
      component: () => import("./views/projectDetails.vue"),
    },
    {
      path: "/hod",
      name: "hod",
      component: () => import("./views/hod/homepage.vue"),
    },
    {
      path: "/hod/allproject/:stat/:depa",
      name: "HOD allTask",
      component: () => import("./views/hod/allProjects.vue"),
    },
    // {
    //   path: "/hod/allstudents",
    //   name: "HOD AllStudent",
    //   component: () => import("./views/hod/allStudents.vue"),
    // },
    {
      path: "/hod/hodedit",
      name: "HOD EDIT",
      component: () => import("./views/hod/editgrp.vue"),
    },
    {
      path: "/hod/editprofile",
      name: "Edit Hod Profile",
      component: () => import("./views/hod/editprofile.vue"),
    },
    {
      path: "/hod/profile",
      name: "Hod Profile",
      component: () => import("./views/hod/profile.vue"),
    },
    {
      path: "/hod/PD/:id",
      name: "HOD Project Details",
      component: () => import("./views/projectDetails.vue"),
    },

    {
      path: "/hod/yearwise",
      name: "HOD Yearwise Students",
      component: () => import("./views/hod/yearwise.vue"),
    },

    {
      path: "/hod/students/:year",
      name: "HOD Year Students",
      component: () => import("./views/hod/yearstudents.vue"),
    },
    {
      path: "/director",
      name: "director",
      component: () => import("./views/director/homepage.vue"),
    },
    // {
    //   path: "/director/home",
    //   name: "Director Home",
    //   component: () => import("./views/director/homepage.vue"),
    // },
    {
      path: "/director/allProjects",
      name: "Director allProjects",
      component: () => import("./views/director/allProjects.vue"),
    },
    {
      path: "/director/allprojects/:stat/:depa",
      name: "Director allTask",
      component: () => import("./views/director/department_allprojects.vue"),
    },
    {
      path: "/director/editprofile",
      name: "Director EditProfile",
      component: () => import("./views/director/editProfile.vue"),
    },
    {
      path: "/directorPD/:id",
      name: "Director Project Details",
      component: () => import("./views/projectDetails.vue"),
    },

    {
      path: "/director/hods/:dep",
      name: "Director HOD",
      component: () => import("./views/director/hod.vue"),
    },
    {
      path: "/director/table/:sts",
      name: "Director table",
      component: () => import("./views/director/table.vue"),
    },
    {
      path: "/director/yeartable/:sts",
      name: "Director Year table",
      component: () => import("./views/director/yeartable.vue"),
    },
    {
      path: "/director/profile",
      name: "Director Profile",
      component: () => import("./views/director/profile.vue"),
    },

    {
      path: "/director/yearwise",
      name: "Director Yearwise Students",
      component: () => import("./views/director/yearwise.vue"),
    },

    {
      path: "/director/students/:year",
      name: "Year Students",
      component: () => import("./views/director/yearstudents.vue"),
    },



    {
      path: "/management",
      name: "Management",
      component: () => import("./views/management/homepage.vue"),
    },
    {
      path: "/management/allProjects/",
      name: "Management AllProjects",
      component: () => import("./views/management/allprojects.vue"),
    },
    {
      path: "/management/allProjects/:stat",
      name: "Management AllProjects",
      component: () => import("./views/management/allprojects.vue"),
    },
    
    {
      path: "/management/addcompany",
      name: "Management addcompany",
      component: () => import("./views/management/addcompany.vue"),
    },
    // {
    //   path: "/management/home",
    //   name: "Management Home",
    //   component: () => import("./views/management/homepage.vue"),
    // },
    {
      path: "/management/director/:clg",
      name: "Management Director",
      component: () => import("./views/management/director.vue"),
    },
    {
      path: "/management/hod/:dep",
      name: "Management HOD",
      component: () => import("./views/management/hod.vue"),
    },
    {
      name: "Management Project Details",
      path: "/management/PD/:id",
      component: () => import("./views/projectDetails.vue"),
    },
    {
      path: "/FTRHOME",
      name: "FTRHOME",
      component: () => import("./views/ftrhome.vue"),
    },
    {
      path: "/guideprofile",
      name: "Guide Profile",
      component: () => import("./views/guide/profile2.vue"),
    },
    // {
    //   path: "/aboutus",
    //   name: "about_us",
    //   component: () => import("./views/about_us.vue"),
    // },
    {
      path: "/studcnt",
      name: "studcnt",
      component: () => import("./views/student/student_count.vue"),
    },

    {
      path: "/profileedit",
      name: "profileedit",
      component: () => import("./views/profileedit.vue"),
    },
    {
      path: "/student/editprofile",
      name: "Edit Profile",
      component: () => import("./views/student/editprofile.vue"),
    },
    {
      path: "/temp_signup/basic",
      name: "basic",
      component: () => import("./views/Basic.vue"),
      props: true,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/login",
    //"/register",
    //"/home",
    "/",
    "/temp_signup",
    "/facultyregister",
    "/facultyregister1",
    // "/aboutus",
    "/profileedit",
    "/temp_signup/basic",
    "/groupsignup",
    "/forgotpassword",
    "/reset-password",
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");
  if (authRequired && !loggedIn) {
    //next("/home");
    next("/");
  } else {
    next();
  }
});
