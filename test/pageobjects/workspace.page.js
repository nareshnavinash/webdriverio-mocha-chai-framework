const Page = require('./page');

class WorkSpace extends Page {
  get title() {return $('.pm-h1');}
  get workspaceList() {return $('.workspaces-list');}
  get workspaceAvailableNames() {return $('.rt-tbody');}
  get workspaceNamesList() {return $$('.workspace-table__title .pm-link[href*="/workspaces"]');}
  get createWorkspaceButton() {return $('button.workspace-list__create');}
  workspaceMoreOptionsButton(count) {return $('div.rt-table div.rt-tbody div:nth-child(' + count + ') div.rt-td.workspace-table__actions button.pm-btn-icon');}
  get workspaceRename() {return $('div.option=Rename');}
  get workspaceEditDescription() {return $('div.option=Edit Description');}
  get workspaceDelete() {return $('div.option=Delete');}
  get newWorkspaceName() {return $('input#ws-name');}
  get newWorkspaceSummary() {return $('textarea.pm-form-control');}
  get newWorkspaceType() {return $('.pm-toggle-switch span');}
  // Toggle types are - Personal | Team
  newWorkspaceTypeToggle(text) {return $('.pm-toggle-switch__item=' + text);}
  get newWorkspaceInviteTeamMember() {return $('input.Select-input');}
  get newWorkspaceCreateNewWorkspaceButton() {return $('button.pm-actions__confirm');}
  get newWorkspaceCancelButton() {return $('button.pm-actions__cancel');}
  get deleteWorkspacePopup() {return $('.pm-card-body');}
  get deleteWorkspacePopupDeleteButton() {return $('.pm-modal-confirm .pm-modal-confirm__actions button.pm-modal-confirm__confirm');}
  get deleteWorkspacePopupCancelButton() {return $('.pm-modal-confirm .pm-modal-confirm__actions button.pm-modal-confirm__cancel');}

  /**
   * a method to validate whether the page is displayed or not
   * @return {boolean} returns true or false
   */
  isDisplayed() {
    this.workspaceList.waitForExist(30000);
    return this.workspaceList.isExisting();
  }

  /**
   * a method to get the list of workspaces available
   * @return {Array} returns list of available workspaces
   */
  getListedWorkspaces() {
    const final = [];
    this.workspaceList.waitForExist(30000);
    for (const res of this.workspaceNamesList) {
      final.push(res.getText());
    }
    return final;
  }

  /**
   * a method to enter details in the create new workspace page
   * @param {string} name Name of the workspace
   * @param {string} summary Summary of the workspace
   * @param {string} type Type of the workspace
   * @return {void} returns nothing
   */
  enterDetailsInNewWorkspace(name, summary, type) {
    this.newWorkspaceName.setValue(name);
    this.newWorkspaceSummary.setValue(summary);
    if (this.newWorkspaceType.getText() != type) {
      this.newWorkspaceTypeToggle(type).click();
    }
  }

  /**
   * a method to check whether the new workspace create page is displayed
   * @return {boolean} returns true or false
   */
  isCreateNewWorkspaceDisplayed() {
    this.newWorkspaceName.waitForExist(60000);
    return this.newWorkspaceName.isExisting();
  }

  /**
   * a method to enter details in the create new workspace page and click on cancel button
   * @param {string} name Name of the workspace
   * @param {string} summary Summary of the workspace
   * @param {string} type Type of the workspace
   * @return {void} returns nothing
   */
  enterDetailsAndCancelForNewWorkspace(name, summary, type) {
    this.enterDetailsInNewWorkspace(name, summary, type);
    this.newWorkspaceCancelButton.click();
  }

  /**
   * a method to enter details in the create new workspace page and click on add a new workspace button
   * @param {string} name Name of the workspace
   * @param {string} summary Summary of the workspace
   * @param {string} type Type of the workspace
   * @return {void} returns nothing
   */
  enterDetailsAndCreateNewWorkspace(name, summary, type) {
    this.enterDetailsInNewWorkspace(name, summary, type);
    this.newWorkspaceCreateNewWorkspaceButton.click();
  }

  /**
   * a method to get the number at which the workspace is listed
   * @param {string} workspaceName Name of the workspace
   * @return {number} returns the number at which workspace is listed
   */
  getWorkspaceCountInList(workspaceName) {
    const workspacearray = this.getListedWorkspaces();
    return workspacearray.indexOf(workspaceName) + 1;
  }

  /**
   * a method edit the name of the workspace
   * @param {string} workspace Name of the workspace
   * @param {string} name New name of the workspace
   * @return {void} returns nothing
   */
  editNameForWorkspace(workspace, name) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceRename.click();
    assert.equal(this.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Save button is not disabled before editing the values');
    this.newWorkspaceName.clearValue();
    this.newWorkspaceName.setValue(name);
    this.newWorkspaceCreateNewWorkspaceButton.click();
  }

  /**
   * a method edit the description of the workspace
   * @param {string} workspace Name of the workspace
   * @param {string} description New description for the workspace
   * @return {void} returns nothing
   */
  editDescriptionForWorkspace(workspace, description) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceEditDescription.click();
    assert.equal(this.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Save button is not disabled before editing the values');
    this.newWorkspaceSummary.clearValue();
    this.newWorkspaceSummary.setValue(description);
    this.newWorkspaceCreateNewWorkspaceButton.click();
  }

  /**
   * a method get the description of the workspace
   * @param {string} workspace Name of the workspace
   * @return {string} returns the description of the given workspace
   */
  getDescriptionforWorkspace(workspace) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceEditDescription.click();
    const result = this.newWorkspaceSummary.getText();
    this.newWorkspaceCancelButton.click();
    return result;
  }

  /**
   * a method to click on the delete option for a workspace
   * @param {string} workspace Name of the workspace
   * @return {void} returns nothing
   */
  clickDeleteWorkspaceOption(workspace) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceDelete.click();
  }

  /**
   * a method to get the delete popup texts
   * @return {string} returns the delete popup texts
   */
  getDeletePopupTexts() {
    return this.deleteWorkspacePopup.getText();
  }

  /**
   * a method to click on the delete button in the delete popup
   * @return {void} returns nothing
   */
  clickDeleteButtonInPopup() {
    this.deleteWorkspacePopupDeleteButton.click();
  }
}

module.exports = new WorkSpace();
