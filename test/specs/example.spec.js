const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

describe('My Login application', () => {
  it('should login with valid credentials', () => {
    LoginPage.open();
    console.log('waiting ....')
    browser.pause(10000)
    console.log('after 10 seconds waiting ....')
    LoginPage.login('tomsmith', 'SuperSecretPassword!');
    expect(SecurePage.flashAlert).toBeExisting();
    expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
  });
});


