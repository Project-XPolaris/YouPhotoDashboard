// @ts-ignore
/* eslint-disable */
import { request } from "umi";

export const fetchServiceInfo = async () => {
  return request<API.ServiceInfoResponse>("/api/info", {
    method: "GET"

  });
};
export const fetchBaseAuthInfo = async (
  {
    url,
    username,
    password
  }: { url: string, username: string, password: string }) => {
  return request<API.fetchBaseAuthResponse>(`/api${url}`, {
    method: "POST",
    data: {
      username, password
    }
  });

};

export const queryCurrentUser = async () => {
  return request<API.CurrentUserResult>("/api/user/auth", {
    method: "GET"
  });
};

export const fetchDirInfo = async (path: string) => {
  console.log(path);
  return request<API.FetchDirInfo>("/api/readdir", {
    method: "GET",
    params: {
      path
    }
  });
};
