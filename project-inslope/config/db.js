import { Sequelize } from "sequelize";

//modify database configuration for local or production
const db = new Sequelize("database-name", "type-a-username", "type-a-password", {
  host: "mysql", // using docker container "mysql" for local testing with dockercompose & in this implementation using actual "ip address from db sql instance"
  dialect: "mysql",
  //port: 3306
});

// db connection test
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
