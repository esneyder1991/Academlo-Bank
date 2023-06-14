const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'db_academlobank',
  port: 5432,
  logging: false,
});
//process es una variable en la cual se ejecutan todos los procesos del entorno de node
module.exports = { db };
