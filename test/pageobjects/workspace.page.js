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

  isDisplayed() {
    this.workspaceList.waitForExist(30000);
    return this.workspaceList.isExisting();
  }

  getListedWorkspaces() {
    const final = [];
    this.workspaceList.waitForExist(30000);
    for (const res of this.workspaceNamesList) {
      final.push(res.getText());
    }
    return final;
  }

  enterDetailsInNewWorkspace(name, summary, type) {
    this.newWorkspaceName.setValue(name);
    this.newWorkspaceSummary.setValue(summary);
    if (this.newWorkspaceType.getText() != type) {
      this.newWorkspaceTypeToggle(type).click();
    }
  }

  isCreateNewWorkspaceDisplayed() {
    this.newWorkspaceName.waitForExist(60000);
    return this.newWorkspaceName.isExisting();
  }

  enterDetailsAndCancelForNewWorkspace(name, summary, type) {
    this.enterDetailsInNewWorkspace(name, summary, type);
    this.newWorkspaceCancelButton.click();
  }

  enterDetailsAndCreateNewWorkspace(name, summary, type) {
    this.enterDetailsInNewWorkspace(name, summary, type);
    this.newWorkspaceCreateNewWorkspaceButton.click();
  }

  getWorkspaceCountInList(workspaceName) {
    const workspacearray = this.getListedWorkspaces();
    return workspacearray.indexOf(workspaceName) + 1;
  }

  editNameForWorkspace(workspace, name) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceRename.click();
    assert.equal(this.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Save button is not disabled before editing the values');
    this.newWorkspaceName.setValue(name);
    this.newWorkspaceCreateNewWorkspaceButton.click();
  }

  editDescriptionForWorkspace(workspace, description) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceEditDescription.click();
    assert.equal(this.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Save button is not disabled before editing the values');
    this.newWorkspaceSummary.setValue(description);
    this.newWorkspaceCreateNewWorkspaceButton.click();
  }

  getDescriptionforWorkspace(workspace) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceEditDescription.click();
    const result = this.newWorkspaceSummary.getText();
    this.newWorkspaceCancelButton.click();
    return result;
  }

  clickDeleteWorkspaceOption(workspace) {
    const count = this.getWorkspaceCountInList(workspace);
    this.workspaceMoreOptionsButton(count).click();
    this.workspaceDelete.click();
  }

  getDeletePopupTexts() {
    return this.deleteWorkspacePopup.getText();
  }

  clickDeleteButtonInPopup() {
    this.deleteWorkspacePopupDeleteButton.click();
  }
}

module.exports = new WorkSpace();
