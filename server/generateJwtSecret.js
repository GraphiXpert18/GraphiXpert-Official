// Quick script to generate a secure JWT secret
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('\n=================================');
console.log('Generated JWT Secret:');
console.log('=================================');
console.log(jwtSecret);
console.log('=================================\n');
console.log('Copy this value and use it as your JWT_SECRET environment variable');
console.log('Keep this secret secure and never commit it to version control!\n');
