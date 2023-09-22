const router = require("express").Router();
const {
  models: { User },
} = require("../db");

module.exports = () => {
  router.post("/login", async (req, res, next) => {
    try {
      res.send({ token: await User.authenticate(req.body) });
    } catch (err) {
      next(err);
    }
  });

  router.post("/signup", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      if (!username || !password ||!email) {
        res.status(400).send("Username/password/email are required");
        return;
      }
      console.log("auth router.post signup", req.body)
      const user = await User.create(req.body);
      res.send({ token: await user.generateToken() });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        res.status(401).send("User already exists");
      } else {
        next(err);
      }
    }
  });

  router.get("/me", async (req, res, next) => {
    try {
      res.send(await User.findByToken(req.headers.authorization));
    } catch (ex) {
      next(ex);
    }
  });
  return router;
};
