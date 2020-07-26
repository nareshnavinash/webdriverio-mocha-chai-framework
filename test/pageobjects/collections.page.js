const Page = require('./page');

class CollectionsPage extends Page {
  get switcherToggleButton() {return $('button.pm-ws-switcher__overlay-toggle span');}
  get workspaceLink() {return $('.pm-link--manage-workspace[href*=\'/workspaces\']');}
  get collectionsTab() {return $('.workspace-bar__btn-collections=Collections');}

  /**
   * a method to return whether the page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    this.collectionsTab.waitForExist(30000);
    return this.collectionsTab.isExisting();
  }

  /**
   * a method to return text from toggler
   * @return {string} returns name displayed in the toggler
   */
  getNameFromToggler() {
    return this.switcherToggleButton.getText();
  }

  /**
   * a method to move from collections to workspace page
   * @return {void} returns nothing
   */
  moveToWorkspace() {
    this.switcherToggleButton.waitForExist(30000);
    this.switcherToggleButton.click();
    this.workspaceLink.click();
  }
}

module.exports = new CollectionsPage();
