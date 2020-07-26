const Page = require('./page');

class Toast extends Page {
  get toastTitle() {return $('.pm-toast-title');}
  get toastBody() {return $('.pm-toast-body');}
  get toastDismiss() {return $('button.pm-toast-dismiss');}

  /**
   * a method to return whether the page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    this.toastBody.waitForExist(30000);
    return this.toastBody.isExisting();
  }

  /**
   * a method to return the toast title
   * @return {string} returns toast title
   */
  getToastTitle() {
    return this.toastTitle.getText();
  }

  /**
   * a method to return the toast body
   * @return {string} returns toast body
   */
  getToastBody() {
    return this.toastBody.getText();
  }

  /**
   * a method to dismiss the toast messages displayed in UI
   * @return {void} returns nothing
   */
  dismissToastIfDisplayed() {
    if (this.toastDismiss.isExisting()) {
      this.toastDismiss.click();
    }
  }
}

module.exports = new Toast();
