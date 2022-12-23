export default class User {
    constructor(username, email, password,roles,Person_Id) {
      this.Person_Id=Person_Id
      this.username = username;
      this.email = email;
      this.password = password;
      this.roles = roles;
    }
  }