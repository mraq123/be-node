import Schedule from "../models/ScheduleModel.js";
import Audio from "../models/AudioModel.js";

export const getSchedule = async (req, res) => {
  try {
    const response = await Schedule.findAll({
      include: [
        {
          model: Audio,
          attributes: ["audio_name_input", "keterangan_audio"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getScheduleById = async (req, res) => {
  try {
    const response = await Schedule.findOne({ where: { id: req.params.id } });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createSchedule = async (req, res) => {
//   try {
//     const { jam, keterangan_schedule, audioId } = req.body;
//     const schedule = await Schedule.create({
//       jam,
//       keterangan_schedule,
//       audioId,
//     });
//     res.status(201).json(schedule);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const createSchedule = async (req, res) => {
  try {
    const { jam, keterangan_schedule, audioId, id_users } = req.body;

    // Catat data permintaan yang masuk
    console.log("Data Permintaan:", { jam, keterangan_schedule, audioId });

    // Periksa apakah audioId ada di tabel audio
    const audio = await Audio.findByPk(audioId);
    if (!audio) {
      return res.status(400).json({ message: "audioId tidak valid" });
    }

    const schedule = await Schedule.create({
      jam,
      keterangan_schedule,
      audioId,
      id_users,
    });
    res.status(201).json(schedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { jam, keterangan_schedule, audioId, id_users } = req.body;
    const scheduleId = req.params.id;

    console.log("Data Permintaan Update:", {
      jam,
      keterangan_schedule,
      audioId,
      id_users
    });

    const audio = await Audio.findByPk(audioId);
    if (!audio) {
      return res.status(400).json({ message: "audioId tidak valid" });
    }

    const updatedSchedule = await Schedule.update(
      { jam, keterangan_schedule, audioId, id_users },
      { where: { id: scheduleId } }
    );

    if (updatedSchedule[0] === 1) {
      res.status(200).json({ message: "Berhasil Update Schedule" });
    } else {
      res.status(404).json({
        message: "Schedule tidak ditemukan atau tidak dapat diupdate",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const deleteSchedule = async (req, res) => {
//   try {
//     const scheduleId = req.params.id;
//     const deletedSchedule = await Schedule.destroy({
//       where: { id: scheduleId },
//     });

//     if (deletedSchedule === 1) {
//       res.status(200).json({ message: "Schedule deleted successfully" });
//     } else {
//       res
//         .status(404)
//         .json({ message: "Schedule not found or could not be deleted" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const deleteSchedule = async (req, res) => {
  try {
    const scheduleId = req.params.id;
    const deletedSchedule = await Schedule.destroy({
      where: { id: scheduleId },
    });

    if (deletedSchedule === 1) {
      res.status(200).json({ message: "Schedule berhasil dihapus" });
    } else {
      res
        .status(404)
        .json({ message: "Schedule tidak ditemukan atau tidak dapat dihapus" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
