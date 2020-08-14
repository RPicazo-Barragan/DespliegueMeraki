const photograpers = require("../models/photograper");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");

function getAll() {
  return photograpers.find();
}

function getById(photograperId) {
  return photograpers.findById(photograperId);
}

function create(photograperData) {
  return photograpers.create(photograperData);
}

function update(photograperId, photograperData) {
  return photograpers.findByIdAndUpdate(photograperId, photograperData);
}

function deletee(photograperId) {
  return photograpers.findByIdAndDelete(photograperId);
}

async function signup(photographerData) {
  const { password } = photographerData;

  //encriptar contraseña
  const passwordEncripted = await bcrypt.hash(password);

  return photograpers.create({
    ...photographerData,
    password: passwordEncripted,
  });
}

async function login(email, passwordPlain) {
  const photographerByEmail = await photograpers.findOne({ email });
  if (!photographerByEmail) {
    //se ejecuta cuando no encuentra coicidencias
    throw new Error("Wrong login datas");
  }

  //verificar que sea el password correcto
  const isValid = await bcrypt.compare(
    passwordPlain,
    photographerByEmail.password
  );
  if (!isValid) {
    throw new Error("Wrong login datas");
  }
  //crear token

  return jwt.sign({ id: photographerByEmail._id });
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
