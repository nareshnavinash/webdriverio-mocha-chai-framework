const LoginPage = require('../pageobjects/login.page');
const WorkSpace = require('../pageobjects/workspace.page');
const TestData = require('../testdata/workspace.data.json');
const Collections = require('../pageobjects/collections.page');
const Toast = require('../pageobjects/toast.page');
const { assert } = require('chai');


describe('Workspace Tests', () => {
  let availableWorkspaces = null;
  const workspaceName = TestData.createData.name + Date.now().toString();
  let editedWorkspaceName = null;

  before(() => {
    browser.navigateTo(config.url);
    assert.equal(LoginPage.isDisplayed(), true, 'Login page is not displayed');
    LoginPage.login(config.username, utilities.readSecrets(config.password));
    assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
  });

  describe('Auto_PW_WS_003 -> Enter Details in workspace form and cancel -> regression', () => {
    it('Get the list of workspaces available in the UI', () => {
      availableWorkspaces = WorkSpace.getListedWorkspaces();
    });
    it('Click on the create new workspace button', () => {
      WorkSpace.createWorkspaceButton.click();
      assert.equal(WorkSpace.isCreateNewWorkspaceDisplayed(), true, 'Create workspace page is not listed');
    });
    it('Enter the details in the create workspace page and give cancel', () => {
      WorkSpace.enterDetailsAndCancelForNewWorkspace(TestData.cancelData.name, TestData.cancelData.summary, TestData.cancelData.type);
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed after clicking cancel button in create new workspace page');
    });
    it('After cancelling newly added workspace name should not be listed', () => {
      assert.deepEqual(WorkSpace.getListedWorkspaces(), availableWorkspaces, 'Workspaces expeceted is not equal after cancelling new workspace creation');
    });
  });

  describe('Auto_PW_WS_001 -> Create a new Personal Workspace with name and description -> regression, sanity', () => {
    it('Get the list of workspaces available in the UI', () => {
      availableWorkspaces = WorkSpace.getListedWorkspaces();
    });
    it('Click on the create new workspace button', () => {
      WorkSpace.createWorkspaceButton.click();
      assert.equal(WorkSpace.isCreateNewWorkspaceDisplayed(), true, 'Create workspace page is not listed');
    });
    it('Create workspace button should be disabled before giving any input', () => {
      assert.equal(WorkSpace.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Create Workspace button is enabled even before entering the new workspace details');
    });
    it('Enter the details in the create workspace page and give add new workspace button', () => {
      WorkSpace.enterDetailsAndCreateNewWorkspace(workspaceName, TestData.createData.summary, TestData.createData.type);
    });
    it('Toast message stating the new workspace creation should be visible', () => {
      assert.equal(Toast.getToastTitle(), TestData.messages.personalWorkspaceCreateMessage, 'Toast message title is not as expected');
      assert.include(Toast.getToastBody(), workspaceName, 'Toast message body is not as expected');
      Toast.dismissToastIfDisplayed();
    });
  });

  describe('Auto_PW_WS_002 -> Read the list of your personal workspaces -> regression, sanity', () => {
    it('After adding a new workspace Collections page for that workspace should be listed', () => {
      assert.equal(Collections.isDisplayed(), true, 'Collections page is not displayed');
      assert.equal(Collections.getNameFromToggler(), workspaceName, 'Collection for Newly added workspace is not opened');
    });
    it('Move back from collections page to all workspace page', () => {
      Collections.moveToWorkspace();
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
    it('The newly added workspace name should be listed in all workspace page', () => {
      const currentWorkspacelist = WorkSpace.getListedWorkspaces();
      assert.notDeepEqual(availableWorkspaces, currentWorkspacelist, 'Expected some changes in the workspace list but that is not happened');
      assert.include(currentWorkspacelist, workspaceName, 'Newly added workspace is not listed');
    });
  });

  describe('Auto_PW_WS_004 -> Update your newly created workspace -> regression, sanity', () => {
    editedWorkspaceName = null;
    it('Rename the workspace which is created', () => {
      editedWorkspaceName = workspaceName + ' Edited';
      WorkSpace.editNameForWorkspace(workspaceName, editedWorkspaceName);
    });
    it('Toast message stating the Edit of workspace name should be displayed', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed Editing a workspace');
      assert.equal(Toast.getToastTitle(), TestData.messages.workspaceEditMessage, 'Toast message title is not as expected');
      assert.include(Toast.getToastBody(), workspaceName, 'Toast message body is not as expected');
      Toast.dismissToastIfDisplayed();
    });
    it('Renaming a workspace should be listed in the all workspace list', () => {
      assert.include(WorkSpace.getListedWorkspaces(), editedWorkspaceName, 'Newly added workspace is not listed');
    });
    it('Old workspace name should not listed in the all workspace list', () => {
      assert.notInclude(WorkSpace.getListedWorkspaces(), workspaceName, 'Edited workspace name is getting listed in all workspace page');
    });
    it('Edit the description for the workspace which is edited', () => {
      WorkSpace.editDescriptionForWorkspace(editedWorkspaceName, TestData.createData.editSummary);
    });
    it('Toast message stating the Edit of workspace should be displayed', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed Editing a workspace');
      assert.equal(Toast.getToastTitle(), TestData.messages.workspaceEditMessage, 'Toast message title is not as expected');
      assert.include(Toast.getToastBody(), editedWorkspaceName, 'Toast message body is not as expected');
      Toast.dismissToastIfDisplayed();
    });
    it('Validate whether the edited description is applied', () => {
      assert.equal(WorkSpace.getDescriptionforWorkspace(editedWorkspaceName), TestData.createData.editSummary, 'Edited summary is not reflected in the UI');
    });
  });

  describe('Auto_PW_WS_005 -> Delete the workspace you created -> regression, sanity', () => {
    it('Click on the delete option for a workspace', () => {
      WorkSpace.clickDeleteWorkspaceOption(editedWorkspaceName);
    });
    it('Validate the texts in delete popup', () => {
      const popupText = WorkSpace.getDeletePopupTexts();
      assert.include(popupText, editedWorkspaceName, 'Delete Popup text does not have the workspace name');
      assert.include(popupText, TestData.messages.deleteHeader, 'Delete Popup text does not have the Delete workspace header');
      assert.include(popupText, TestData.messages.deleteMessage, 'Delete Popup text does not have the Delete workspace message');
    });
    it('Click on the delete button in the delete popup', () => {
      WorkSpace.clickDeleteButtonInPopup();
    });
    it('Toast Messages should be as expected', () => {
      assert.equal(Toast.isDisplayed(), true, 'Toast is not displayed for the delete action');
      assert.equal(Toast.getToastTitle(), TestData.messages.toastDeleteMessage, 'Toast message title is not as expected');
      assert.include(Toast.getToastBody(), editedWorkspaceName, 'Toast message body is not as expected');
      Toast.dismissToastIfDisplayed();
    });
    it('Validate the workspace list and ensure that the deleted workspace is removed', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed deleting a workspace');
      WorkSpace.waitUntillWorkspaceNameIsRemoved(editedWorkspaceName);
      assert.notInclude(WorkSpace.getListedWorkspaces(), editedWorkspaceName, 'Deleted workspace name is listed in the all workspace page');
    });
  });

  describe('Auto_PW_WS_006 -> Create a new Personal Workspace with name alone -> regression', () => {
    it('Navigate to all workspace page', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
    it('Get the list of workspaces available in the UI', () => {
      availableWorkspaces = WorkSpace.getListedWorkspaces();
    });
    it('Click on the create new workspace button', () => {
      WorkSpace.createWorkspaceButton.click();
      assert.equal(WorkSpace.isCreateNewWorkspaceDisplayed(), true, 'Create workspace page is not listed');
    });
    it('Create workspace button should be disabled before giving any input', () => {
      assert.equal(WorkSpace.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Create Workspace button is enabled even before entering the new workspace details');
    });
    it('Enter the name alone and give add new workspace button', () => {
      WorkSpace.enterDetailsAndCreateNewWorkspace(workspaceName, TestData.createData.noSummary, TestData.createData.type);
    });
    it('Toast message stating the new workspace creation should be visible', () => {
      assert.equal(Toast.getToastTitle(), TestData.messages.personalWorkspaceCreateMessage, 'Toast message title is not as expected');
      assert.include(Toast.getToastBody(), workspaceName, 'Toast message body is not as expected');
      Toast.dismissToastIfDisplayed();
    });
    it('After adding a new workspace Collections page for that workspace should be listed', () => {
      assert.equal(Collections.isDisplayed(), true, 'Collections page is not displayed');
      assert.equal(Collections.getNameFromToggler(), workspaceName, 'Collection for Newly added workspace is not opened');
    });
    it('Move back from collections page to all workspace page', () => {
      Collections.moveToWorkspace();
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
    it('The newly added workspace name should be listed in all workspace page', () => {
      const currentWorkspacelist = WorkSpace.getListedWorkspaces();
      assert.notDeepEqual(availableWorkspaces, currentWorkspacelist, 'Expected some changes in the workspace list but that is not happened');
      assert.include(currentWorkspacelist, workspaceName, 'Newly added workspace is not listed');
    });
  });

  describe('Auto_PW_WS_007 Adding description for a workspace for the first time through editing the description and validate cancel functionality for edit and delete workspace-> regression', () => {
    it('Edit the description for the workspace for the first time', () => {
      WorkSpace.editDescriptionForWorkspace(workspaceName, TestData.createData.editSummary);
    });
    it('Toast message stating the Edit of workspace should be displayed', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed Editing a workspace');
      assert.equal(Toast.getToastTitle(), TestData.messages.workspaceEditMessage, 'Toast message title is not as expected');
      assert.include(Toast.getToastBody(), workspaceName, 'Toast message body is not as expected');
      Toast.dismissToastIfDisplayed();
    });
    it('Validate whether the edited description is applied', () => {
      assert.equal(WorkSpace.getDescriptionforWorkspace(workspaceName), TestData.createData.editSummary, 'Edited summary is not reflected in the UI');
    });
    it('Edit the description for the workspace and make the description as empty', () => {
      WorkSpace.makeDescriptionAsEmptyForWorkspace(workspaceName);
    });
    it('After removing the description the save button should be disabled and cancel the change', () => {
      assert.equal(WorkSpace.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Create new workspace button is not disabled when the name is not entered');
      WorkSpace.newWorkspaceCancelButton.click();
    });
    it('After cancelling the changes the edited value should not be saved', () => {
      assert.equal(WorkSpace.getDescriptionforWorkspace(workspaceName), TestData.createData.editSummary, 'Edited summary is not reflected in the UI');
    });
    it('Click on the delete option for a workspace', () => {
      WorkSpace.clickDeleteWorkspaceOption(workspaceName);
    });
    it('Validate the texts in delete popup', () => {
      const popupText = WorkSpace.getDeletePopupTexts();
      assert.include(popupText, workspaceName, 'Delete Popup text does not have the workspace name');
      assert.include(popupText, TestData.messages.deleteHeader, 'Delete Popup text does not have the Delete workspace header');
      assert.include(popupText, TestData.messages.deleteMessage, 'Delete Popup text does not have the Delete workspace message');
    });
    it('Click on the cancel button in the delete popup', () => {
      WorkSpace.deleteWorkspacePopupCancelButton.click();
    });
    it('Validate the workspace list and ensure that the workspace is retained', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed deleting a workspace');
      assert.include(WorkSpace.getListedWorkspaces(), workspaceName, 'Deleted workspace name is listed in the all workspace page');
    });
  });

  describe('Auto_PW_WS_008 -> Try to create a workspace only with description -> regression', () => {
    it('Navigate to all workspace page', () => {
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
    it('Get the list of workspaces available in the UI', () => {
      availableWorkspaces = WorkSpace.getListedWorkspaces();
    });
    it('Click on the create new workspace button', () => {
      WorkSpace.createWorkspaceButton.click();
      assert.equal(WorkSpace.isCreateNewWorkspaceDisplayed(), true, 'Create workspace page is not listed');
    });
    it('Create workspace button should be disabled before giving any input', () => {
      assert.equal(WorkSpace.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Create Workspace button is enabled even before entering the new workspace details');
    });
    it('Enter the details in the create workspace page and give add new workspace button', () => {
      WorkSpace.enterDetailsInNewWorkspace('', TestData.createData.summary, TestData.createData.type);
    });
    it('Validate the Create new workspace button, it should be in disabled state', () => {
      assert.equal(WorkSpace.newWorkspaceCreateNewWorkspaceButton.isEnabled(), false, 'Create new workspace button is not disabled when the name is not entered');
      WorkSpace.newWorkspaceCancelButton.click();
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
  });

  describe('Auto_PW_WS_009 -> Validate whether the user is not allowed to save when we remove the workspace name through edit -> regression', function() {
    this.retries(4);
    it('Clear the name from the workspace after editing', function() {
      browser.navigateTo(config.url);
      WorkSpace.clearNameForWorkspace(workspaceName);
    });
    it('Validate the error message is displayed', function() {
      assert.equal(WorkSpace.workspaceNameisRequiredError.waitForDisplayed(10000), true, 'workspace name cannot be empty message is not displayed when the name is removed from the workspace');
      WorkSpace.newWorkspaceCancelButton.click();
    });
  });

  describe('Auto_PW_WS_010 -> Validate the sorting in All workspace page and validate the duplicate names for workspaces -> regression', () => {
    let firstDisplayedNames;
    let sortedFirstDisplayedNames;
    it('Get the list of workspaces from the all workspace page', () => {
      firstDisplayedNames = WorkSpace.getListedWorkspaces();
      sortedFirstDisplayedNames = firstDisplayedNames.sort();
    });
    it('Validate whether the list of names are sorted alphabetically', () => {
      assert.deepEqual(sortedFirstDisplayedNames, firstDisplayedNames, 'Workspace is not sorted in alphabetical order');
    });
    it('Rename the workspace with a word starts with z', () => {
      WorkSpace.editNameForWorkspace(workspaceName, TestData.createData.nameStartsWithZ);
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed Editing a workspace');
      Toast.dismissToastIfDisplayed();
    });
    it('Get the list of workspaces from the all workspace page', () => {
      firstDisplayedNames = WorkSpace.getListedWorkspaces();
      sortedFirstDisplayedNames = firstDisplayedNames.sort();
    });
    it('Validate whether the list of names are sorted alphabetically', () => {
      assert.deepEqual(sortedFirstDisplayedNames, firstDisplayedNames, 'Workspace is not sorted in alphabetical order');
    });
    it('Click on the name header to sort in descending order', () => {
      WorkSpace.workspaceNameHeader.click();
    });
    it('Get the list of available names in the workspace and validate the descending order', () => {
      firstDisplayedNames = WorkSpace.getListedWorkspaces();
      sortedFirstDisplayedNames = firstDisplayedNames.reverse();
    });
    it('Validate whether the list of names are sorted in descending order', () => {
      assert.deepEqual(sortedFirstDisplayedNames, firstDisplayedNames, 'Workspace is not sorted in descending order');
    });
    it('Click on the name header again to sort in ascending order', () => {
      WorkSpace.workspaceNameHeader.click();
    });
    it('Get the list of available names in the workspace and validate the ascending order', () => {
      firstDisplayedNames = WorkSpace.getListedWorkspaces();
      sortedFirstDisplayedNames = firstDisplayedNames.sort();
    });
    it('Validate whether the list of names are sorted in ascending order', () => {
      assert.deepEqual(sortedFirstDisplayedNames, firstDisplayedNames, 'Workspace is not sorted in ascending order');
    });
    it('Now create a workspace with the same name and validate whether the workspace can be created', () => {
      WorkSpace.createWorkspaceButton.click();
      assert.equal(WorkSpace.isCreateNewWorkspaceDisplayed(), true, 'Create workspace page is not listed');
      WorkSpace.enterDetailsAndCreateNewWorkspace(TestData.createData.nameStartsWithZ, TestData.createData.summary, TestData.createData.type);
      assert.equal(Toast.getToastTitle(), TestData.messages.personalWorkspaceCreateMessage, 'Toast message title is not as expected');
      Toast.dismissToastIfDisplayed();
      assert.equal(Collections.isDisplayed(), true, 'Collections page is not displayed');
      Collections.moveToWorkspace();
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
    it('Cleanup the workspaces created for testing', () => {
      WorkSpace.clickDeleteWorkspaceOption(TestData.createData.nameStartsWithZ);
      WorkSpace.clickDeleteButtonInPopup();
      assert.equal(Toast.isDisplayed(), true, 'Toast is not displayed for the delete action');
      Toast.dismissToastIfDisplayed();
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed deleting a workspace');
      WorkSpace.clickDeleteWorkspaceOption(TestData.createData.nameStartsWithZ);
      WorkSpace.clickDeleteButtonInPopup();
      assert.equal(Toast.isDisplayed(), true, 'Toast is not displayed for the delete action');
      Toast.dismissToastIfDisplayed();
    });
  });

  describe('Auto_PW_WS_011 Validate whether delete is diabled for default workspace (My Workspace) -> regression', () => {
    it('Click delete for the default workspace', () => {
      WorkSpace.clickDeleteWorkspaceOption(TestData.messages.defaultWorkspaceName);
    });
    it('Validate the texts in delete popup', () => {
      const popupText = WorkSpace.getDeletePopupTexts();
      assert.include(popupText, TestData.messages.defaultWorkspaceName, 'Delete Popup text does not have the workspace name');
      assert.include(popupText, TestData.messages.deleteHeader, 'Delete Popup text does not have the Delete workspace header');
      assert.include(popupText, TestData.messages.deleteMessage, 'Delete Popup text does not have the Delete workspace message');
    });
    it('Verify the delete button is diabled', () => {
      assert.equal(WorkSpace.deleteWorkspacePopupDeleteButton.isEnabled(), false, 'Delete button is enabled for the default workspace');
    });
  });
});
