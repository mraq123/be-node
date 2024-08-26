import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const db = new Sequelize("b1sdysgf7rivanz35bdl", "ui0crxc7ow8jz97f", "f1XGtNEUlMY3fyCd632t", {
  host: "b1sdysgf7rivanz35bdl-mysql.services.clever-cloud.com",
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
