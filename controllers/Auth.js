import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(404).json({ message: "Email Salah" });
  }
  const matchPassword = await argon2.verify(user.password, req.body.password);
  if (!matchPassword) {
    return res.status(400).json({ message: "Password Tidak Sama" });
  }
  req.session.userId = user.id;
  const id = user.id;
  const username = user.username;
  const email = user.email;
  const role = user.role;
  return res.status(200).json({ id, username, email, role });
};

export const Me = async (req, res) => {
  if (!req.params.id) {
    return res
      .status(401)
      .json({ message: "Mohon Login ke Akun Anda ", id: req.params.id });
  }
  const user = await User.findOne({
    attributes: ["id", "username", "email", "role"],
    where: { id: req.params.id },
  });
  if (!user) {
    return res.status(404).json({ message: "User Tidak Ditemukan" });
  }
  res.status(200).json({ user });
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(400).json({ message: " Gagal Logout" });
    }
    return res.status(200).json({ message: " Berhasil Logout" });
  });
};

export const updateUserProfile = async (req, res) => {
  if (!req.params.id) {
    return res.status(401).json({ message: "Mohon Login ke Akun Anda" });
  }

  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: "User Tidak Ditemukan" });
    }

    user.username = username || user.username;
    user.email = email || user.email;

    if (password) {
      const hashedPassword = await argon2.hash(password);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "Profil berhasil diperbarui", user });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui profil",
      error: error.message,
    });
  }
};
