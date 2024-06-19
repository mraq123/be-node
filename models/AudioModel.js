import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

// const { DataTypes } = Sequelize;

const Audio = db.define(
  "audio",
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

    audio_name_input: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    keterangan_audio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
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

export default Audio;
