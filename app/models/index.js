const dbConfig = require("../../config/dB.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USERNAME, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.comments=require("./comments.model")(sequelize, Sequelize);
db.project_members=require("./project_members.model.js")(sequelize, Sequelize);
db.project=require("./projects.model.js")(sequelize, Sequelize);
db.tasks=require("./tasks.model.js")(sequelize, Sequelize);
db.user=require("./user.model.js")(sequelize, Sequelize);

module.exports = db;