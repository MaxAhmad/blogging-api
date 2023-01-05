const request = require("supertest");

const app = require("./app");

const User = require("./Models/userModel");

// const DBconnection = new DBManager();

// afterAll(() => DBconnection.stop());
// beforeAll(() => DBconnection.start());
// afterEach(() => DBconnection.cleanup());