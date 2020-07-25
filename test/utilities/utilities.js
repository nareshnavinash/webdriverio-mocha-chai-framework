const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
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
    return './secret_keys/public.key';
  }

  static getPrivateKeyPath() {
    const path = './secret_keys/private.key';
    if (fs.existsSync(path)) {
      return path;
    } else {
      fs.writeFileSync(path, process.env.privatekey);
      return path;
    }
  }

  static generatePublicAndPrivateKeys() {
    const examplekey = new NodeRSA({ 'Naresh': 'Postman_tests' });
    fs.writeFileSync(Utilities.getPrivateKeyPath(), examplekey.exportKey('pkcs8-private'));
    fs.writeFileSync(Utilities.getPublicKeyPath(), examplekey.exportKey('pkcs8-public'));
  }

  static createSecrets(value) {
    const configToStore = value;
    const publickey = new NodeRSA();
    const jsonConfig = { 'value': configToStore };
    publickey.importKey(fs.readFileSync(Utilities.getPublicKeyPath(), 'utf8'));
    const key = (publickey.encrypt(jsonConfig, 'base64'), 'utf8');
    return key;
  }

  static readSecrets(secret) {
    if (secret.includes('utf8')) {
      const privatekey = new NodeRSA();
      privatekey.importKey(fs.readFileSync(Utilities.getPrivateKeyPath(), 'utf8'));
      const config = privatekey.decrypt(secret, 'json');
      return config.value;
    } else {
      return secret;
    }
  }

  static removeDirectory(directory) {
    try {
      fs.readdir(directory, (err, files) => {
        if (err) throw err;
        console.log('Removing files from: ' + directory);
        for (const file of files) {
          if (file != '.keep') {
            fs.unlink(path.join(directory, file), (err) => {
              if (err) {
                console.log('Cannot clear the files from the directory using rimraf');
                rimraf(directory + '/*', function() {console.log('done');});
              }
            });
          }
        }
      });
    }
    catch (e) {
      console.log('Cannot clear the files from the directory using rimraf');
      rimraf(directory + '/*', function() {console.log('done');});
    }
  }
}

module.exports = Utilities;
