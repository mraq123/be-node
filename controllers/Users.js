import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, username, role, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and Confirm Password Tidak Sama " });
  }

  try {
    const hashedPassword = await argon2.hash(password);
    const response = await User.create({
      name,
      email,
      password: hashedPassword,
      username,
      role,
    });
    res.status(200).json({ message: "User Berhasil Dibuat", data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) {
    return res.status(404).json({ message: "User Tidak Ditemukan" });
  }

  const { name, email, password, username, role, confirmPassword } = req.body;
  let hashedPassword = user.password;

  if (password && password !== "") {
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password dan Confirm Password Tidak Sama " });
    }
    hashedPassword = await argon2.hash(password);
  }

  try {
    const response = await User.update(
      {
        name: name,
        email: email,
        password: hashedPassword,
        username: username,
        role: role,
      },
      { where: { id: user.id } }
    );
    res
      .status(200)
      .json({ message: "User Berhasil Di Update", data: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  {
    const user = await User.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: "User Tidak Ditemukan" });
    }

    try {
      const response = await User.destroy({ where: { id: user.id } });
      res
        .status(200)
        .json({ message: "User Berhasil Di Delete", data: response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
