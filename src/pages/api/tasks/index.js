import Task from "@/models/Task";
import User from "@/models/User";
import { dbConnect } from "@/utils/mongoose";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        const tasks = await Task.find();

        const tasksWithtUser = await Promise.all(
          tasks.map(async (item)=> {
            const user= await User.findById(item.userId);
            return {
              ...item._doc,
              userName: user.name
            }
          })
        );

        console.log()


        return res.status(200).json(tasksWithtUser);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
      const newTask = new Task(body);
      const savedTask = await newTask.save();
      return res.status(201).json(savedTask);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}