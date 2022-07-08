import { request } from "umi";

export const fetchTaskList = async () => {
  return request<API.FetchTaskListResponse>("/api/tasks", {
    method: "GET"
  });
};
