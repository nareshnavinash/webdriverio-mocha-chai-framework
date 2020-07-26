const Page = require('./page');

class LoginPage extends Page {
  get inputUsername() {return $('#username');}
  get inputPassword() {return $('#password');}
  get rememberMeCheckBox() {return $('#remember-me-checkbox');}
  get btnSignIn() {return $('#sign-in-btn');}

  /**
   * a method to login to postman
   * @param {string} username for the login page
   * @param {string} password for the login page
   * @return {void} returns nothing
   */
  login(username, password) {
    this.inputUsername.waitForExist(40000);
    this.inputUsername.setValue(username);
    this.inputPassword.setValue(password);
    this.rememberMeCheckBox.click();
    this.btnSignIn.click();
  }

  /**
   * a method to return whether the page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    return this.inputUsername.isExisting();
  }
}

module.exports = new LoginPage();
