import Audio from "../models/AudioModel.js";
import fs from "fs";
import pkg from "formidable-serverless";
const { IncomingForm } = pkg;
// import { Blob } from "buffer";
// import { authPlugins } from "mysql2";

// // upload file
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Folder penyimpanan file
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
//   },
// });

// export const upload = multer({ storage: storage });
// // endd

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

// const fileToBlob = async (filePath) => {
//   const data = await fs.readFile(filePath);
//   return new Blob([data]);
// };
export const createAudio = async (req, res) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // File audio yang diunggah tersedia di files.audio
    const uploadedFile = files.audio_name_input;

    // Check if the file size is more than 2MB (2 * 1024 * 1024 bytes)
    const maxFileSize = 2 * 1024 * 1024;
    if (uploadedFile.size > maxFileSize) {
      return res.status(400).json({
        error: "Ukuran file maksimal 2MB",
      });
    }

    try {
      // Baca file audio menjadi buffer
      const audioBuffer = fs.readFileSync(uploadedFile.path);

      // Simpan data ke dalam database
      const response = await Audio.create({
        audio_name_input: audioBuffer, // Simpan buffer audio ke kolom audio_name_input
        keterangan_audio: fields.keterangan_audio,
        id_users: fields.id_users, // Ambil keterangan_audio dari fields
      });

      // Kirim respons berhasil
      res.status(200).json({
        message: "File audio berhasil diunggah dan disimpan",
        data: response, // Jika perlu, kirim data respons dari database
      });
    } catch (error) {
      console.error("Error creating audio:", error);
      res.status(500).json({
        message: "Terjadi kesalahan saat membuat audio",
        error: error.message,
      });
    }
  });
};

export const updateAudio = async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    try {
      const audio = await Audio.findOne({ where: { id: req.params.id } });
      if (!audio) {
        return res.status(404).json({ message: "Audio Tidak Ditemukan" });
      }

      let body = {};

      if (files.audio_name_input) {
        // File audio yang diunggah tersedia di files.audio
        const uploadedFile = files.audio_name_input;
    // Check if the file size is more than 2MB (2 * 1024 * 1024 bytes)
    const maxFileSize = 2 * 1024 * 1024;

        
          if (uploadedFile.size > maxFileSize) {
          return res.status(400).json({
            error: "Ukuran file maksimal 2MB",
          });
        }

        if (uploadedFile.type !== "audio/mp3" && uploadedFile.type !== "audio/mpeg") {
          return res.status(400).json({
            error: "Hanya file dengan format MP3 yang diperbolehkan!",
          });
        }
        // Baca file audio menjadi buffer
        const audioBuffer = fs.readFileSync(uploadedFile.path);
        body = {
          audio_name_input: audioBuffer, // Simpan buffer audio ke kolom audio_name_input
          keterangan_audio: fields.keterangan_audio,
           id_users: fields.id_users,
        };
      } else {
        body = {
          keterangan_audio: fields.keterangan_audio,
           id_users: fields.id_users,
        };
      }

      // Simpan data ke dalam database
      const response = await Audio.update(body, { where: { id: audio.id } });

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
  });
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
