// @ts-ignore
/* eslint-disable */

declare namespace API {
  type BaseResponse = {
    success: boolean;
  }
  type AuthType = "weboauth" | "base" | "anonymous";
  type AuthInfo = {
    name: string,
    type: AuthType,
    url: string
  }
  type ServiceInfo = {
    auth: AuthInfo[];
    authEnable: boolean;
    authUrl: string;
    name: string;
    oauth: boolean;
  }
  type ServiceInfoResponse = BaseResponse & ServiceInfo

  type UserAuth = {
    accessToken: string;
    username: string
  }
  type fetchBaseAuthResponse = BaseResponse & {
    data: UserAuth
  }
  type CurrentUserResult = BaseResponse & {
    data: {
      username: string;
      id: number
    }
  }

  type File = {
    type: string;
    name: string;
    path: string;
  }

  type DirInfo = {
    backPath: string;
    files: File[];
    path: string;
    sep: string;
  }
  type  FetchDirInfo = BaseResponse & {
    data: DirInfo;
  }

  type ListResult<T> = {
    count: number;
    page: number;
    pageSize: number;
    result: T[];
  }
  type Library = {
    id: number;
    name: string;
    path: string;
    createdAt: string;
    updatedAt: string;
  }
  type FetchLibraryListResponse = BaseResponse & ListResult<Library>
  type TaskType = "ScanLibrary" | "RemoveLibrary"
  type TaskStatus = "Running" | "Done" | "Error"
  type ScanLibraryTaskDetail = {
    id: number;
    path: string;
    current: number;
    total: number;
    currentPath: string;
    currentName: string;
    name: string;
  }
  type DeleteLibraryTaskDetail = {
    id: number;
    path: string;
    current: number;
    total: number;
    name: string;
  }
  type TaskDetail = ScanLibraryTaskDetail | DeleteLibraryTaskDetail

  type Task = {
    id: string;
    type: TaskType;
    output: TaskDetail;
    status: TaskStatus;
    startTime: string;
  }
  type FetchTaskListResponse = BaseResponse & {
    data: Task[];
  }

  type Photo = {
    id: number,
    name: string,
    thumbnail: string,
    created: string,
    updated: string,
  }
  type FetchPhotoListResponse = BaseResponse & ListResult<Photo>
}
