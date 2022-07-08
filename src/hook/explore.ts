import { useEffect, useState } from "react";
import { fetchDirInfo } from "@/services/youphoto/api";

const useExplore = () => {
  const [currentPath, setCurrentPath] = useState("/");
  const [dirInfo, setDirInfo] = useState<API.DirInfo | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const load = async (path: string) => {
    console.log(path);
    setIsLoading(true);
    const res = await fetchDirInfo(path);
    setIsLoading(false);
    if (res.success) {
      setDirInfo(res.data);
    }
  };
  const goBack = () => {
    if (!dirInfo) {
      return;
    }
    const { backPath } = dirInfo;
    load(backPath);
    setCurrentPath(backPath);
  };
  useEffect(() => {
    load(currentPath);
  }, []);
  const navigate = (path: string) => {
    load(path);
    setCurrentPath(path);
  };
  const getItems = (): API.File[] => {
    return dirInfo?.files ?? [];
  };
  const getDirectoryList = (): API.File[] => {
    return dirInfo?.files.filter(item => item.type === "Directory") ?? [];
  };
  return {
    currentPath, goBack, getItems, setCurrentPath, navigate, getDirectoryList, isLoading
  };
};
export default useExplore;
