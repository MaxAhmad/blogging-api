const request = require("supertest");

//const express = require('express')

const app = require("./app");

const blog = require("./Routes/blogRoute");

//const User = require("./Routes/userRoute");

const User = require("./Models/userModel");

//const dbConnection = require("./server");

// beforeAll(async () => {
//   await dbConnection();
//   return;
// });

it("returns 200 if sign in is valid", (done) => {
  request(app)
    .post("/api/v1/user")
    .send({
      username: "user",
      first_name: "max",
      last_name: "colins",
      confirmPassword: "userpassword",
      password: "userpassword",
      email: "user@email.com",
    })
    .then((response) => {
      expect(response.status).toBe(200);
      done();
    });
});

it("returns success message if signIn is valid", (done) => {
  request(app)
    .post("/api/v1/user")
    .send({
      username: "user",
      first_name: "max",
      last_name: "colins",
      confirmPassword: "userpassword",
      password: "userpassword",
      email: "user@email.com",
    })
    .then((response) => {
      expect(response.body.message).toBe("user created");
      done();
    });
});

it("responds with json", async function () {
  const response = await request(app)
    .get("/api/v1/user/:id")
    .set("Accept", "application/json");
  expect(response.headers["Content-Type"]).toMatch(/json/);
  expect(response.status).toEqual(200);
  expect(response.body.email).toEqual("example@mail.com");
});

// it("Saves user to database", (done) => {
//   request(app)
//     .post("/api/v1/user")
//     .send({
//       username: "user",
//       first_name: "max",
//       last_name: "colins",
//       confirmPassword: "userpassword",
//       password: "userpassword",
//       email: "user@email.com",
//     })
//     .then(() => {
//       User.find().then((userList) => {
//         const savedUser = userList[0];
//         expect(savedUser.username).toBe("user");
//         expect(savedUser.email).toBe("user@email.com");
//         done();
//       });
//     });
// });
