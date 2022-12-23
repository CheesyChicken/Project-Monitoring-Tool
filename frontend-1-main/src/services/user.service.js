import axios from "axios";
import authHeader from "./auth-header";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/test/`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getStudentBoard() {
    return axios.get(API_URL + "student", { headers: authHeader() });
  }

  getGuideBoard() {
    return axios.get(API_URL + "guide", { headers: authHeader() });
  }

  getHodBoard() {
    return axios.get(API_URL + "hod", { headers: authHeader() });
  }

  getDirectorBoard() {
    return axios.get(API_URL + "director", { headers: authHeader() });
  }

  getManagementBoard() {
    return axios.get(API_URL + "management", { headers: authHeader() });
  }

  getCoordinatorBoard() {
    return axios.get(API_URL + "coordinator", { headers: authHeader() });
  }
}

export default new UserService();
