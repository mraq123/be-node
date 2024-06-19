import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Audio from "./AudioModel.js";

// const { DataTypes } = Sequelize;

const Schedule = db.define(
  "schedule",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    jam: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    keterangan_schedule: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    audioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "audio", // Pastikan ini sesuai dengan nama tabel model Audio
        key: "id",
      },
    },

    id_users: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Audio.hasMany(Schedule);

Schedule.belongsTo(Audio, { foreignKey: "audioId" });

export default Schedule;
