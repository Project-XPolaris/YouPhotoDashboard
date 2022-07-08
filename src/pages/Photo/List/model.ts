import { useState } from "react";
import { fetchImageList } from "@/services/youphoto/image";
import { message } from "antd";

const usePhotoListModel = () => {
  const [photos, setPhotos] = useState<API.Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const refresh = async ({ queryPage, queryPageSize }: { queryPage: number, queryPageSize: number } = {
    queryPage: page,
    queryPageSize: pageSize
  }) => {
    try {
      setLoading(true);
      const response = await fetchImageList({ page: queryPage, pageSize: queryPageSize });
      if (response.success) {
        setPhotos(response.result);
        setPage(response.page);
        setPageSize(response.pageSize);
        setTotal(response.count);
      }
    } catch (e) {
      message.error("load photo list error");
    } finally {
      setLoading(false);
    }

  };
  return {
    photos,
    loading,
    refresh,
    page,
    setPage,
    pageSize,
    setPageSize,
    total
  };
};
export default usePhotoListModel;
