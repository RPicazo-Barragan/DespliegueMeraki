const express = require("express");

const app = express();

const clientsRouter = require("./routes/clients");
const authRouter = require("./routes/authClient");
const offersRouter = require("./routes/offers");
const photographerRouter = require("./routes/photographer");
const authPhotographerRouter = require("./routes/authPhotographers");

app.use(express.json());

app.use("/clients", clientsRouter);
app.use("/authClients", authRouter);
app.use("/offers", offersRouter);
app.use("/photographers", photographerRouter);
app.use("/photoUser", authPhotographerRouter);

module.exports = app;
