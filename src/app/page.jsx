import TaskCard from "@/components/TaskCard.jsx";
import Task from "@/models/Task.js";
import { connectDB } from "@/utils/mongoose.js";


const loadTasks = async () => {
  connectDB();
  const tasks = await Task.find();
  return tasks;
}

const HomePage = async () => {
  const tasks = await loadTasks();
  return (
    <div>
      <TaskCard tasks={tasks} />
    </div>
  )
}

export default HomePage