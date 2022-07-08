import { useState } from "react";
import { fetchTaskList } from "@/services/youphoto/task";

const useTaskList = () => {
  const [tasks, setTasks] = useState<API.Task[]>([]);
  const refresh = async () => {
    const response = await fetchTaskList();
    if (response.success) {
      setTasks(response.data);
    }
  }
  return {
    tasks, refresh
  }

}
export default useTaskList;
