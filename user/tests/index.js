const request = require('supertest');
require('dotenv').config()
const app = request(process.env.BASE_URL);

const authValidationTest = require('./authValidationTest');

// TEST AUTH VALIDATION 
authValidationTest(app);
