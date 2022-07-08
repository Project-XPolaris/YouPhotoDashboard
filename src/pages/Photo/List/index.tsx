import { PageContainer } from "@ant-design/pro-layout";
import usePhotoListModel from "@/pages/Photo/List/model";
import { useEffect } from "react";
import styles from "./style.less";
import { Card, Col, Image, Pagination, Row } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const ImageListPage = () => {
  const model = usePhotoListModel();
  useEffect(() => {
    model.refresh();
  }, []);
  const onDownload = (photo: API.Photo) => {
    const fileName = photo.name;
    const el = document.createElement("a");
    el.setAttribute("href", `/api/image/${photo.id}/raw?token=${localStorage.getItem("token")}`);
    el.setAttribute("download", fileName);
    document.body.appendChild(el);
    el.click();
    el.remove();
  };
  return (
    <PageContainer>
      <Image.PreviewGroup>
        <Row gutter={[16, 16]}>
          {
            model.photos.map(it => {
              return (
                <Col xs={4}>
                  <Card

                    actions={[
                      <DownloadOutlined key="download" onClick={() => onDownload(it)} />
                    ]}
                  >
                    <div className={styles.imageItem}>
                      <Image
                        className={styles.image}
                        src={`/api/image/${it.id}/thumbnail?token=${localStorage.getItem("token")}`} alt=""
                        preview={{
                          src: `/api/image/${it.id}/raw?token=${localStorage.getItem("token")}`
                        }}

                      />
                    </div>

                  </Card>
                </Col>
              );
            })
          }
        </Row>
      </Image.PreviewGroup>
      <div className={styles.pagination}>
        <Row>
          <Col xs={12}>
            <Pagination
              pageSize={model.pageSize}
              current={model.page}
              showQuickJumper
              showTotal={total => `Total ${total} items`}
              onChange={(page) => model.refresh({ queryPage: page, queryPageSize: model.pageSize })}
              total={model.total}
            />
          </Col>
        </Row>
      </div>


    </PageContainer>

  );
};
export default ImageListPage;
