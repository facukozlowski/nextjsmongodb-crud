import User from "@/models/User";
import { dbConnect } from "@/utils/mongoose";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const users = await User.find();
        return res.status(200).json(users);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
      const newUser = new User(body);
      const savedUser = await newUser.save();
      return res.status(201).json(savedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}