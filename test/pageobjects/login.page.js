const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
     * define selectors using getter methods
     */
  get inputUsername() {return $('#username');}
  get inputPassword() {return $('#password');}
  get rememberMeCheckBox() {return $('#remember-me-checkbox');}
  get btnSignIn() {return $('#sign-in-btn');}

  /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
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

  isDisplayed() {
    return this.inputUsername.isExisting();
  }

  /**
     * overwrite specifc options to adapt it to page object
     * @return {void}
     */
  open() {
    return super.open();
  }
}

module.exports = new LoginPage();
