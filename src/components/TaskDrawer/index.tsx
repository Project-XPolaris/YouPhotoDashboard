import { Drawer, List } from "antd";
import useTaskList from "@/hook/task";
import ScanTaskCard from "@/components/ScanTaskCard";
import { useRequest } from "@@/plugin-request/request";
import { useEffect } from "react";
import DeleteTaskCard from "@/components/DeleteTaskCard";
import styles from "./style.less";

const TaskDrawer = (
  {
    visible,
    onClose
  }: {
    visible: boolean,
    onClose: () => void,
  }
) => {
  const taskModel = useTaskList();
  const renderTaskCard = (task: API.Task) => {
    switch (task.type) {
      case "ScanLibrary":
        return <ScanTaskCard task={task} className={styles.item} />;
      case "RemoveLibrary":
        return <DeleteTaskCard task={task} className={styles.item} />;
      default:
        return null;
    }
  };
  const { run } = useRequest(taskModel.refresh, {
    pollingInterval: 1000
  });
  useEffect(() => {
    run();
  }, []);
  return (
    <Drawer title={"Tasks"} visible={visible} onClose={onClose}>
      <List dataSource={taskModel.tasks} renderItem={(task) => {
        return (
          renderTaskCard(task)
        );
      }} />
    </Drawer>
  );
};
export default TaskDrawer;
