const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');
const Utils = require('../utilities/utilities')

describe('My Login application', () => {
  it('should login with valid credentials', () => {
    LoginPage.open();
    console.log(config.url);
    var test = Utils.createSecrets("hello")
    console.log(test)
    var out = Utils.readSecrets(test)
    console.log(out)
    LoginPage.login('tomsmith', 'SuperSecretPassword!');
    expect(SecurePage.flashAlert).toBeExisting();
    expect(SecurePage.flashAlert).toHaveTextContaining('You logged into a secure area!');
  });
});


