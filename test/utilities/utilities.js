const fs = require('fs');
const NodeRSA = require('node-rsa');

class Utilities {
  static getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  static takeScreenshot(name, failure=false) {
    if (!name) name = moment().format('YYYY-MM-DDTH:mm:ss');
    const path = './reports/screenshot/';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    if (failure) {
      name = name + '_fail';
    }
    name = name.replace(/ /g, '_') + '.png';
    browser.saveScreenshot( path + name);
    const data = fs.readFileSync(`${path}/${name}`);
    allure.addAttachment(name, data, 'image/png');
  }

  static getPublicKeyPath() {
    return './secret_keys/public.key'
  }

  static getPrivateKeyPath() {
    var path = './secret_keys/private.key'
    if (fs.existsSync(path)) {
      return path
    } else {
      fs.writeFileSync(path, process.env.privatekey);
    }
  }

  static generatePublicAndPrivateKeys() {
    const examplekey = new NodeRSA({'Naresh': 'Postman_tests'});
    fs.writeFileSync(Utilities.getPrivateKeyPath(), examplekey.exportKey('pkcs8-private'));
    fs.writeFileSync(Utilities.getPublicKeyPath(), examplekey.exportKey('pkcs8-public'));
  }

  static createSecrets(value) {
    const configToStore = value
    let publickey = new NodeRSA();
    let jsonConfig = {'value': configToStore}
    publickey.importKey(fs.readFileSync(Utilities.getPublicKeyPath(), 'utf8'));
    let key = (publickey.encrypt(jsonConfig, 'base64'))
    return key
  }

  static readSecrets(secret) {
    const decrypttext = secret
    let privatekey = new NodeRSA();
    privatekey.importKey(fs.readFileSync(Utilities.getPrivateKeyPath(), 'utf8'));
    const config = privatekey.decrypt(decrypttext, 'json');
    return config.value
  }

}

module.exports = Utilities;
