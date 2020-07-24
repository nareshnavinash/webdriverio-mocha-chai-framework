const fs = require('fs');
const NodeRSA = require('node-rsa');

const decrypttext = process.argv[2]
let privatekey = new NodeRSA();
privatekey.importKey(fs.readFileSync('./secret_keys/private.key', 'utf8'));
const config = privatekey.decrypt(decrypttext, 'json');
console.log('decrypted: ', config.value);
