const jwt = require("../lib/jwt");
const Client = require("../models/client");

async function auth(request, response, next) {
  try {
    //todas las llamadas deberian de tener un header Authorization con un token valido
    const { authorization } = request.headers;
    //console.log("auth: ", authorization);
    const decodedToken = jwt.verify(authorization);
    //console.log("decoded Token:", decodedToken);
    const client = await Client.findById(decodedToken.id);
    request.client = client;
    next();
  } catch (error) {
    response.json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = auth;
