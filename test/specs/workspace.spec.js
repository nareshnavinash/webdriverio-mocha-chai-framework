const LoginPage = require('../pageobjects/login.page');
const WorkSpace = require('../pageobjects/workspace.page');
const TestData = require('../testdata/workspace.data.json');
const Collections = require('../pageobjects/collecgtions.page');
const Toast = require('../pageobjects/toast.page')
const { assert } = require('chai');


describe('Workspace Tests', () => {
  let availableWorkspaces = null;
  const workspaceName = TestData.createData.name + Date.now().toString();

  before(() => {
    browser.navigateTo(config.url);
    assert.equal(LoginPage.isDisplayed(), true, 'Login page is not displayed');
    LoginPage.login(config.username, utilities.readSecrets(config.password));
    assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
  });

  describe('Enter Details in workspace form and cancel -> regression', () => {
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
      availableWorkspaces = null
    });
  });

  describe('Create a new Personal Workspace -> regression, sanity', () => {
    it('Get the list of workspaces available in the UI', () => {
      availableWorkspaces = WorkSpace.getListedWorkspaces();
    });
    it('Click on the create new workspace button', () => {
      WorkSpace.createWorkspaceButton.click();
      assert.equal(WorkSpace.isCreateNewWorkspaceDisplayed(), true, 'Create workspace page is not listed');
    });
    it('Enter the details in the create workspace page and give add new workspace button', () => {
      WorkSpace.enterDetailsAndCreateNewWorkspace(workspaceName, TestData.createData.summary, TestData.createData.type);
    });
    it('Toast message stating the new workspace creation should be visible', () => {
      assert.equal(Toast.getToastTitle(), TestData.messages.personal_workspace_create_message, "Toast message title is not as expected");
      assert.include(Toast.getToastBody(), workspaceName, "Toast message body is not as expected");
    });
  });

  describe('Read the list of your personal workspaces -> regression, sanity', () => {
    it('After adding a new workspace Collections page for that workspace should be listed', () => {
      assert.equal(Collections.isDisplayed(), true, "Collections page is not displayed");
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
});
