const LoginPage = require('../pageobjects/login.page');
const WorkSpace = require('../pageobjects/workspace.page');

describe('Workspace Tests', () => {
  before(() => {
    browser.navigateTo(config.url);
    assert.equal(LoginPage.isDisplayed(), true, 'Login page is not displayed');
    LoginPage.login(config.username, utilities.readSecrets(config.password));
    assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
  });

  it('should login with valid credentials', () => {
    console.log('inside the tests');
    assert.equal(WorkSpace.isDisplayed(), true, 'Workspace page is not displayed');
  });
});
