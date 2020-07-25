const fs = require('fs');
const NodeRSA = require('node-rsa');

const key = process.argv[2];
const examplekey = new NodeRSA(key);
fs.writeFileSync('./secret_keys/private.key', examplekey.exportKey('pkcs8-private'));
fs.writeFileSync('./secret_keys/public.key', examplekey.exportKey('pkcs8-public'));
