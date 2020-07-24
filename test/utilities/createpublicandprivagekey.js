const fs = require('fs');
const NodeRSA = require('node-rsa');

const examplekey = new NodeRSA({'Naresh': 'Postman_tests'});
fs.writeFileSync('./secret_keys/private.key', examplekey.exportKey('pkcs8-private'));
fs.writeFileSync('./secret_keys/public.key', examplekey.exportKey('pkcs8-public'));
