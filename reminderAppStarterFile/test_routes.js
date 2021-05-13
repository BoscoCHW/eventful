const app = require("./index.js");
const request = require("supertest");
const server = request.agent(app);
//const database = require("./database.js").Database

function loginUser() {
    return function (done) {
      server
        .post("/login")
        .send({ email: "123@gmail.com", password: "123" })    // Cindy user, expect to be 302 as the credentials are correct
        .expect(302)
        .expect("Location", "/reminders")
        .end(onResponse);
  
      function onResponse(err, res) {
        if (err) return done(err);
        return done();
      }
    };
}

function testIncorrectCredentials() {
    return function (done) {
      server
        .post("/login")
        .send({ email: "123@gmail.com", password: "wrongpassword" })  // Incorrect credentials
        .expect(302)
        .expect("Location", "/login")
        .end(onResponse);
  
      function onResponse(err, res) {
        if (err) return done(err);
        return done();
      }
    };
}

describe("Test routes without being authenticated", function () {
    it("access / (expect 200)", function (done) {
        server
          .get("/")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });
  
      it("access /register (expect 200)", function (done) {
        server
          .get("/register")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /login (expect 200)", function (done) {
        server
          .get("/login")
          .expect(200)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /routedoesnotexist (expect 404)", function (done) {
        server
          .get("/routedoesnotexist")
          .expect(404)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /reminders (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminders")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /reminder/new (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminder/new")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /reminder/1 (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminder/1")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /reminder/2 (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminder/2")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });
      
      it("access /reminders/20210511 (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminders/date/20210511")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /reminders/20210630 (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminders/date/20210630")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });

      it("access /reminders/20210712 (expect 302 as we are not authenticated)", function (done) {
        server
          .get("/reminders/date/20210712")
          .expect(302)
          .end(function (err, res) {
            if (err) return done(err);
            //console.log(res.text);
            done();
          });
      });
});

describe("Test routes that require authentication while authenticated", function () {
  it("test ability to log a user in", loginUser());
  it("test ability to login using bad credentials (expect 302, rerouted to /login and not routed to /reminders)", testIncorrectCredentials());


  it("access / (expect 200)", function (done) {
    server
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /register (expect 302 as we are authenticated)", function (done) {
    server
      .get("/register")
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /login (expect 302 as we are authenticated)", function (done) {
    server
      .get("/login")
      .expect(302)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /routedoesnotexist (expect 404)", function (done) {
    server
      .get("/routedoesnotexist")
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminders (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminders")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminder/new (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminder/new")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminder/1 (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminder/1")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminder/2 (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminder/2")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminders/20210511 (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminders/date/20210511")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminders/20210630 (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminders/date/20210630")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

  it("access /reminders/20210712 (expect 200 as we are authenticated)", function (done) {
    server
      .get("/reminders/date/20210712")
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        //console.log(res.text);
        done();
      });
  });

});


