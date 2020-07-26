const Page = require('./page');

class Toast extends Page {
  get toastTitle() {return $('.pm-toast-title');}
  get toastBody() {return $('.pm-toast-body');}
  get toastDismiss() {return $('button.pm-toast-dismiss');}

  isDisplayed() {
    this.toastBody.waitForExist(30000);
    return this.toastBody.isExisting();
  }

  getToastTitle() {
    return this.toastTitle.getText();
  }

  getToastBody() {
    return this.toastBody.getText();
  }

  dismissToastIfDisplayed() {
    if (this.toastDismiss.isExisting()) {
      this.toastDismiss.click();
    }
  }
}

module.exports = new Toast();
