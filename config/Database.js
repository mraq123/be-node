import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("sql12713648", "sql12713648", "Xd3tyGDpdt", {
  host: "sql12.freemysqlhosting.net",
  dialect: "mysql",
  dialectModule: mysql2,
});

// Fungsi untuk mengecek koneksi
const checkConnection = async () => {
  try {
    await db.authenticate();
    console.log("Koneksi berhasil.");
  } catch (error) {
    console.error("Koneksi gagal:", error);
  }
};

// Panggil fungsi untuk mengecek koneksi
checkConnection();

export default db;
