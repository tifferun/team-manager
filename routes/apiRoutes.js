var db = require("../models");
var passport = require("../config/passport");
const moment = require("moment");

module.exports = function(app) {
  // =====json dat of all user===============
  // =======================================
  app.get("/api/user", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });
  //
  // GET route for getting the events
  app.get("/api/eventList", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Event.findAll({}).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the user page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/home");
  });

  app.post("/api/user", function(req, res) {
    // console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });
  // get for api/post route
  app.get("/api/post", function(req, res) {
    db.Post.findAll({ include: [db.User] }).then(function(dbPosts) {
      res.json(dbPosts);
    });
  });
  // create post api route
  app.post("/api/post", function(req, res) {
    // console.log(req.user);
    const data = { ...req.body };
    data.UserId = req.user.id;
    db.Post.create(data).then(dbPost => {
      res.json(dbPost);
    });
  });
  // get route for api/comment
  app.get("/api/comment", function(req, res) {
    db.Comment.findAll({ include: [db.User, db.Post] }).then(function(
      dbComment
    ) {
      res.json(dbComment);
    });
  });
    // DELETE route for deleting posts
    app.delete("/api/forum/:id", function(req, res) {
      db.Post.destroy({
        where: {
          id: req.params.id
        }
      }).then(function(dbPost) {
        res.json(dbPost);
      });
    });
  // create post route for comments
  // create post api route
  app.post("/api/comment", function(req, res) {
    const data = { ...req.body };
    data.UserId = req.user.id;
    console.log(data);
    db.Comment.create(data).then(dbComment => {
      res.json(dbComment);
    });
  });


  app.get("/api/forum/:id", function (req, res) {

    db.Post.findOne({ 
      where: { id: req.params.id },
      include: [{model: db.Comment, order:['createdAt', 'asc'], include: [db.User]}, db.User]
    }).then(function (dbPosts) {

      res.json(dbPosts);
    });
  });

  // GET route for getting all of the events
  app.get("/api/events", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.event.findAll({}).then(function(dbevent) {
      // We have access to the events as an argument inside of the callback function
      // const data = [];
      // console.log(dbevent)
      // dbevent.forEach(function(e) {
      //   e.dataValues.start = moment()
      //     .utc(e.dataValues.start)
      //     .format("mm/DD/YYYY HH:mm:ss");
      //   data.push(e.dataValues);
      // });
      res.json(dbevent);
    });
  });

  // POST route for saving an event
  app.post("/api/events", function(req, res) {
    console.log(req.body);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.event
      .create({
        title: req.body.title,
        start: req.body.start,
        location: req.body.location
      })
      .then(function(dbevent) {
        // We have access to the new event as an argument inside of the callback function
        res.json(dbevent);
      });
  });

  // DELETE route for deleting events. We can get the id of the event to be deleted from
  // req.params.id
  app.delete("/api/events/:id", function(req, res) {
    // We just have to specify which event we want to destroy with "where"
    db.event
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbevent) {
        res.json(dbevent);
      });
  });
};
