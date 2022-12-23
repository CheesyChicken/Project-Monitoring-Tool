import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/auth/`;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "signin", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          document.cookie = `token=${response.data.accessToken}`;
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
    const cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      var eqPos = cookie.indexOf("=");
      var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
  register(user) {
    // console.log("AUTH-SERVICE");
    //   console.log(user);
    return axios.post(API_URL + "signup", {
      Person_Id: user.Person_Id,
      username: user.username,
      FullName: user.FullName,
      email: user.email,
      grno_EmpCode: user.grno_EmpCode,
      Mobile: user.Mobile,
      password: user.password,
      roles: user.roles,
      college: user.college,
      department: user.department,
    });
  }
  /* temp_signup(user) {
    return axios.post(API_URL + 'signup', {
      Person_Id:user.Person_Id,
      username: user.username,
      FullName: user.FullName,
      email: user.email,
      grno_EmpCode:user.grno_EmpCode,
      Mobile:user.Mobile,
      password: user.password,
      roles:user.roles,
      college:user.college,
      department:user.department
    });
  } */
}

export default new AuthService();
