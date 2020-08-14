const Clients = require("../models/client");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

function getAll() {
  return Clients.find();
}

function getById(clientId) {
  return Clients.findById(clientId);
}

function create(clientData) {
  return Clients.create(clientData);
}

function update(clientId, clientData) {
  return Clients.findByIdAndUpdate(clientId, clientData);
}

function deletee(clientId) {
  return Clients.findByIdAndDelete(clientId);
}

async function signup(clientData) {
  const { password } = clientData;

  //encriptar contraseña
  const passwordEncripted = await bcrypt.hash(password);

  return Clients.create({
    ...clientData,
    password: passwordEncripted,
  });
}

async function login(email, passwordPlain) {
  const clientByEmail = await Clients.findOne({ email });
  if (!clientByEmail) {
    //se ejecuta cuando no encuentra coicidencias
    throw new Error("Wrong login datas");
  }

  //verificar que sea el password correcto
  const isValid = await bcrypt.compare(passwordPlain, clientByEmail.password);
  if (!isValid) {
    throw new Error("Wrong login datas");
  }
  //crear token

  return jwt.sign({ id: clientByEmail._id });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deletee,
  signup,
  login,
};
