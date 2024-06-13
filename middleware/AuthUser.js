import User from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon Login ke Akun Anda " });
  }
  const user = await User.findOne({
    where: { id: req.session.userId },
  });
  if (!user) {
    return res.status(404).json({ message: "User Tidak Ditemukan" });
  }
  res.userId = user.id;
  req.role = user.role;
  next();
};

export const AdminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.session.userId },
  });
  if (!user) {
    return res.status(404).json({ message: "User Tidak Ditemukan" });
  }
  if (user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Hanya Admin yang dapat mengakses" });
  }

  next();
};
