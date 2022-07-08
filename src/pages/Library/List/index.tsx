import { PageContainer } from "@ant-design/pro-layout";
import { Button, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewLibraryDialog from "@/components/NewLibraryDialog";
import useLibraryListModel from "@/pages/Library/List/model";
import type { ProColumns } from "@ant-design/pro-table";
import { ProTable } from "@ant-design/pro-table";
import ProCard from "@ant-design/pro-card";
import { useEffect } from "react";
import styles from "./style.less";

const LibraryListPage = () => {
  const model = useLibraryListModel();
  const columns: ProColumns<API.Library>[] = [
    {
      title: "ID",
      dataIndex: "id"
    },
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Action",
      dataIndex: "ID",
      renderText: (text, record) => {
        return (
          <>
            <a href="#"
               className={styles.action}
               onClick={() => model.scan(record.id)}
            >Scan</a>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => model.remove(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a href="#"
                 className={styles.action}
              >Delete</a>
            </Popconfirm>
          </>
        );
      }
    }
  ];
  useEffect(() => {
    model.refresh();
  }, []);

  return (
    <PageContainer
      extra={[
        <Button
          key="1"
          icon={<PlusOutlined />}
          onClick={() => model.setIsNewLibraryDialogOpen(true)}
        >New</Button>
      ]}
    >
      <NewLibraryDialog
        onCancel={() => model.setIsNewLibraryDialogOpen(false)}
        visible={model.isNewLibraryDialogOpen}
        onOk={(name, isPrivate, path) => model.create(name, path, isPrivate)}
      />
      <ProCard>
        <ProTable dataSource={model.libraryList} columns={columns} search={false} />
      </ProCard>
    </PageContainer>
  );
};
export default LibraryListPage;
