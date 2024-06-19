import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("smart_audio_db", "root", "", {
  host: "localhost",
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
