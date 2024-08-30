import db from "../config/db.js";
import { Sequelize } from "sequelize";

const DataTypes = Sequelize;

const Artikel = db.define("artikel",{
  judul_artikel : DataTypes.STRING,
  konten : DataTypes.TEXT,
  tanggal_post :{
    type : DataTypes.DATE,
    defaultValue : Sequelize.NOW
  }
},{
  freezeTableName: true
})

export default Artikel;

(async()=>{
  await db.sync();
})();

