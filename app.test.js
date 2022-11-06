const request = require("supertest");

//const express = require('express')

const app = require("./app");

const blog = require("./Routes/blogRoute");


describe('GET /blog', function() {
  it("GET /books works", async () => {
    const response = await request(blog).get("/blog")
    expect(response.headers["content-type"]).toBe("application/json")
    expect(response.status).toBe(200)
    expect(response.body.length).toBe(5)
})
});


// describe("Blog API", () => {
//   it("GET /blog --> array", () => {
//     return request(app)
//       .get("/blog")
//       .expect("Content-Type", /json/)
//       .then((response) => {
//         expect(response.body).toEqual(
//           expect.arrayContaining([
//             expect.objectContaining({
//               name: expect.any(String),
//               author: expect.any(String),
//               title: expect.any(String),
//             }),
//           ])
//         );
//       });
//   });
//   it("POST /blog --> arry", () => {
//     return request(app).get("/blog").expect("Content-Type", /json/);
//   });
// });

// request(app)
//       .get("/blog")
//       .expect("Content-Type", /json/)
//       });

// describe('GET /user', function() {
//   it('responds with json', function(done) {
//     request(app)
//       .get('/blog')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   });
// });


