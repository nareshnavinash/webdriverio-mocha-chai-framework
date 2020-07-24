const fs = require('fs');
const NodeRSA = require('node-rsa');

const configToStore = process.argv[2] || ''
let publickey = new NodeRSA();
let jsonConfig = {'value': configToStore}
publickey.importKey(fs.readFileSync('./secret_keys/public.key', 'utf8'));
console.log('key for ' + configToStore + ' is:')
console.log(publickey.encrypt(jsonConfig, 'base64'))
