const LoginPage = require('../pageobjects/login.page');
const WorkSpace = require('../pageobjects/workspace.page');
const TestData = require('../testdata/workspace.data.json');
const Collections = require('../pageobjects/collecgtions.page');
const { assert } = require('chai');


describe('Workspace Tests', () => {
  before(() => {
    browser.navigateTo(config.url);
    assert.equal(LoginPage.isDisplayed(), true, 'Login page is not displayed');
    LoginPage.login(config.username, utilities.readSecrets(config.password));
    assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
  });

  describe('Enter Details in workspace form and cancel -> regression', () => {
    let availableWorkspaces = null;
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
      assert.equal(WorkSpace.getListedWorkspaces(), availableWorkspaces, 'Workspaces expeceted is not equal after cancelling new workspace creation');
    });
  });

  describe('Enter Details in workspace form and create a workspace -> regression, sanity', () => {
    let availableWorkspaces = null;
    const workspaceName = TestData.createData.name + Date.now().toString();
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
    it('After adding Collections page for that workspace should be listed', () => {
      console.log(Collections.getNameFromToggler());
      assert.include(Collections.getNameFromToggler(), workspaceName, 'Collection for Newly added workspace is not opened');
    });
    it('Move back from collections page to all workspace page', () => {
      Collections.moveToWorkspace();
      assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
    });
    it('After cancelling newly added workspace name should be listed', () => {
      const currentWorkspacelist = WorkSpace.getListedWorkspaces();
      assert.notEqual(availableWorkspaces, currentWorkspacelist, 'Expected some changes in the workspace list but that is not happened');
      assert.include(currentWorkspacelist, workspaceName, 'Newly added workspace is not listed');
    });
  });
});
