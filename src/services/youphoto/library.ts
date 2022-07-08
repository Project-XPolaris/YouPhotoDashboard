import { request } from "umi";

export const createLibrary = async (param: { name: string, path: string, private: boolean }) => {
  return request<API.BaseResponse>("/api/libraries", {
    method: "POST",
    data: param
  });
};
export const fetchLibraryList = async (param: { page: number, pageSize: number } = { page: 1, pageSize: 100 }) => {
  return request<API.FetchLibraryListResponse>("/api/libraries", {
    method: "GET",
    params: param
  });
};

export const scanLibrary = async (param: { id: number }) => {
  return request<API.BaseResponse>(`/api/library/${param.id}/scan`, {
    method: "POST"
  });
};
export const deleteLibrary = async (param: { id: number }) => {
  return request<API.BaseResponse>(`/api/library/${param.id}`, {
    method: "DELETE"
  });
};
