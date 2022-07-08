import { Avatar, Card, Progress } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import styles from "./style.less";

const DeleteTaskCard = ({ task, className }: { task: API.Task, className: string }) => {
  const detail = task.output as API.DeleteLibraryTaskDetail;
  const getPercentage = () => {
    if (detail.total === 0) {
      return 0;
    }
    return Math.round((detail.current / detail.total) * 100);
  };
  return (
    <Card className={className}>
      <Card.Meta
        avatar={<Avatar icon={<DeleteOutlined />} />}
        title={`RemoveLibrary ${detail.name}`}
        description={task.status}
      />
      <div className={styles.content}>
        <Title level={5}>
          {detail.current}/ {detail.total}
        </Title>
      </div>
      <Progress percent={getPercentage()} />
    </Card>
  );
};
export default DeleteTaskCard;
