import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.min.css";
//import '@mdi/font/css/materialdesignicons.css'
import { API_BASE_URL } from "./config";
// import { BootstrapVue } from "bootstrap-vue";
import { FormPlugin,FormInputPlugin,ButtonPlugin,/*FormTextareaPlugin,*//*CardPlugin*/ /*TabsPlugin,ModalPlugin,*//*AlertPlugin,ToastPlugin*/ListGroupPlugin,/*DropdownPlugin,*/TooltipPlugin,/*FormDatepickerPlugin*/} from 'bootstrap-vue'
Vue.use(FormPlugin)
// Vue.use(CardPlugin)
// Vue.use(TabsPlugin)
// Vue.use(ButtonGroupPlugin)
// Vue.use(ModalPlugin)
// Vue.use(AlertPlugin)
// Vue.use(ToastPlugin);
Vue.use(ListGroupPlugin);
// Vue.use(DropdownPlugin)
Vue.use(TooltipPlugin)
// Vue.use(FormDatepickerPlugin)
Vue.use(FormInputPlugin)
Vue.use(ButtonPlugin)
// Vue.use(FormTextareaPlugin)



// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// import JsonCSV from "vue-json-csv";

//import Vuetify from 'vuetify'
import "vuetify/dist/vuetify.min.css";

// import {
//   faHome,
//   faUser,
//   faUserPlus,
//   faSignInAlt,
//   faSignOutAlt,
//   faBars,
// } from "@fortawesome/free-solid-svg-icons";

import vuetify from "./plugins/vuetify";
import Axios from "axios";
//import VeeValidate from "vee-validate";
//import { Validator } from "vee-validate";
// Vue.use(VeeValidate);

import {
  Validator,
  install as VeeValidate,
} from "vee-validate/dist/vee-validate.minimal.esm.js";
import {
  required,
  min,
  max,
  alpha_spaces,
  confirmed,
  regex,
  email,
} from "vee-validate/dist/rules.esm.js";
import veeEn from "vee-validate/dist/locale/en";
// Add the rules you need.
Validator.extend("required", required);
Validator.extend("min", min);
Validator.extend("max", max);
Validator.extend("alpha_spaces", alpha_spaces);
Validator.extend("confirmed", confirmed);
Validator.extend("regex", regex);
Validator.extend("email", email);

// Merge the messages.
Validator.localize("en", veeEn);
// install the plugin
Vue.use(VeeValidate);

import dayjs from "dayjs";
// library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faBars);
Vue.filter("formatDate", function(value) {
  if (value) {
    return dayjs(value).format("DD/MM/YYYY ");
  }
});
Vue.config.productionTip = false;
Vue.mixin({
  computed: { dayjs: dayjs },
});
// Vue.use(IconsPlugin);

// Vue.component("font-awesome-icon", FontAwesomeIcon);
// Vue.use(BootstrapVue);
//Vue.component("downloadCsv", JsonCSV);
const dict = {
  custom: {
    password: {
      regex:
        "Password requires 1 of each of the following: uppercase letter, lowercase letter, number, special character.",
    },
    mobile: {
      regex: "enter valid indian mobile number.",
    },
    email: {
      regex: "enter the college mail id ending with vit.edu and viit.ac.in",
    },
    username: {
      regex:
        "Only small Alphabets, AlphaNum, Dot and Underscore allowed in Username",
    },
    grno_EmpCode: {
      regex: "Enter valid number",
    },
  },
};

const instance = Axios.create({ baseURL: API_BASE_URL });
Vue.prototype.$http = instance;
Validator.localize("en", dict);
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
