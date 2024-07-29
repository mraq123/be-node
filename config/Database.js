import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("kbsxkffm_siami", "kbsxkffm_bsi", "Bismillahsidang", {
  host: "103.67.79.123",
  dialect: "mysql",
  dialectModule: mysql2,
  logging: false,
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
