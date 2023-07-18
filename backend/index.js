const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require('crypto');

const { createProduct } = require("./controller/Product");
const productsRouter = require("./routes/Products");
const categoriesRouter = require("./routes/Category");
const brandsRouter = require("./routes/Brands");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const { User } = require("./model/User");
const { isAuth, sanitizeUser } = require("./services/common");

//middlewares ( jitne bhi route me h unko as a middleware use kiya)

server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", isAuth, productsRouter.router); //we can also use JWT token for client-only auth
server.use("/categories", categoriesRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

//Passport Strategies
passport.use(
  new LocalStrategy(async function (username, password, done) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Invalid credentials" }); // for safety
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          //This is just temporary, we will use strong password auth
          // console.log({user})
          if (!crypto.timingSafeEqual(user.password,hashedPassword)) {
              return done(null, false, { message: "Invalid credentials" });
            } 
            done(null, sanitizeUser(user)); // this lines sends to serializer

        }
      );
    } catch (err) {
      done(err);
    }
  })
);

//this creates session variable req.user on being called
passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});
// this creates session variable req.user when called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log("de-serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/E-commerce");
  console.log("database connected");
}

// server.get("/", (req, res) => {
//   res.json({ status: "success" });
// });

server.listen(8080, () => {
  console.log("server started");
});
