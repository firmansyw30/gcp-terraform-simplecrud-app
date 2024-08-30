import { Sequelize } from "sequelize";

//modifikasi konfigurasi database jika akan melakukan pengujian local
const db = new Sequelize("db-project-inslope", "firmansyw30", "@firmansyw30!", {
  host: "34.34.216.72", // menggunakan container "mysql" jika untuk pengujian local
  dialect: "mysql",
  //port: 3306 // hapus komentar jika dibutuhkan untuk pengujian local
});

// Tes koneksi
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default db;
