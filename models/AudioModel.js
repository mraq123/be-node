import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

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
  },
  {
    freezeTableName: true,
  }
);
export default Audio;
