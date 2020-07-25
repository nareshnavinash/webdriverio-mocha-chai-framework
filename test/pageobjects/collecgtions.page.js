const Page = require('./page');

class CollectionsPage extends Page {
  get switcherToggleButton() {return $('button.pm-ws-switcher__overlay-toggle span');}
  get workspaceLink() {return $('.pm-link--manage-workspace[href*=\'/workspaces\']');}

  getNameFromToggler() {
    return this.switcherToggleButton.getText();
  }

  moveToWorkspace() {
    this.switcherToggleButton.waitForExist(30000);
    this.switcherToggleButton.click();
    this.workspaceLink.click();
  }
}

module.exports = new CollectionsPage();
