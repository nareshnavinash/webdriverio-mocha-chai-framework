const Page = require('./page');

class Toast extends Page {
  
  get toastTitle() {return $('.pm-toast-title');}
  get toastBody() {return $('.pm-toast-body');}

  // <h4 class="pm-h4 pm-toast-title">Personal workspace deleted</h4>
  // <div class="pm-toast-body">You've deleted the Creating a Workspace1595740862744 workspace.</div>
  // Personal workspace created
  // <div class="pm-toast-body">You've successfully created the test personal workspace. Add collections and environments to it to get started.</div>

  isDisplayed() {
    return this.toastBody.isExisting();
  }
  
  getToastTitle() {
    return this.toastTitle.getText()
  }

  getToastBody() {
    return this.toastBody.getText()
  }
}

module.exports = new Toast();
