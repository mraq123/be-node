import Audio from "../models/AudioModel.js";
import multer from "multer";
import fs from "fs";
import { Blob } from "buffer";
import { authPlugins } from "mysql2";

// upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder penyimpanan file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

export const upload = multer({ storage: storage });
// endd

export const getAudio = async (req, res) => {
  try {
    const response = await Audio.findAll();

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAudioById = async (req, res) => {
  try {
    const response = await Audio.findOne({ where: { id: req.params.id } });
    if (!response) {
      return res.status(404).json({ message: "Audio Tidak Ditemukan" });
    }

    const audioBuffer = Buffer.from(response.audio_name_input);
    const keteranganAudio = response.keterangan_audio;

    res.status(200).json({
      audio: audioBuffer.toString("base64"), // Convert the buffer to a base64 string
      keteranganAudio: keteranganAudio,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fileToBlob = async (filePath) => {
  const data = await fs.readFile(filePath);
  return new Blob([data]);
};

export const createAudio = async (req, res) => {
  try {
    const filePath = req.file.path;
    res.status(200).json({ message: filePath, data: "oke" });
    const { keterangan_audio } = req.body;
    const audioBuffer = fs.readFileSync(filePath);
    res.json((filePath, audioBuffer));
    const response = await Audio.create({
      audio_name_input: audioBuffer,
      keterangan_audio: keterangan_audio,
    });
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error creating audio:", error);

    // Send error response
    res.status(500).json({
      message: "Terjadi kesalahan saat membuat audio",
      error: error.message,
    });
  }
};

export const updateAudio = async (req, res) => {
  try {
    const audio = await Audio.findOne({ where: { id: req.params.id } });
    if (!audio) {
      return res.status(404).json({ message: "Audio Tidak Ditemukan" });
    }

    let audioBuffer = audio.audio_name_input;
    if (req.file) {
      const filePath = req.file.path;
      audioBuffer = fs.readFileSync(filePath);
      fs.unlinkSync(filePath);
    }

    const { keterangan_audio } = req.body;

    const response = await Audio.update(
      {
        audio_name_input: audioBuffer,
        keterangan_audio: keterangan_audio,
      },
      { where: { id: audio.id } }
    );

    if (response[0] === 0) {
      return res
        .status(404)
        .json({ message: "Tidak ada perubahan pada data audio" });
    }

    res
      .status(200)
      .json({ message: "Audio Berhasil Diperbarui", data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAudio = async (req, res) => {
  {
    const audio = await Audio.findOne({ where: { id: req.params.id } });
    if (!audio) {
      return res.status(404).json({ message: "Audio Tidak Ditemukan" });
    }

    try {
      const response = await Audio.destroy({ where: { id: audio.id } });
      res
        .status(200)
        .json({ message: "Audio Berhasil Di Delete", data: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
