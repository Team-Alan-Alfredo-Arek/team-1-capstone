const { db } = require("./db");
const PORT = process.env.PORT || 3000;
const app = require("./app");
const seed = require("../script/seed");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.setupRoutes(io);

module.exports.io = io;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("user-login", async (credentials) => {
    try {
      const token = await User.authenticate(credentials);
      socket.emit("login-response", { token });
    } catch (error) {
      socket.emit("login-error", error.message);
    }
  });

  socket.on("user-signup", async (credentials) => {
    try {
      const user = await User.create(credentials);
      const token = await user.generateToken();
      socket.emit("signup-response", { token });
    } catch (error) {
      socket.emit("signup-error", error.message);
    }
  });

  socket.on("send-message", (message) => {
    socket.broadcast.emit("new-message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      await db.sync();
    }
    // start listening (and create a 'server' object representing our server)
    server.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
