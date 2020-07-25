const fs = require('fs');
const NodeRSA = require('node-rsa');

const configToStore = process.argv[2] || '';
const publickey = new NodeRSA();
const jsonConfig = { 'value': configToStore };
publickey.importKey(fs.readFileSync('./secret_keys/public.key', 'utf8'));
console.log('key for ' + configToStore + ' is:');
console.log(publickey.encrypt(jsonConfig, 'base64'), 'utf8');
