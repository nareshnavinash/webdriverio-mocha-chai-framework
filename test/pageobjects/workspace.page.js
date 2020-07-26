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
  get workspaceAvailableNames() {return $('.rt-tbody');}
  get workspaceNamesList() {return $$('.workspace-table__title .pm-link[href*="/workspaces"]');}
  get createWorkspaceButton() {return $('button.workspace-list__create');}
  get newWorkspaceName() {return $('input#ws-name');}
  get newWorkspaceSummary() {return $('textarea.pm-form-control');}
  get newWorkspaceType() {return $('.pm-toggle-switch span');}
  // Toggle types are - Personal | Team
  newWorkspaceTypeToggle(text) {return $('.pm-toggle-switch__item=' + text);}
  get newWorkspaceInviteTeamMember() {return $('input.Select-input');}
  get newWorkspaceCreateNewWorkspaceButton() {return $('button.pm-actions__confirm');}
  get newWorkspaceCancelButton() {return $('button.pm-actions__cancel');}

  isDisplayed() {
    this.workspaceList.waitForExist(30000);
    return this.workspaceList.isExisting();
  }

  getListedWorkspaces() {
    var final = []
    for (const res of this.workspaceNamesList) {
      final.push(res.getText())
    }
    return final
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
}

module.exports = new WorkSpace();
