import { useState } from "react";
import { createLibrary, deleteLibrary, fetchLibraryList, scanLibrary } from "@/services/youphoto/library";
import { message } from "antd";

const useLibraryListModel = () => {
  const [libraryList, setLibraryList] = useState<API.Library[]>([]);
  const [isNewLibraryDialogOpen, setIsNewLibraryDialogOpen] = useState(false);
  const refresh = async () => {
    const response = await fetchLibraryList();
    if (response.success) {
      setLibraryList(response.result);
    }
  };
  const create = async (name: string, path: string, isPrivate: boolean) => {
    const res = await createLibrary({ name, path, private: isPrivate });
    if (res.success) {
      setIsNewLibraryDialogOpen(false);
      message.success("Create success");
    }
    await refresh();
  };
  const scan = async (id: number) => {
    const response = await scanLibrary({ id });
    if (response.success) {
      message.success("Scan task create success");
    }
  };
  const remove = async (id: number) => {
    const response = await deleteLibrary({ id });
    if (response.success) {
      message.success("Add delete task success");
    }
  };
  return {
    isNewLibraryDialogOpen, setIsNewLibraryDialogOpen, create, refresh, libraryList, scan, remove
  };
};
export default useLibraryListModel;
