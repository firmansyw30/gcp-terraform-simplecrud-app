import { Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const Petugas = sequelize.define('petugas', {
    id_petugas: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_petugas: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    tableName: 'petugas',
    timestamps: false // jika tabel tidak memiliki kolom createdAt dan updatedAt
});

export default Petugas;
