const request = require("supertest");

const express = require('express')

const app = require()

const blog = require("./Routes/blogRoute");

describe("Blog API", () => {
  it("GET /blog --> array", () => {
    return request(blog)
      .get("/blog")
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: expect.any(String),
              author: expect.any(String),
              title: expect.any(String),
            }),
          ])
        );
      });
  });
});
