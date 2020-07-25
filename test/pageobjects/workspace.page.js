const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class WorkSpace extends Page {
  /**
     * define selectors using getter methods
     */
  get title() {return $('.pm-h1');}
  get workspaceList() {return $('.workspaces-list');}

  isDisplayed() {
    this.workspaceList.waitForExist(10000);
    return this.workspaceList.isExisting();
  }
}

module.exports = new WorkSpace();
