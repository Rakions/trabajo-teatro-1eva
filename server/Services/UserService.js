const fs = require("fs");
const path = require("path");
const User = require("../Models/User");

const obrasFilePath = path.join(__dirname, "../Data/users.json");

function getUsersFromJson() {
  try {
    const obrasData = fs.readFileSync(obrasFilePath, "utf-8");
    return JSON.parse(obrasData);
  } catch (error) {
    console.error("Error al cargar los usuarios desde el archivo JSON:", error.message);
    return [];
  }
}

function saveUsersToJson(listaUsers) {
  try {
    fs.writeFileSync(obrasFilePath, "[]");
    fs.writeFileSync(obrasFilePath, JSON.stringify(listaUsers, null, 2), "utf-8");
    console.log("Usuarios guardadas correctamente en el archivo JSON.");
  } catch (error) {
    console.error("Error al guardar los usuarios en el archivo JSON:", error.message);
  }
}

const userService = {
  getAllUsers: () => {
    return getUsersFromJson();
  },
  getUserById: (id) => {
    return getUsersFromJson().filter((user) => {
      return user.id.toLowerCase() === id.toLowerCase();
    });
  },
  createUser: (nombre, email, contra) => {
    let user = new User(nombre, email, contra);
    listaUser.push(user);
    saveUsersToJson(listaUser);
  },
  deleteUser: (id_user) => {
    let users = getUsersFromJson();
    const index = users.findIndex((user) => {
      user.id === id_user;
    });
    users.splice(index, 1);
    saveUsersToJson(users);
  },
};

let listaUser = getUsersFromJson();

module.exports = userService;
