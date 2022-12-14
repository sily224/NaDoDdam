import Sequelize from 'sequelize';
import Users from "./users.js";
import Reservations from './reservations.js';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const env = process.env.NODE_ENV || 'development';
import {config} from  '../config/config.js'

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.Users = Users(sequelize, Sequelize);
db.Reservations = Reservations(sequelize, Sequelize);

Object.keys(db).forEach((modelName)=> {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
