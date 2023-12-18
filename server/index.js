require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { PORT } = require("./constants");
const authRoutes = require("./routes/auth");
const accountsRoutes = require("./routes/accounts");
const express = require("express");
const path = require("path");

async function bootstrap() {
  await mongo.connect();

  app.use(
    "/uploads/images",
    express.static(path.join(__dirname, "./uploads/images"))
  );

  app.get("/", (req, res) => res.status(200).json({ message: "Hello World!" }));
  app.get("/healthz", (req, res) => res.status(200).send());
  app.use("/auth", authRoutes);
  app.use("/", accountsRoutes);

  app.listen(PORT, () => {
    console.log(`✅ Server is listening on port: ${PORT}`);
  });
}

bootstrap();
