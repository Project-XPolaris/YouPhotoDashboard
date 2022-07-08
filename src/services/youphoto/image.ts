import { request } from "@@/plugin-request/request";

export const fetchImageList = async (param: { page: number, pageSize: number } = { page: 1, pageSize: 20 }) => {
  return request<API.FetchPhotoListResponse>("/api/images", {
    method: "GET",
    params: param
  });
};
